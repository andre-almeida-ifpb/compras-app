import dispensaOriginal from '@/dados/dispensa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface IItemDispensa {
    id: number;
    nome: string;
    qtdDispensa: number;
    qtdLista: number;
}

export interface ISecao {
    id: number;
    nome: string;
    data: IItemDispensa[];
}

interface IContextoCompra {
    dispensa: ISecao[];
    adicionaSecao: (secao: string) => void;
    removeSecao: (id: number) => void;
    adicionaItem: (idSecao: number, nomeItem: string) => void;
    removeItem: (id: number) => void;
    incrementaQuantidadeDispensa: (id: number) => void;
    decrementaQuantidadeDispensa: (id: number) => void;
    incrementaQuantidadeLista: (id: number) => void;
    decrementaQuantidadeLista: (id: number) => void;
    removeItensLista: (ids: number[]) => void;
}

const ContextoCompra = createContext<IContextoCompra | undefined>(undefined);

export const CompraProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const  [dispensa, setDispensa] = useState<ISecao[]>(dispensaOriginal);
    const STORAGE_KEY = '@app/Compras';

    // Carrega o estado salvo ao iniciar
    useEffect(() => {
        const loadState = async () => {
            try {
                const estadoSalvo = await AsyncStorage.getItem(STORAGE_KEY);
                if (estadoSalvo) {
                    const parsed = JSON.parse(estadoSalvo);
                    setDispensa(parsed);
                }
            } catch (error) {
                console.error('Erro ao carregar estado:', error);
            }
        };
        loadState();
    }, []);

    // Salva o estado sempre que ele muda
    useEffect(() => {
        const saveState = async () => {
            try {                
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dispensa));
            } catch (error) {
                console.error('Erro ao salvar estado:', error);
            }
        };
        
        saveState();        
    }, [dispensa]);

    const adicionaSecao = useCallback((secao: string) => {
        setDispensa(prev => {
            let maxId = Math.max(...prev.map(s => s.id), 0);                    
            let novaDispensa = [...prev, {id: maxId+1, nome: secao, data: []}];
            novaDispensa.sort( (a,b) => a.nome.localeCompare(b.nome) );

            return novaDispensa;
        });
    }, []);

    const removeSecao = useCallback((id: number) => {
        setDispensa(prev => {
            return prev.filter( item => item.id != id );
        });
    }, []);

    const adicionaItem = useCallback((idSecao: number, nomeItem: string) => {
        setDispensa( prev => {
            let maxId = Math.max(...prev.flatMap(item => item.data.map(d => d.id)), 0);

            let novaDispensa: ISecao[] = prev.map( secao => {
                if (secao.id == idSecao) {
                    let newData = [
                        ...secao.data,
                        {id: maxId+1, nome: nomeItem, qtdDispensa: 0, qtdLista: 0}
                    ];
                    newData.sort( (a,b) => a.nome.localeCompare(b.nome) );
                    return { ...secao, data: newData };
                } else {
                    return secao;
                }            
            });
            
            return novaDispensa;
        });
    }, []);

    const removeItem = useCallback((id: number) => {
        setDispensa( prev => {
            let novaDispensa: ISecao[] = prev.map( secao => ({
                ...secao,
                data: secao.data.filter( item => item.id != id )
            }));

            return novaDispensa;
        });
    }, []);

    const atualizarItem = useCallback((id: number, callback: (item: IItemDispensa) => IItemDispensa) => {
        setDispensa( prev => {
            const novaDispensa = prev.map(secao => ({
                ...secao,
                data: secao.data.map(item =>
                    item.id === id ? callback(item) : item
                )
            }));
            
            return novaDispensa;
        });
    }, []);

    const incrementaQuantidadeDispensa = useCallback((id: number) => {        
        atualizarItem(id, item => ({
            ...item,
            qtdDispensa: item.qtdDispensa + 1,
        }));
    }, []);

    const decrementaQuantidadeDispensa = useCallback((id: number) => {
        atualizarItem(id, item => ({
            ...item,
            qtdDispensa:  Math.max(0, item.qtdDispensa - 1),
        }));
    }, []);

    const incrementaQuantidadeLista = useCallback((id: number) => {
        atualizarItem(id, item => ({
            ...item,
            qtdLista: item.qtdLista + 1,
        }));
    }, []);

    const decrementaQuantidadeLista = useCallback((id: number) => {
        atualizarItem(id, item => ({
            ...item,
            qtdLista:  Math.max(0, item.qtdLista - 1),
        }));
    }, []);

    const removeItensLista = useCallback((ids: number[]) => {
        setDispensa( prev => {
            const idSet = new Set(ids);

            const novaDispensa = prev.map( secao => ({
                ...secao,
                data: secao.data.map( item => 
                    idSet.has(item.id) ? ({
                        ...item,
                        qtdLista: 0
                    }) : item
                )
            }));
            
            return novaDispensa;
        });
    }, []);

    const value = useMemo( () => ({
                dispensa,
                adicionaSecao,
                removeSecao,
                adicionaItem, 
                removeItem, 
                incrementaQuantidadeDispensa, 
                decrementaQuantidadeDispensa,
                incrementaQuantidadeLista,
                decrementaQuantidadeLista,
                removeItensLista
    }), [dispensa]);

    return (
        <ContextoCompra.Provider 
            value={value}>
            {children}
        </ContextoCompra.Provider>
    );
}

export const useCompra = () => {
  const context = useContext(ContextoCompra);
  if (!context) throw new Error('useCompra deve ser usado dentro de um CompraProvider');
  return context;
};