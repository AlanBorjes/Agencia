import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import AddCarScreen from "./screens/AddCarScreen";
import CarDetailScreen from "./screens/CarDetailScreen";
import CarsList from "./screens/CarsList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="CarsList"
        component={CarsList}
        options={{ title: "Cars List" }}
      />
      <Stack.Screen
        name="AddCarScreen"
        component={AddCarScreen}
        options={{ title: "Add a New Car" }}
      />
      <Stack.Screen
        name="CarDetailScreen"
        component={CarDetailScreen}
        options={{ title: "Car Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
