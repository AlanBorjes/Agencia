import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const CarDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    desc: "",
    image:"",
    ubication:"",
  };

  const [car, setCar] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setCar({ ...car, [prop]: value });
  };

  const getCarById = async (id) => {
    const dbRef = firebase.db.collection("cars").doc(id);
    const doc = await dbRef.get();
    const car = doc.data();
    setCar({ ...car, id: doc.id });
    setLoading(false);
  };

  const deleteCar = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("cars")
      .doc(props.route.params.carId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("CarsList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the vehicle",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteCar() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const carRef = firebase.db.collection("cars").doc(car.id);
    await carRef.set({
      name: car.name,
      desc: car.desc,
      image: car.image,
      ubication: car.ubication,
    });
    setCar(initialState);
    props.navigation.navigate("CarsList");
  };

  useEffect(() => {
    getCarById(props.route.params.carId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={car.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="name"
          placeholder="Description"
          style={styles.inputGroup}
          value={car.desc}
          onChangeText={(value) => handleTextChange(value, "desc")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Image"
          style={styles.inputGroup}
          value={car.image}
          onChangeText={(value) => handleTextChange(value, "image")}
        />
      </View>
      <View>
        <TextInput
          placeholder="ubication"
          style={styles.inputGroup}
          value={car.ubication}
          onChangeText={(value) => handleTextChange(value, "ubication")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default CarDetailScreen;
