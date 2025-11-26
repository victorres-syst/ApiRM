import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabsScreen from "../navigation/TabsScreen";
import DetalhesScreen from "./DetalhesScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export default function StackPrincipal({ navigation }) {
  return (
    <>
      <Header title="Principal" navigation={navigation} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      </Stack.Navigator>
    </>
  );
}
