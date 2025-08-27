import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../types/navigation";

type Props = BottomTabScreenProps<RootTabParamList, "Search">;

export default function SearchScreen({ route, navigation }: Props) {
  const query = route.params?.q ?? "";

  useEffect(() => {
    navigation.setOptions({ title: query ? `Buscar: ${query}` : "Buscar" });
  }, [query, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <Text style={styles.subtitle}>
        Parâmetro recebido: {query ? `"${query}"` : "(vazio)"}
      </Text>

      <Button
        title="Ir ao Perfil do usuário 999"
        onPress={() => navigation.navigate("Profile", { userId: "999" })}
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