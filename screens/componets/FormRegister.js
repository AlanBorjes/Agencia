import { ColorPropType, StyleSheet, Text, View } from 'react-native'
import React, {useState,useRef} from 'react'
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/validations';
import { fromPairs, isEmpty, size } from 'lodash';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import Toast from 'react-native-easy-toast';


export default function FormRegister(props) {
     //console.log(props);
     const navigation = useNavigation();
     const toastRef = useRef();
     const [showPass, setShowPass] = useState(false);
     const [showPassRepeat, setShowPassRepeat ] = useState(false);
     const [formData, setFormData] = useState(defaulFormValues());
     

     const onSubmit = () => {
          
          if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.passwordRepeat)){ //validación para que todos los campos de los imputs esten llenos
               // console.log("Todos los campos son obligatorios");
               console.log(toastRef)
               toastRef.current.show("Todos los campos son obligatorios");
          }else if(!validateEmail(formData.email)){
               // console.log("Email no valido");
               toastRef.current.show("Email no valido");
          }else if(size(formData.password) < 6){
               toastRef.current.show("Deben ser almenos 6 caracteres");
               // console.log("Deben ser almenos 6 caracteres");
          }else if(formData.password !== formData.passwordRepeat){
               toastRef.current.show("Las contraseñas debe ser iguales");
               // console.log("Las contraseñas debe ser iguales");
          }else{
               console.log("OK");
               firebase
               .auth()
               .createUserWithEmailAndPassword(formData.email, formData.password)
               .then(response =>{
                    //console.log(response);
                    navigation.navigate("CarsList");
               })
               .catch(err =>{
                     console.log(err);
w               })
          }
          // console.log("OnSubmit");
          //console.log(formData);
          //console.log(validateEmail(formData.email))
     };

     const capturarDatos = (e, type) =>{
          // console.log(type)
          // console.log(e.nativeEvent.text)
          setFormData({...formData, [type]:e.nativeEvent.text})
     }
     // tipe se refiere a que puede ser el ColorPropType, pass o pass repeat
  return (
       
    <View style={styles.formContainer}>
              <Toast ref={toastRef} opacity={0.9} position="center" />

      <Input
      onChange={(e)=>capturarDatos(e, "email")}
          placeholder="Correo eléctronico"
          containerStyle={styles.inputForm}
          rightIcon={
               <Icon
               type='material-community'
               name='at'
               iconStyle={styles.icon}
               />
          }
      />
      <Input
      onChange={(e)=>capturarDatos(e, "password")}
          placeholder="Constraseña"
          containerStyle={styles.inputForm}
          password={true}
          secureTextEntry={showPass ? false: true}
          rightIcon={
               <Icon
               type='material-community'
               name={showPass ? "eye-off-outline" : "eye-outline"}
               iconStyle={styles.icon}
               onPress={()=> setShowPass(!showPass)}
               />
          }
      />
      <Input
      onChange={(e)=>capturarDatos(e, "passwordRepeat")}
          placeholder="Repetir contraseña"
          containerStyle={styles.inputForm}
          password={true}
          secureTextEntry={showPassRepeat ? false : true}
          rightIcon={
               <Icon
               type='material-community'
               name={showPassRepeat ? "eye-off-outline" : "eye-outline"}
               iconStyle={styles.icon}
               onPress={()=> setShowPassRepeat(!showPassRepeat)}
               />
          }
      />
      <Button title="Registrar"
          containerStyle={styles.containerBtnRegister}
          buttonStyle={styles.btnRegister}
          onPress={()=>onSubmit()}
      />

    </View>
  )
}

function defaulFormValues(){
     return{
          email: "",
          password: "",
          passwordRepeat: "",
     }
}

const styles = StyleSheet.create({
     formContainer: {
          marginTop:30,
     },
     inputForm:{
          width: "100%",
          marginTop: 20
     },
     containerBtnRegister:{
          marginTop:20,
          width: "95%"
     },
     btnRegister:{
          backgroundColor: "#FCB823"
     },
     icon:{
          color: "#c1c1c1"
     }
})

