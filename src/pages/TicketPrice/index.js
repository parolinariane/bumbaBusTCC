import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function PageMap() {


  const navigation = useNavigation();
  

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>

        <Image
            animation="flipInY"
            source={require('../../assets/intercamp.png')}
            style={styles.imgLogo}
            resizeMode="contain"
        />

        <Image
            animation="flipInY"
            source={require('../../assets/VT.png')}
            style={styles.imgCard}
            resizeMode="contain"
        />

        <Text style={styles.textVT}>TARIFA COM </Text>
        <Text style={styles.textVT2}>VALE-TRANSPORTE</Text>
        <Text style={styles.price}>R$ 5,90</Text>


        <Image
            animation="flipInY"
            source={require('../../assets/BUComum.png')}
            style={styles.imgCard}
            resizeMode="contain"
        />

        <Text style={styles.textBUC}>TARIFA BILHETE </Text>
        <Text style={styles.textBUC2}>ÚNICO COMUM</Text>
        <Text style={styles.price}>R$ 5,45</Text>


        <Image
            animation="flipInY"
            source={require('../../assets/BUUniversitario.png')}
            style={styles.imgCard}
            resizeMode="contain"
        />

        <Text style={styles.textBUU}>TARIFA BILHETE </Text>
        <Text style={styles.textBUU2}>UNIVERSITÁRIO</Text>
        <Text style={styles.price}>R$ 2,73</Text>

        <Image
            animation="flipInY"
            source={require('../../assets/BUEscolar.jpg')}
            style={styles.imgCardEsc}
            resizeMode="contain"
        />

        <Text style={styles.textBUE}>TARIFA BILHETE </Text>
        <Text style={styles.textBUE2}>ESCOLAR</Text>
        <Text style={styles.price}>R$ 2,18</Text>

        <Image
            animation="flipInY"
            source={require('../../assets/Integration.png')}
            style={styles.imgCardEsc}
            resizeMode="contain"
        />

        <Text style={styles.textBUE}>INTEGRAÇÃO</Text>
        <Text style={styles.price}>R$ 0,45</Text>


    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  imgLogo:{
    height: 60,
    marginTop: -80,
  },

  imgCard:{
    height: 50,
    marginTop: 70,
    marginLeft: -280,
  },

  imgCardEsc:{
    height: 58,
    marginTop: 70,
    marginLeft: -280,
  },

  price:{
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: -35,
    marginLeft: 269,
  },
  
  textVT:{
    fontWeight: 'bold',
    marginTop: -45,
    marginLeft: -60,
    fontSize: 14,
  },

  textVT2:{
    fontWeight: 'bold',
    marginTop: -5,
    marginLeft: -10,
    fontSize: 14,
  },

  textBUC:{
    fontWeight: 'bold',
    marginTop: -45,
    marginLeft: -30,
    fontSize: 14,
  },

  textBUC2:{
    fontWeight: 'bold',
    marginTop: -5,
    marginLeft: -39,
    fontSize: 14,
  },

  textBUU:{
    fontWeight: 'bold',
    marginTop: -45,
    marginLeft: -30,
    fontSize: 14,
  },

  textBUU2:{
    fontWeight: 'bold',
    marginTop: -5,
    marginLeft: -35,
    fontSize: 14,
  },

  textBUE:{
    fontWeight: 'bold',
    marginTop: -45,
    marginLeft: -30,
    fontSize: 14,
  },

  textBUE2:{
    fontWeight: 'bold',
    marginTop: -5,
    marginLeft: -77,
    fontSize: 14,
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },


});