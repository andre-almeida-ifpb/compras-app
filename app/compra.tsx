import { SectionList, StyleSheet, Text, View } from "react-native";
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import dadosDispensa from "../dados/dispensa";
import dadosLista from "../dados/lista";
import { ItemLista, Lista } from "./lista";

export default function Compra() {

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
      }
    });

    data = data.filter( item => item.qtd > 0 );

    lista.push({
      id: section.id,
      nome: section.nome,
      data: data,
    });
  }

  function RenderItem(props: { item: ItemLista }) {
    const { item } = props;
    
    return (
      <View style={ styles.item }>
        <AdvancedCheckbox
          label={item.nome}
          checkedColor="#007AFF"
          uncheckedColor="#ccc"
          size={24}
        />
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
    backgroundColor: "#F0F8FF",
  },

  itemText: {
    flex: 1,
    fontSize: 18,
  },  

});