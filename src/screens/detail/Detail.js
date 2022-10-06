import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const Detail = ({ route }) => {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text
        style={[styles.status, data.status ? styles.inactive : styles.active]}
      >
        La tarea está {data.status ? "terminada" : "activa"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
    height: "100%",
    backgroundColor: COLORS.detail,
    padding: SIZES.padding
  },
  title: {
    fontSize: SIZES.h1,
    textAlign: "center",
    color: COLORS.text
  },
  description: {
    marginTop: SIZES.margin,
    fontSize: SIZES.p,
    color: COLORS.text
  },
  status: {
    marginTop: SIZES.margin
  },
  active: {
    color: COLORS.success
  },
  inactive: {
    color: COLORS.cancel
  }
});

export default Detail;
