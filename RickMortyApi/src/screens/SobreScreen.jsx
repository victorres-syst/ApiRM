import React from "react";
import { Card, Text, Icon } from "react-native-paper";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";

export default function SobreScreen({ navigation }) {
  return (
    <>
      <Header title="Sobre" navigation={navigation} />
      <ScreenContainer>
        <Card>
          <Card.Title title="Sobre o App" left={(p) => <Icon source="information" {...p} />} />
          <Card.Content>
            <Text>App consumindo API do Rick & Morty com React Native Paper.</Text>
          </Card.Content>
        </Card>
      </ScreenContainer>
    </>
  );
}
