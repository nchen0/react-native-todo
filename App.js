import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
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
  Home: { screen: Home }
});

export default Home;
