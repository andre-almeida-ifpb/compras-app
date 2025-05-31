import { useCompra } from "@/contextos/ContextoCompra";
import { useEffect, useState } from "react";
import { Button, SectionList, StyleSheet, Text, View } from "react-native";
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

export interface IItemLista {
    id: number;
    nome: string;
    pego: boolean;
    qtd: number;
}

export interface ISecao {
    id: number;
    nome: string;
    data: IItemLista[];
}

export default function Compra() {

  const [lista, setLista] = useState<ISecao[]>([]);

  const {
      dispensa,
      removeItensLista} = useCompra();

  useEffect( () => {

    let listaNova: ISecao[] = [];

    for (let i=0; i < dispensa.length; i++) {
      let newData: IItemLista[] = [];
      for (let j=0; j < dispensa[i].data.length; j++) {
        if (dispensa[i].data[j].qtdLista > 0) {
          newData.push({id: dispensa[i].data[j].id, nome: dispensa[i].data[j].nome, pego: false, qtd: dispensa[i].data[j].qtdLista});
        }        
      }        
      listaNova.push({ id: dispensa[i].id, nome: dispensa[i].nome, data: newData});
    }

    setLista(listaNova);

  }, [dispensa]);

  function RenderItem(props: { item: IItemLista }) {
    const { item } = props;
    
    return (
      <View style={ [styles.item, {backgroundColor: item.pego ? '#dddddd' : '#bfddf3'}] }>
        <AdvancedCheckbox
          value={item.pego}
          onValueChange={ () => redefinirItem(item.id) }
          label={item.nome}
          checkedColor="green"
          uncheckedColor="black"
          size={24}
        />
        <View style={{ flex: 1 }} />
        <View style={{ backgroundColor: '#00a8ff', padding: 5, paddingHorizontal: 10, borderRadius: 30, marginRight: 10 }}>
          <Text style={{ color: 'white'}}>{item.qtd}</Text>
        </View>
      </View>
    );
  }

  function RenderSection(props: { id: number; nome: string }) {
    const { id, nome } = props;

    return (
      <View style={ styles.sectionHeader}>
        <Text style={ styles.sectionText }>{nome}</Text>
      </View>
      );
  }

  function redefinirItem( id: number ) {

    let listaNova: ISecao[] = [];

    for (let i=0; i < lista.length; i++) {
      let newData: IItemLista[] = [];
      for (let j=0; j < lista[i].data.length; j++) {
        if (lista[i].data[j].id == id) {
          newData.push({id: lista[i].data[j].id, nome: lista[i].data[j].nome, pego: !lista[i].data[j].pego, qtd: lista[i].data[j].qtd});
        } else {
          newData.push(lista[i].data[j]);
        }
      }        
      listaNova.push({ id: lista[i].id, nome: lista[i].nome, data: newData});
    }

    setLista(listaNova);

  }

  function finalizaCompra() {
    let ids: number[] = [];

    for (let i=0; i < lista.length; i++) {
      for (let j=0; j < lista[i].data.length; j++) {
        if (lista[i].data[j].pego) {
          ids.push(lista[i].data[j].id);
        }
      }
    }

    removeItensLista(ids);
  }

  return (
    <SectionList
      sections={lista}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RenderItem item={item} />}
      renderSectionHeader={({ section: { id, nome } }) => <RenderSection id={id} nome={nome} />}
      ListHeaderComponent={ () => <Button title="Finaliza compra" onPress={ () => finalizaCompra() } /> }
    />
  );
}

const styles = StyleSheet.create({
 
  sectionHeader: {
    padding: 10,
    backgroundColor: "#ADD8E6",
    marginVertical: 1
  },

  sectionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
 
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0F8FF",
  },

  itemText: {
    flex: 1,
    fontSize: 18,
  },  

});