import React from "react";
import { Image } from "react-native";
import { Card, Text, Icon } from "react-native-paper";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";

export default function DetalhesScreen({ route, navigation }) {
  const character = route.params.character;

  return (
    <>
      <Header title="Detalhes" navigation={navigation} />
      <ScreenContainer>
        <Card>
          <Card.Title title={character.name} left={(p) => <Icon source="account" {...p} />} />
          <Card.Content>
            <Image source={{ uri: character.image }} style={{ width: 200, height: 200, borderRadius: 16, alignSelf: "center", marginBottom: 16 }} />
            <Text>Status: {character.status}</Text>
            <Text>Species: {character.species}</Text>
            <Text>Gender: {character.gender}</Text>
            <Text>Origin: {character.origin.name}</Text>
            <Text>Location: {character.location.name}</Text>
          </Card.Content>
        </Card>
      </ScreenContainer>
    </>
  );
}
