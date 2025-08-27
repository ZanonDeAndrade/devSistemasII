import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import TodoCard, { Todo } from "./src/components/TodoCard";
import AppHeader from "./src/components/AppHeader";
import AppFooter from "./src/components/AppFooter";
import Login from "./src/components/Login";

function TodosScreen() {
  const insets = useSafeAreaInsets();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async (signal?: AbortSignal) => {
    try {
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: Todo[] = await res.json();
      setTodos(json);
    } catch (e: any) {
      if (e.name !== "AbortError")
        setError(e.message ?? "Erro ao buscar dados");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    loadTodos(ctrl.signal);
    return () => ctrl.abort();
  }, [loadTodos]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const ctrl = new AbortController();
    loadTodos(ctrl.signal);
  }, [loadTodos]);

  const data = useMemo(() => todos, [todos]);
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => <TodoCard todo={item} />,
    []
  );
  const keyExtractor = useCallback((item: Todo) => String(item.id), []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center} edges={["top", "bottom"]}>
        <StatusBar barStyle="dark-content" translucent={false} />
        <ActivityIndicator size="large" />
        <Text style={styles.helperText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center} edges={["top", "bottom"]}>
        <StatusBar barStyle="dark-content" translucent={false} />
        <Text style={[styles.helperText, { color: "#b91c1c" }]}>{error}</Text>
        <View style={{ height: 8 }} />
        <Text
          onPress={() => {
            setLoading(true);
            const ctrl = new AbortController();
            loadTodos(ctrl.signal);
          }}
          style={styles.retry}
          accessibilityRole="button"
        >
          Tentar novamente
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>

      {/* LOGIN */}
      <Login />
      
      <StatusBar barStyle="dark-content" translucent={false} />

      {/* HEADER */}
      <SafeAreaView edges={["top"]} style={styles.headerSafe}>
        <View style={styles.headerWrap}>
          <AppHeader
            title="Todos"
            subtitle="Lista de tarefas"
            count={data.length}
          />
        </View>
      </SafeAreaView>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          initialNumToRender={12}
          windowSize={7}
          removeClippedSubviews
          scrollIndicatorInsets={{ bottom: insets.bottom }}
        />
      </View>

      {/* FOOTER */}
      <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
        <View style={styles.footerWrap}>
          <AppFooter />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TodosScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fa" },

  // HEADER
  headerSafe: {
    backgroundColor: "#f6f8fa",
  },
  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },

  // LISTA
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },

  // FOOTER
  footerSafe: {
    backgroundColor: "#f6f8fa",
  },
  footerWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },

  // Estados
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  helperText: { marginTop: 8, color: "#475569" },
  retry: {
    color: "#2563eb",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
