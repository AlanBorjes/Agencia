import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const CarsList = (props) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    firebase.db.collection("brands").onSnapshot((querySnapshot) => {
      const brands = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, desc, image, ubication } = doc.data();
        brands.push({
          id: doc.id,
          name,
          desc,
          image,
          ubication
        });
      });
      setBrands(brands);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("AddBrands")}
        title="Add Brand"
      />
       {/* <Button
        onPress={() => props.navigation.navigate("AddCarScreen")}
        title="Add Car"
      /> */}
      {brands.map((brand) => {
        return (
          <ListItem
            key={brand.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("BrandsDetails", {
                brandId: brand.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  brand.image,
              }}
            
            />
            <ListItem.Content>
              <ListItem.Title>{brand.name}</ListItem.Title>
              <ListItem.Subtitle>{brand.desc}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CarsList;
