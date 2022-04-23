import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddCarScreen = (props) => {
  const initalState = {
    name: "",
    desc: "",
    image:"",
    ubication:"",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewCar = async () => {
    if (state.name === "") {
      alert("please provide a name");
    } else {

      try {
        await firebase.db.collection("cars").add({
          name: state.name,
          desc: state.desc,
          image: state.image,
          ubication: state.ubication,
        });

        props.navigation.navigate("CarsList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="desc"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "desc")}
          value={state.desc}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="image"
          autoCompleteType="img"
          onChangeText={(value) => handleChangeText(value, "image")}
          value={state.image}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="ubicaton"
          onChangeText={(value) => handleChangeText(value, "ubication")}
          value={state.ubication}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save Car" onPress={() => saveNewCar()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default AddCarScreen;
