import React, { useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native"; // 👈 importa as ações do drawer
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => parent?.dispatch(DrawerActions.openDrawer())}
          style={{ paddingRight: 8 }}
          accessibilityLabel="Abrir menu"
        >
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        title="Ir para Detalhes (id=101)"
        onPress={() =>
          navigation.navigate("Details", { id: 101, title: "Item #101" })
        }
      />

      <Button
        title="Abrir gaveta"
        onPress={() =>
          navigation.getParent()?.dispatch(DrawerActions.openDrawer())
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
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "600" },
});