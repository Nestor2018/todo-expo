import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";

import { COLORS, SIZES, FONTS, SHADOW } from "../../constants";
import Card from "../../components/card/Card";

const Home = () => {
  const List = [
    {
      id: 1,
      title: "titulo1",
      description: "descripcion1 mas larga",
      status: true
    },
    { id: 2, title: "titulo2", description: "descripcion2", status: true },
    { id: 3, title: "titulo3", description: "descripcion3", status: true },
    { id: 4, title: "titulo4", description: "descripcion4", status: true }
  ];

  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  function addText(text) {
    if (value !== "") {
      setList(prev => {
        return [
          ...prev,
          { title: text, description: "", status: true } // Adding a JS Object
        ];
      });
      setValue("");
    } else {
      alert("Please type in something!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de actividades</Text>
      <FlatList
        style={{ flex: 1 }}
        data={List}
        renderItem={({ item, index }) => <Card data={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.textBoxWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="New Task"
          placeholderTextColor={COLORS.primary}
          onChangeText={text => setValue(text)}
          value={value}
        />
        <TouchableOpacity style={styles.btn} onPress={() => addText(value)}>
          <Text style={{ fontSize: 34, color: COLORS.secondary }}>+</Text>
        </TouchableOpacity>
      </View>
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
  },
  textBoxWrapper: {
    width: "100%",
    position: "absolute",
    bottom: "5%",
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.padding
  },
  textInput: {
    ...SHADOW,
    borderRadius: SIZES.textBoxRadius,
    backgroundColor: COLORS.secondary,
    height: 42,
    paddingLeft: 15,
    width: "90%",
    color: COLORS.primary,
    marginRight: 15
  },
  btn: {
    ...SHADOW,
    backgroundColor: COLORS.white,
    height: 42,
    width: 42,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Home;
