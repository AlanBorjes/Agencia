import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

// Components
import AddCarScreen from "./screens/AddCarScreen";
import CarDetailScreen from "./screens/CarDetailScreen";
import CarsList from "./screens/CarsList";
import Login from "./screens/Login"
import register from "./screens/Register"

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
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="CarsList"
        component={CarsList}
        options={{ title: "Cars List" , headerBackTitleVisible:false,}}
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
      
      <Stack.Screen
        name="register"
        component={register}
        options={{ title: "register" }}
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
