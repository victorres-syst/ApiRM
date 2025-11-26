import React from "react";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";

export default function Header({ title, navigation }) {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
