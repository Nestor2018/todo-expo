import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/home/Home";
import Detail from "../screens/detail/Detail";
import { COLORS } from "../constants";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: "Detalle",

            headerStyle: {
              backgroundColor: COLORS.detail
            },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerBackTitle: "Atras"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
