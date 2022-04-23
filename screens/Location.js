import { Dimensions, StyleSheet, Text, View, Image} from 'react-native'
import React, { useState } from 'react'
import MapView, {Marker, Circle} from "react-native-maps";

export default function Location() {
     //18.8537062,-99.1983841
     const [region, setRegion]= useState({
          latitude:18.8537062,
          longitude:-99.1983841,
          latitudeDelta:0.0522,
          longitudeDelta:0.0690

     });
     const [marker, setMarker] = useState({
          latitude:18.8537062,
          longitude:-99.1983841,
     })
  return (
    <View style={styles.container}>
      <MapView
      style={styles.mapa}
      region={region}
      onPress={(e)=>{
           setMarker(e.nativeEvent.coordinate), 
           setRegion(e.nativeEvent.coordinate);
      }}
     //  onRegionChange={(region)=>{console.log(region)}} //toma todos los datos
      onRegionChangeComplete={(region)=>{console.log(region)}}
     //  onRegionChangeComplete={(region)=>{console.log("regComLat:" + region.latitude), console.log("regComLong:" + region.longitude)}} //solo toma el dato final
      >
          <Marker
           key={1}
           coordinate={marker}
           title={"agencia"}
           description={"Venta En Agencia"}
          //  image={{uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"}}
          >
               <Image source={{
                    uri:"https://noticias.coches.com/wp-content/uploads/2020/12/coche-colores-Skoda-Fabia.jpg"
               }}a
               style={styles.marcador}
               />
          </Marker>
          <Circle
          radius={1000}
          center={marker}
          // center={{ latitude:18.8537062,longitude:-99.1983841}}
          strokeWidth={2}
          strokeColor={"red"}
          fillColor={"rgba(255,0,0,0.1)"}
          />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
     container:{
          flex: 1, //PARA QUE TOME EL 100% DE LA PANTALLA
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center"
     },
     mapa:{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
     },
     marcador:{
          width: 100,
          height: 50
     }
});