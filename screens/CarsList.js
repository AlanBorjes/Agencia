import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

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

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("AddCarScreen")}
        title="Add Car"
      />
      {cars.map((car) => {
        return (
          <ListItem
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
                  "https://noticias.coches.com/wp-content/uploads/2020/12/coche-colores-Skoda-Fabia.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{car.name}</ListItem.Title>
              <ListItem.Subtitle>{car.desc}</ListItem.Subtitle>
              <ListItem.Subtitle>{car.image}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CarsList;
