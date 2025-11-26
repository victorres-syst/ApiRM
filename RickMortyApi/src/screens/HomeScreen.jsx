import React from "react";
import { View, FlatList, Image } from "react-native";
import { Card, Text, Icon, ActivityIndicator } from "react-native-paper";
import ScreenContainer from "../components/ScreenContainer";

export default function HomeScreen({ navigation }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function loadData() {
    try {
      const r = await fetch("https://rickandmortyapi.com/api/character");
      const json = await r.json();
      setData(json.results);
    } catch (e) {
      console.log("Erro:", e);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenContainer>
      {loading ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <Card mode="elevated" onPress={() => navigation.navigate("Detalhes", { character: item })}>
              <Card.Title title={item.name} left={(p) => <Icon source="alien" {...p} />} />
              <Card.Content>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 8 }} />
                  <View>
                    <Text>Status: {item.status}</Text>
                    <Text>Species: {item.species}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </ScreenContainer>
  );
}
