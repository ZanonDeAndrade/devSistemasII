import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const handleLogin = () => {
    // Após autenticar, "zera" a pilha para evitar voltar ao Login
    navigation.reset({
      index: 0,
      routes: [{ name: "Home", params: { welcome: "Bem-vindo!" } }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <Button title="Entrar" onPress={handleLogin} />
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