import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Todos from "./Todos";

const Home = props => {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Button title="Todos" onPress={() => props.navigation.navigate("Todos")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 33
  }
});

const { container, textFont } = styles;

const Routes = createStackNavigator({
  Home: { screen: Home },
  Todos: { screen: Todos }
});

export default Routes;
