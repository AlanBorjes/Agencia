import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, {useRef} from "react";
import { Icon, Input, Button } from "react-native-elements";
import FormRegister from "../screens/componets/FormRegister";
import  {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Register() {
  const toastRef = useRef();
  console.log(toastRef);
  return (
    <KeyboardAwareScrollView>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={{
          uri: "https://i0.wp.com/www.webcancun.com.mx/directorio/wp-content/uploads/2019/01/agencias-de-autos-en-cancun.jpg?fit=615%2C320&ssl=1",
        }}
      />
      <View style={styles.viewForm}>
        <FormRegister></FormRegister>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  viewForm: {
   marginHorizontal: 40,
  },
  logo: {
    height: 200,
    width: 300,
    alignSelf: "center",
  },
});


