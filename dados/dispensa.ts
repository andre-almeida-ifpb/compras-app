export interface ItemDispensa {
    id: number;
    nome: string;
    qtd: number
}

interface Dispensa {
    id: number;
    nome: string;
    data: ItemDispensa[];
}

const dispensa: Dispensa[] = [
    {
        id: 1,
        nome: "Frios e Laticínios",
        data: [
            { id: 1, nome: "Iogurte", qtd: 6 },
            { id: 2, nome: "Leite", qtd: 6 },   
            { id: 3, nome: "Queijo", qtd: 1 },
        ]
    },
    {
        id: 2,
        nome: "Limpeza",
        data: [
            { id: 4, nome: "Desinfetante", qtd: 3 },
            { id: 5, nome: "Detergente", qtd: 4 },
            { id: 6, nome: "Sabão em pó", qtd: 2 },
        ]
    }
]

export default dispensa;