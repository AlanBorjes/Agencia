import React, { useState, useEffect } from "react";
import {StyleSheet } from "react-native";
import { ListItem, Avatar,Button } from "react-native-elements";
import { BackgroundImage } from "react-native-elements/dist/config";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import firebase from "../database/firebase";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const CarsList = (props) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    firebase.db.collection("cars").onSnapshot((querySnapshot) => {
      const cars = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, desc, image, ubication } = doc.data();
        cars.push({
          id: doc.id,
          name,
          desc,
          image,
          ubication
        });
      });
      setCars(cars);
    });
  }, []);
  const scheme = useColorScheme();
    return (
      <AppearanceProvider>
    <ScrollView style={styles.container} theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
     
      {cars.map((car) => {
        return (
          <ListItem t
            key={car.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("CarDetailScreen", {
                carId: car.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  car.image,
              }}
            
            />
            <ListItem.Content>
              <ListItem.Title>{car.name}</ListItem.Title>
              <ListItem.Subtitle>{car.desc}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
        <Button buttonStyle={styles.btn}
        onPress={() => props.navigation.navigate("AddCarScreen")}
        title="Add Car"
      />
       <Button buttonStyle={styles.btn}
        onPress={() => props.navigation.navigate("BrandsList")}
        title="Brands"
      />
     
    </ScrollView>
    </AppearanceProvider>
  );
  
};

const styles = StyleSheet.create({
  btn:{
    flex:1,
    padding:10,
    marginTop:30,
    marginBottom:10,
    backgroundColor:"#AFA657",
    color:"#000"
  },
  container:{
    flex: 1,
    padding: 10,
  },
});
export default CarsList;
