import React, { createContext, useContext, useState } from "react";

export interface IItemDispensa {
    id: number;
    nome: string;
    qtd: number
}

export interface ISecao {
    id: number;
    nome: string;
    data: IItemDispensa[];
}

interface IContextoCompra {
    dispensa: ISecao[];
    adicionaSecao: (secao: string) => void;
}

const ContextoCompra = createContext<IContextoCompra | undefined>(undefined);

export const CompraProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const  [dispensa, setDispensa] = useState<ISecao[]>([]);

    const adicionaSecao = (secao: string) => {
        let newId: number = 1;
        for (let i=0; i < dispensa.length; i++) {
            if (dispensa[i].id >= newId) {
                newId = dispensa[i].id+1;
            }
        }

        setDispensa(prev => [...prev, {id: newId, nome: secao, data: []}]);
    }

    return (
        <ContextoCompra.Provider value={{dispensa,adicionaSecao}}>
            {children}
        </ContextoCompra.Provider>
    );
}

export const useCompra = () => {
  const context = useContext(ContextoCompra);
  if (!context) throw new Error('useShopping deve ser usado dentro de um ShoppingProvider');
  return context;
};