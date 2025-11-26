import React from "react";
import { Card, Text, Icon } from "react-native-paper";
import ScreenContainer from "../components/ScreenContainer";

export default function FavoritosScreen() {
  return (
    <ScreenContainer>
      <Card>
        <Card.Title title="Favoritos" left={(p) => <Icon source="star" {...p} />} />
        <Card.Content>
          <Text>Você ainda não adicionou favoritos.</Text>
        </Card.Content>
      </Card>
    </ScreenContainer>
  );
}
