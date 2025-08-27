import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props) {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? "Detalhes"}</Text>
      <Text style={styles.subtitle}>ID: {id}</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "600" },
  subtitle: { fontSize: 16, color: "#555" },
});