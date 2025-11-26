import React from "react";
import { View, StyleSheet } from "react-native";

export default function ScreenContainer({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFA",
    gap: 16,
  },
});
