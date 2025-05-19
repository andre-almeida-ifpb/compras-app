import Feather from '@expo/vector-icons/Feather';
import { Button, SectionList, StyleSheet, Text, View } from "react-native";
import dispensa, { ItemDispensa } from "../dados/dispensa";

interface PropsItem {
  item: ItemDispensa;
}

export default function Dispensa() {

  function RenderItem(props: PropsItem) {
    const { item } = props;
    
    return (
      <View style={ styles.item }>
        <Feather name="edit-2" size={24} color="black" />
        <Feather name="trash-2" size={24} color="black" />
        <Text style={ styles.itemText }>{item.nome}</Text>
        <Button title="-" />
        <Text style={{ fontSize: 18, marginHorizontal: 5 }}>0</Text>
        <Button title="+" />
      </View>
    );
  }

  function RenderSection(props: { id: number; nome: string }) {
    const { id, nome } = props;

    return (
      <View style={ styles.sectionHeader}>
        <Text style={ styles.sectionText }>{nome}</Text>
        <Button title="+" />
      </View>
      );
  }

  return (
    <>
      <SectionList
        sections={dispensa}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItem item={item} />}
        renderSectionHeader={({ section: { id, nome } }) => <RenderSection id={id} nome={nome} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
 
  sectionHeader: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ADD8E6",
  },

  sectionText: {
    flex: 1,
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
    marginLeft: 10,
  },  

});