import dispensaOriginal from '@/dados/dispensa';
import React, { createContext, useContext, useState } from "react";

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

    const adicionaSecao = (secao: string) => {
        let novoId: number = 1;
        for (let i=0; i < dispensa.length; i++) {
            if (dispensa[i].id >= novoId) {
                novoId = dispensa[i].id+1;
            }
        }

        setDispensa(prev => [...prev, {id: novoId, nome: secao, data: []}]);
    }

    const removeSecao = (id: number) => {
        setDispensa(dispensa.filter( item => item.id != id ));
    }

    const adicionaItem = (idSecao: number, nomeItem: string) => {
        let novoId: number = 1;
        for (let i=0; i < dispensa.length; i++) {
            for (let j=0; j < dispensa[i].data.length; j++) {
                if (dispensa[i].data[j].id >= novoId) {
                    novoId = dispensa[i].data[j].id + 1;
                }
            }
        }

        let novaDispensa: ISecao[] = [];

        for (let i=0; i < dispensa.length; i++) {
            if (dispensa[i].id == idSecao) {
                novaDispensa.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: [...dispensa[i].data, {id: novoId, nome: nomeItem, qtdDispensa: 0, qtdLista: 0}] });
            } else {
                novaDispensa.push(dispensa[i]);
            }
        }

        setDispensa(prev => novaDispensa);
    }

    const removeItem = (id: number) => {
        let novaDispensa = [];

        for (let i=0; i < dispensa.length; i++) {
            novaDispensa.push({id: dispensa[i].id, nome: dispensa[i].nome, data: dispensa[i].data.filter ( item => item.id != id)});
        }

        setDispensa(novaDispensa);
    }

    const incrementaQuantidadeDispensa = (id: number) => {
        let novaDispensa: ISecao[] = [];

        for (let i=0; i < dispensa.length; i++) {
            let novoData: IItemDispensa[] = [];
            for (let j=0; j < dispensa[i].data.length; j++) {
                if (dispensa[i].data[j].id == id) {
                    novoData.push({ id: dispensa[i].data[j].id, nome: dispensa[i].data[j].nome, qtdDispensa: dispensa[i].data[j].qtdDispensa + 1, qtdLista: dispensa[i].data[j].qtdLista })
                } else {
                    novoData.push(dispensa[i].data[j]);
                }
            }
            novaDispensa.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: novoData })
        }

        setDispensa(novaDispensa);
    }

    const decrementaQuantidadeDispensa = (id: number) => {
        let novaDispensa: ISecao[] = [];

        for (let i=0; i < dispensa.length; i++) {
            let novoData: IItemDispensa[] = [];
            for (let j=0; j < dispensa[i].data.length; j++) {
                if (dispensa[i].data[j].id == id && dispensa[i].data[j].qtdDispensa > 0) {
                    novoData.push({ id: dispensa[i].data[j].id, nome: dispensa[i].data[j].nome, qtdDispensa: dispensa[i].data[j].qtdDispensa - 1, qtdLista: dispensa[i].data[j].qtdLista })
                } else {
                    novoData.push(dispensa[i].data[j]);
                }
            }
            novaDispensa.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: novoData })
        }

        setDispensa(novaDispensa);
    }

    const incrementaQuantidadeLista = (id: number) => {
        let novaDispensa: ISecao[] = [];

        for (let i=0; i < dispensa.length; i++) {
            let novoData: IItemDispensa[] = [];
            for (let j=0; j < dispensa[i].data.length; j++) {
                if (dispensa[i].data[j].id == id) {
                    novoData.push({ id: dispensa[i].data[j].id, nome: dispensa[i].data[j].nome, qtdDispensa: dispensa[i].data[j].qtdDispensa, qtdLista: dispensa[i].data[j].qtdLista + 1})
                } else {
                    novoData.push(dispensa[i].data[j]);
                }
            }
            novaDispensa.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: novoData })
        }

        setDispensa(novaDispensa);
    }

    const decrementaQuantidadeLista = (id: number) => {
        let novaDispensa: ISecao[] = [];

        for (let i=0; i < dispensa.length; i++) {
            let novoData: IItemDispensa[] = [];
            for (let j=0; j < dispensa[i].data.length; j++) {
                if (dispensa[i].data[j].id == id && dispensa[i].data[j].qtdLista > 0) {
                    novoData.push({ id: dispensa[i].data[j].id, nome: dispensa[i].data[j].nome, qtdDispensa: dispensa[i].data[j].qtdDispensa, qtdLista: dispensa[i].data[j].qtdLista - 1 })
                } else {
                    novoData.push(dispensa[i].data[j]);
                }
            }
            novaDispensa.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: novoData })
        }

        setDispensa(novaDispensa);
    }

    const removeItensLista = (ids: number[]) => {
        let novaDispensa: ISecao[] = [];

        for (let i=0; i < dispensa.length; i++) {
            let novoData: IItemDispensa[] = [];
            for (let j=0; j < dispensa[i].data.length; j++) {
                if (ids.includes(dispensa[i].data[j].id)) {
                    novoData.push({ id: dispensa[i].data[j].id, nome: dispensa[i].data[j].nome, qtdDispensa: dispensa[i].data[j].qtdDispensa, qtdLista: 0 })
                } else {
                    novoData.push(dispensa[i].data[j]);
                }
            }
            novaDispensa.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: novoData })
        }

        setDispensa(novaDispensa);
    }

    return (
        <ContextoCompra.Provider 
            value={{
                dispensa,
                adicionaSecao,
                removeSecao,
                adicionaItem, 
                removeItem, 
                incrementaQuantidadeDispensa, 
                decrementaQuantidadeDispensa,
                incrementaQuantidadeLista,
                decrementaQuantidadeLista,
                removeItensLista}}>
            {children}
        </ContextoCompra.Provider>
    );
}

export const useCompra = () => {
  const context = useContext(ContextoCompra);
  if (!context) throw new Error('useCompra deve ser usado dentro de um CompraProvider');
  return context;
};