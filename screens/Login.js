import React, { useRef } from 'react';
import { Divider } from 'react-native-elements';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import FormLogin from '../screens/componets/FormLogin';
import Toast from 'react-native-easy-toast';


export default function Login(props) {
    const toastRef = useRef();
 return (
   <ScrollView>
        <Image style={styles.logo} resizeMode="contain" 
        source={{ uri: "https://i0.wp.com/www.webcancun.com.mx/directorio/wp-content/uploads/2019/01/agencias-de-autos-en-cancun.jpg?fit=615%2C320&ssl=1"}}/>
        <View style={styles.viewContainer}>
             <FormLogin toastRef={toastRef}/>
             
             <CrearCuenta toastRef={toastRef}/>
        </View>
         <Toast ref={toastRef} opacity={0.9} position="center" />
   </ScrollView>
 );
}

function CrearCuenta(){
     const navigation = useNavigation();
    return(
         <Text style={styles.textRegister}>¿Aún no tienes cuenta?{"  "}
              <Text style={styles.btnRegistrar} 
                   onPress={()=>  navigation.navigate("register")     }
                   >
                   Registrate aquí
              </Text>
         </Text>
    )
}

const styles = StyleSheet.create({
    logo:{
         height: 100,
         width: 200,
         alignSelf:"center",
         marginTop: 200
    },
    viewContainer:{
         marginRight: 40,
         marginLeft:40,
    },
    textRegister:{
         marginTop: 15,
         marginLeft: 10,
         marginRight: 10,
         textAlign: "center"
    },
    btnRegistrar:{
         color: "#fcb823",
         fontWeight: "bold",
    },
    divider:{
         backgroundColor: "#fcb823",
         margin: 40,
    }

})