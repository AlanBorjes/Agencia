import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";

const BrandDetails = (props) => {
  const initialState = {
    id: "",
    name: "",
    desc: "",
    image: "",
    ubication: "",
  };

  const [brand, setBrand] = useState(initialState);
  const [loading, setLoading] = useState(true);
  
  const [image, setImage] = useState(null);
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
  const handleTextChange = (value, prop) => {
    setBrand({ ...brand, [prop]: value });
  };

  const getBrandById = async (id) => {
    const dbRef = firebase.db.collection("brands").doc(id);
    const doc = await dbRef.get();
    const brand = doc.data();
    setBrand({ ...brand, id: doc.id });
    setLoading(false);
  };

  const deleteBrand = async () => {
    setLoading(true);
    const dbRef = firebase.db.collection("brands").doc(props.route.params.brandId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("BrandsList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Brand",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteBrand() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const brandRef = firebase.db.collection("brands").doc(brand.id);
    await brandRef.set({
      name: brand.name,
      desc: brand.desc,
      image: image,
      ubication: brand.ubication,
    });
    setBrand(initialState);
    props.navigation.navigate("BrandsList");
  };

  useEffect(() => {
    getBrandById(props.route.params.brandId);
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
          value={brand.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="name"
          placeholder="Description"
          style={styles.inputGroup}
          value={brand.desc}
          onChangeText={(value) => handleTextChange(value, "desc")}
        />
      </View>
      <View>
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
      <View>
        <TextInput
          placeholder="ubication"
          style={styles.inputGroup}
          value={brand.ubication}
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

export default BrandDetails;
