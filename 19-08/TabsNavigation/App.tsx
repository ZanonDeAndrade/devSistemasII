import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types/navigation";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen"; // Ensure this file exists in the correct path
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused, size }) => {
            // Ícones por rota
            const name =
              route.name === "Home"
                ? focused
                  ? "home"
                  : "home-outline"
                : route.name === "Search"
                ? focused
                  ? "search"
                  : "search-outline"
                : focused
                ? "person"
                : "person-outline";
            return (
              <Ionicons
                name={name as keyof typeof Ionicons.glyphMap}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Início" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Buscar", tabBarBadge: undefined }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}