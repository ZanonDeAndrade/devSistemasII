import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../types/navigation";

type Props = BottomTabScreenProps<RootTabParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        title="Ir para Buscar (q=react)"
        onPress={() => navigation.navigate("Search", { q: "react" })}
      />

      <Button
        title="Abrir Perfil (userId=123)"
        onPress={() => navigation.navigate("Profile", { userId: "123" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  title: { fontSize: 22, fontWeight: "600" },
});