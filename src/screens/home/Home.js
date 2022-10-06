import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import { COLORS, SIZES, SHADOW } from "../../constants";
import Card from "../../components/card/Card";
import Http from "../../utilities/http";
import ListEmpty from "../../components/listEmpty/ListEmpty";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const [value, setValue] = useState("");
  const [numberRamdom, setNumberRamdom] = useState("");
  const [search, setSearch] = useState("");

  /**
   * addActivity. -> add activity to list
   *
   * @param {string} text -> title of the activity
   */
  const addActivity = text => {
    if (value !== "") {
      setList(prev => {
        return [...prev, { title: text, description: "", status: false }];
      });

      setListSearch(prev => {
        return [...prev, { title: text, description: "", status: false }];
      });
      setValue("");
    } else {
      Alert.alert(
        "Campo vacio",
        "Por favor escriba el nombre de la actividad"
      );
    }
  };

  /**
   * addRamdom. -> add ramdoms activities to list
   */
  const addRamdom = async () => {
    if (numberRamdom !== "") {
      setLoading(true);
      let resp = await Http.instance.get(
        `https://catfact.ninja/facts?limit=${numberRamdom}&max_length=140`
      );

      resp.data.map(item => {
        setList(prev => {
          return [
            ...prev,
            { title: item.fact, description: "", status: false }
          ];
        });
        setListSearch(prev => {
          return [
            ...prev,
            { title: item.fact, description: "", status: false }
          ];
        });
        setNumberRamdom("");
      });
      setLoading(false);
    } else {
      Alert.alert(
        "Campo vacio",
        "Por favor el número de actividades que desea agregar"
      );
    }
  };

  /**
   * setIsSelected. -> change status activity
   *
   * @param {number} index -> index of the activity
   * @param {boolean} value -> boolean button checkbox of the activity
   */
  const setIsSelected = (index, value) => {
    let data = [];

    for (let i = 0; i < list.length; i++) {
      if (index === i) {
        data.push({ ...list[i], status: value });
      } else {
        data.push(list[i]);
      }
    }

    setList(data);
    setListSearch(data);
  };

  /**
   * changeDescription. -> change description of the activity
   *
   * @param {number} index -> index of the activity
   * @param {text} value ->  description of the activity
   */
  const changeDescription = (index, value) => {
    let data = [];

    for (let i = 0; i < list.length; i++) {
      if (index === i) {
        data.push({ ...list[i], description: value });
      } else {
        data.push(list[i]);
      }
    }

    setList(data);
    setListSearch(data);
  };

  /**
   * deleteItem. -> delete activity from the list
   *
   * @param {number} idx -> index of the activity
   */
  const deleteItem = idx => {
    Alert.alert(
      "Eliminar actividad",
      "¿Estas seguro que desea eliminar esta actividad?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Aceptar",
          onPress: () => {
            const data = list.filter((item, index) => index !== idx);
            setList(data);
            setListSearch(data);
          }
        }
      ]
    );
  };

  /**
   * searchFilter. -> filter activities by description text
   *
   * @param {text} text -> text to filter
   */
  const searchFilter = text => {
    if (text) {
      const newData = list.filter(function(item) {
        const itemData = item.description
          ? item.description.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setListSearch(newData);
      setSearch(text);
    } else {
      setListSearch(list);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de actividades</Text>
      {loading ? (
        <ActivityIndicator color="white" size="large" style={styles.loader} />
      ) : null}
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilter(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Busqueda por descripción"
      />
      <FlatList
        style={{ flex: 1 }}
        data={listSearch}
        renderItem={({ item, index }) => (
          <Card
            data={item}
            index={index}
            navigation={navigation}
            setIsSelected={setIsSelected}
            deleteItem={deleteItem}
            changeDescription={changeDescription}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<ListEmpty />}
        initialNumToRender={7}
      />
      <View style={styles.textBoxWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Agregar actividades aleatoriamente"
          placeholderTextColor={COLORS.white}
          onChangeText={text => setNumberRamdom(text)}
          value={numberRamdom}
        />
        <TouchableOpacity style={styles.btn} onPress={() => addRamdom()}>
          <Text style={{ fontSize: 34, color: COLORS.secondary }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textBoxWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Agregar actividad"
          placeholderTextColor={COLORS.white}
          onChangeText={text => setValue(text)}
          value={value}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => addActivity(value)}
        >
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
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.h1
  },
  textBoxWrapper: {
    width: "90%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.padding
  },
  textInput: {
    ...SHADOW,
    borderRadius: SIZES.textBoxRadius,
    backgroundColor: COLORS.primary,
    height: 42,
    paddingLeft: 15,
    width: "90%",
    color: COLORS.white,
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
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF"
  }
});
export default Home;
