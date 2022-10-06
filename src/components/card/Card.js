import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import Checkbox from "expo-checkbox";

import { COLORS, SIZES, SHADOW } from "../../constants";
import IconCancel from "../../../assets/icons/cancel";

const Card = ({
  data,
  index,
  navigation,
  setIsSelected,
  deleteItem,
  changeDescription
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Detail", { data })}
    >
      <Checkbox
        style={styles.checkbox}
        value={data.status}
        onValueChange={value => setIsSelected(index, value)}
        color={data.status ? COLORS.success : undefined}
      />
      <View style={styles.containerText}>
        <Text style={[styles.title, data.status && styles.textDecoration]}>
          {data.title}
        </Text>
        <TextInput
          style={styles.description}
          value={data.description}
          onChangeText={val => changeDescription(index, val)}
          placeholder="Escribe la descripción"
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => deleteItem(index)}>
          <IconCancel
            style={styles.icon}
            height={25}
            width={25}
            fill={COLORS.cancel}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "space-between"
  },
  containerText: {
    marginLeft: 20,
    width: "75%"
  },
  title: {
    fontSize: SIZES.h2,
    color: COLORS.text,
    textAlign: "center"
  },
  description: {
    fontSize: SIZES.p,
    color: COLORS.text,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text
  },
  icon: {
    alignSelf: "center"
  },
  checkbox: {},
  textDecoration: {
    textDecorationLine: "line-through"
  }
});

export default Card;
