import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../src/screens/Welcome";
import Home from "../src/screens/Home";
import Result from "../src/screens/Result";

const { Navigator, Screen } = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Welcome" component={Welcome} />
        <Screen name="Home" component={Home} />
        <Screen name="Result" component={Result} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
