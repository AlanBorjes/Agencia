import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import firebase from "../database/firebase";

const AddBrands = (props) => {
  const initalState = {
    name: "",
    desc: "",
    image: "",
    ubication: {},
  };
  const [image, setImage] = useState(null);
  const [state, setState] = useState(initalState);
  const [ubication, setUbication] = useState(null);
  useEffect( () => {
    (async()=>{
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!!!!");
        }
      }
    })
    
  }, []);
  const uploadImage = async (uri) => {
    setImage(uri);
  };
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result.uri);
    if (!result.cancelled) {
      uploadImage(result.uri).then(() => {});
    }
  };
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewBrand = async () => {
    if (state.name === "" || state.desc === "" || state.ubication === "" || image === null) {
      alert("Tienes que capturar todos los datos solicitados");
    } else {
      try {
        if (image == null) {
          console.log("Error");
        } else {
          await firebase.db.collection("brands").add({
            name: state.name,
            desc: state.desc,
            image: image,
            ubication: state.ubication,
          });
        }
        props.navigation.navigate("BrandsList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="desc"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "desc")}
          value={state.desc}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Pick Image" onPress={PickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="ubication"
          onChangeText={(value) => handleChangeText(value, "ubication")}
          value={state.ubication}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save Brand" onPress={() => saveNewBrand()} />
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

export default AddBrands;