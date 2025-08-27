import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props) {
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? "Detalhes"}</Text>
      <Text style={styles.subtitle}>ID do item: {itemId}</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Button
        title="Voltar ao Início (reset)"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              { name: "Home", params: { welcome: "De volta ao início!" } },
            ],
          })
        }
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
  subtitle: { fontSize: 16, color: "#555" },
});