import { Text, View, Image, FlatList, SafeAreaView } from "react-native";
import styles from "./AppStyles"; 
import games from "./data"; 


interface Game {
  id: number;
  name: string;
  platform: string;
  genre: string;
  image: string;
}

const GameItem = ({ item }: { item: Game }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>
        {item.platform} | {item.genre}
      </Text>
    </View>
  </View>
);

export default function App() {
  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Jogos</Text>
      <FlatList
        data={games} 
        renderItem={GameItem} 
        keyExtractor={(item) => item.id.toString()} 
        showsVerticalScrollIndicator={false} 
      />
    </SafeAreaView>
  );
}