import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Home from "./src/screens/home/Home";
import StackNavigation from "./src/navigation/StackNavigation";

export default function App() {
  return <StackNavigation />;
}
