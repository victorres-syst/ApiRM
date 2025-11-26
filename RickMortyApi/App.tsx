import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  DefaultTheme as NavLight,
} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Provider as PaperProvider,
  MD3LightTheme,
  Appbar,
  Text,
  Button,
  Card,
  Icon,
  ActivityIndicator,
} from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

/* ===================== Temas (Paper + Navigation) ===================== */

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#FAFAFA',
    surface: '#FFFFFF',
  },
};

const navTheme = {
  ...NavLight,
  colors: {
    ...NavLight.colors,
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
  },
};

/* ===================== Header Componente ===================== */

function Header({ title, navigation }: any) {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

/* ===================== Telas ===================== */

/* ---------- HomeScreen: Lista personagens da API ---------- */

function HomeScreen({ navigation }: any) {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function loadData() {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const json = await response.json();
      setData(json.results);
    } catch (e) {
      console.log("Erro ao carregar dados:", e);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenContainer>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <Card
              mode="elevated"
              onPress={() => navigation.navigate('Detalhes', { character: item })}
            >
              <Card.Title title={item.name} left={(p) => <Icon source="alien" {...p} />} />
              <Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                  />
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

/* ---------- Favoritos (mock) ---------- */

function FavoritosScreen() {
  return (
    <ScreenContainer>
      <Card mode="elevated">
        <Card.Title title="Favoritos" left={(p) => <Icon source="star" {...p} />} />
        <Card.Content>
          <Text>Você ainda não adicionou favoritos.</Text>
        </Card.Content>
      </Card>
    </ScreenContainer>
  );
}

/* ---------- Tabs ---------- */

function TabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarIcon: ({ color, size }) => {
          const icon =
            route.name === 'Home' ? 'home' : 'star-outline';
          return <Icon source={icon as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Favoritos" component={FavoritosScreen} />
    </Tabs.Navigator>
  );
}

/* ---------- DetalhesScreen ---------- */

function DetalhesScreen({ route, navigation }: any) {
  const character = route.params?.character;

  return (
    <>
      <Header title="Detalhes" navigation={navigation} />
      <ScreenContainer>
        <Card>
          <Card.Title
            title={character.name}
            left={(p) => <Icon source="account" {...p} />}
          />
          <Card.Content>
            <Image
              source={{ uri: character.image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 16,
                alignSelf: 'center',
                marginBottom: 16,
              }}
            />
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

/* ---------- Stack Principal ---------- */

function StackPrincipal({ navigation }: any) {
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

/* ---------- Sobre Screen ---------- */

function SobreScreen({ navigation }: any) {
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

/* ---------- Container padrão ---------- */

function ScreenContainer({ children }: { children: React.ReactNode }) {
  return <View style={styles.screen}>{children}</View>;
}

/* ===================== App Principal ===================== */

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#2563EB',
            drawerStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          <Drawer.Screen
            name="Principal"
            component={StackPrincipal}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon source="view-dashboard" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Sobre"
            component={SobreScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon source="information-outline" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

/* ===================== Styles ===================== */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
    gap: 16,
  },
});
