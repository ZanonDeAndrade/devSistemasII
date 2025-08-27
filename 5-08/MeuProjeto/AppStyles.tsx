import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20, 
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  
  cardContent: {
    padding: 15,
  },
 
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default styles;