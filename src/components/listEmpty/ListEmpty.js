import React from "react";
import { Text, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const ListEmpty = () => {
  return <Text style={styles.text}>No hay actividades</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    padding: SIZES.padding
  }
});

export default ListEmpty;
