import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../types/navigation";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export default function ProfileScreen({ route, navigation }: Props) {
  const userId = route.params?.userId ?? "me";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>userId: {userId}</Text>

      <Button
        title="Mostrar badge na aba Buscar"
        onPress={() => {
          // Exemplo simples: setar badge via setOptions na tela Search
          // (na prática você pode controlar isso por estado global)
          Alert.alert("Dica", "Controle badges por estado global/contexto.");
          navigation.getParent()?.setOptions?.({
            // Exemplo didático — use estado/condições reais no Tab.Screen
          });
        }}
      />

      <Button
        title="Voltar para Home (trocar de aba)"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: { fontSize: 22, fontWeight: "600" },
  subtitle: { fontSize: 16, color: "#555" },
});