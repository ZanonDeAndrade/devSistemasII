import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Props = { todo: Todo };

const TodoCard = React.memo(function TodoCard({ todo }: Props) {
  return (
    <View style={styles.card} accessible accessibilityRole="summary">
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {todo.title}
        </Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: todo.completed ? "#22c55e33" : "#ef444433" },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: todo.completed ? "#15803d" : "#b91c1c" },
            ]}
          >
            {todo.completed ? "Concluído" : "Pendente"}
          </Text>
        </View>
      </View>

      <Text style={styles.cardSubtitle}>
        ID: {todo.id} · User: {todo.userId}
      </Text>
    </View>
  );
});

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: { flex: 1, fontSize: 16, fontWeight: "700", color: "#111827" },
  cardSubtitle: { marginTop: 6, color: "#6b7280" },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  badgeText: { fontSize: 12, fontWeight: "700" },
});
