import { CompraProvider } from '@/contextos/ContextoCompra';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from "expo-router";

export default function RootLayout() {

  return (
    <CompraProvider>
    <Tabs       
      screenOptions={{
        tabBarActiveBackgroundColor: '#ADD8E6',
        tabBarActiveTintColor: '#000',
      }
      }
    >
      <Tabs.Screen 
        name="compra" 
        options={{ 
          title: "Compra",
          tabBarIcon: () => <FontAwesome6 name="list-check" size={24} color="black" />
        }} 
      />
      <Tabs.Screen 
        name="lista" 
        options={{ 
          title: "Lista" ,
          tabBarIcon: () => <FontAwesome5 name="clipboard-list" size={24} color="black" />
        }} 
      />
      <Tabs.Screen 
        name="dispensa" 
        options={{ 
          title: "Dispensa",
          tabBarIcon: () => <FontAwesome5 name="list-ul" size={24} color="black" />,
        }} 
      />
    </Tabs>
    </CompraProvider>
  );
}
