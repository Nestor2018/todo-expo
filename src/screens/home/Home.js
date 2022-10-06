import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList
} from "react-native";

import { COLORS, SIZES, FONTS, SHADOW } from "../../constants";
import Card from "../../components/card/Card";

const Home = () => {
  const List = [
    { id: 1, title: "titulo1", description: "descripcion1", status: true },
    { id: 2, title: "titulo2", description: "descripcion2", status: true },
    { id: 3, title: "titulo3", description: "descripcion3", status: true },
    { id: 4, title: "titulo4", description: "descripcion4", status: true }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de actividades</Text>
      <FlatList
        style={{ flex: 1 }}
        data={List}
        renderItem={({ item, index }) => <Card data={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
    height: "100%",
    backgroundColor: COLORS.primary,
    padding: SIZES.padding
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.h1
  }
});
export default Home;
