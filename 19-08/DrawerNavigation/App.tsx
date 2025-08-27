import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type {
  RootDrawerParamList,
  HomeStackParamList,
} from "./types/navigation";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import NotificationsScreen from "./src/screens/NotificationScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Início" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.title ?? "Detalhes" })}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Cabeçalho da gaveta */}
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Olá, usuário 👋</Text>
        <Text style={{ color: "#666", marginTop: 4 }}>
          seu.email@dominio.com
        </Text>
      </View>

      {/* Itens padrão (telas) */}
      <DrawerItemList {...props} />

      {/* Ação extra opcional */}
      <DrawerItem
        label="Sair"
        onPress={() => console.log("Logout: exemplo")}
        icon={({ size }) => <Ionicons name="log-out-outline" size={size} />}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeStack"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ route }) => ({
            headerTitleAlign: "center",
            drawerType: "front",
            drawerActiveTintColor: "#c2185b",
            drawerIcon: ({ focused, size }) => {
              const name =
                route.name === "HomeStack"
                  ? focused
                    ? "home"
                    : "home-outline"
                  : route.name === "Notifications"
                  ? focused
                    ? "notifications"
                    : "notifications-outline"
                  : focused
                  ? "settings"
                  : "settings-outline";
              return (
                <Ionicons
                  name={name as keyof typeof Ionicons.glyphMap}
                  size={size}
                />
              );
            },
          })}
        >
          {/* 👇 Oculta o header do Drawer só nesta rota para não duplicar com o header do Stack */}
          <Drawer.Screen
            name="HomeStack"
            component={HomeStackNavigator}
            options={{ title: "Início", headerShown: false }}
          />
          <Drawer.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ title: "Notificações" }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Configurações" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}