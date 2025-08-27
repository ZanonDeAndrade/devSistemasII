import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.subtitle}>Sem novidades por aqui 👀</Text>
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