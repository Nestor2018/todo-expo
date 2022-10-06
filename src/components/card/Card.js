import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

import { COLORS, SIZES, FONTS, SHADOW } from "../../constants";

const Card = ({ data }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? "#4630EB" : undefined}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    borderColor: COLORS.white,
    borderWidth: 1,
    margin: SIZES.margin,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    flexDirection: "row",
    alignItems: "center"
  },
  containerText: {
    marginLeft: 20
    //alignItems: "center"
  },
  title: {
    fontSize: SIZES.h2,
    color: COLORS.text
  },
  description: {
    fontSize: SIZES.p,
    color: COLORS.text
  }
});

export default Card;
