import { IItemDispensa, useCompra } from "@/contextos/ContextoCompra";
import { memo, useCallback } from "react";
import { Button, SectionList, StyleSheet, Text, View } from "react-native";

export default function Lista() {

  const {
    dispensa, 
    incrementaQuantidadeLista,
    decrementaQuantidadeLista} = useCompra();

  const RenderItem = memo((props: { item: IItemDispensa }) => {
    const { item } = props;
    
    return (
      <View style={ [styles.item, {backgroundColor: item.qtdLista > 0 ? "#A1FCFE" : "#F0F8FF" } ] }>
        <View style={{ backgroundColor: item.qtdDispensa == 0 ? '#DCE6F5' : '#00a8ff', padding: 5, paddingHorizontal: 10, borderRadius: 30, marginRight: 10 }}>
          <Text style={{ color: 'white'}}>{item.qtdDispensa}</Text>
        </View>
        <Text style={ styles.itemText }>{item.nome}</Text>
        <Button title="-" onPress={ () => decrementaQuantidadeLista(item.id) }/>
        <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{item.qtdLista}</Text>
        <Button title="+" onPress={ () => incrementaQuantidadeLista(item.id) }/>
      </View>
    );
  });

  const renderItem = useCallback(
    ({ item }: { item: IItemDispensa }) => <RenderItem item={item} />,
    [dispensa]
  );

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
      sections={dispensa}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      renderSectionHeader={({ section: { id, nome } }) => <RenderSection id={id} nome={nome} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
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