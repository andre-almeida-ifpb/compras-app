import { Button, SectionList, StyleSheet, Text, View } from "react-native";
import dadosDispensa from "../dados/dispensa";
import dadosLista from "../dados/lista";

export interface ItemLista {
    id: number;
    nome: string;
    qtd: number;
    qtdDispensa: number;
}

export interface Lista {
    id: number;
    nome: string;
    data: ItemLista[];
}

export default function Lista() {

  let lista: Lista[] = [];

  for (let i = 0; i < dadosDispensa.length; i++) {
    const section = dadosDispensa[i];
    let data = section.data.map((item) => {
      let itemLista = dadosLista.find( itemLista => itemLista.id == item.id );
      let quantidade = 0;
      if (itemLista != undefined) {
        quantidade = itemLista.qtd;
      }
      return {
        id: item.id,
        nome: item.nome,
        qtd: quantidade,
        qtdDispensa: item.qtd,
      }
    });

    lista.push({
      id: section.id,
      nome: section.nome,
      data: data,
    });
  }

  function RenderItem(props: { item: ItemLista }) {
    const { item } = props;
    
    return (
      <View style={ [styles.item, {backgroundColor: item.qtd > 0 ? "#A1FCFE" : "#F0F8FF" } ] }>
        <View style={{ backgroundColor: '#00a8ff', padding: 5, paddingHorizontal: 10, borderRadius: 30, marginRight: 10 }}>
          <Text style={{ color: 'white'}}>{item.qtdDispensa}</Text>
        </View>
        <Text style={ styles.itemText }>{item.nome}</Text>
        <Button title="-" />
        <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{item.qtd}</Text>
        <Button title="+" />
      </View>
    );
  }

  function RenderSection(props: { id: number; nome: string }) {
    const { id, nome } = props;

    return (
      <View style={ styles.sectionHeader }>
        <Text style={ styles.sectionText }>{nome}</Text>
      </View>
      );
  }

  return (
    <SectionList
      sections={lista}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RenderItem item={item} />}
      renderSectionHeader={({ section: { id, nome } }) => <RenderSection id={id} nome={nome} />}
    />
  );
}

const styles = StyleSheet.create({
 
  sectionHeader: {
    padding: 10,
    backgroundColor: "#ADD8E6",
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
  },

  itemText: {
    flex: 1,
    fontSize: 18,
  },  

});