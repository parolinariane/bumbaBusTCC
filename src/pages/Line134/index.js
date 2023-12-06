import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function Line134() {
  const navigation = useNavigation();
  const mapEl = useRef(null);

  const [origin, setOrigin] = useState({
    latitude: -22.9654139,
    longitude: -47.1354069,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });
  const [destination, setDestination] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [distance, setDistance] = useState(null);

  const [waypoints, setWaypoints] = useState([
    { latitude: -22.9614743, longitude: -47.1915719 },
    { latitude: -22.9630917, longitude:-47.1948394 },
    { latitude: -22.9590143, longitude: -47.1951025 },
    { latitude: -22.9532026, longitude: -47.1950709 },
    { latitude: -22.9509925, longitude: -47.190074 },
    { latitude: -22.9456076, longitude: -47.1886158 },
    { latitude: -22.9444079, longitude: -47.1892341 },
    { latitude: -22.9366192, longitude: -47.1640357 },
  ]);

  useEffect(() => {
    // Define o destino quando o componente é montado
    setDestination({
      latitude: -22.8304412,
      longitude: -47.0821609,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
  }, []);

  useEffect(() => {
    // Se ambos a origem e o destino estão definidos, então ajusta o mapa
    if (origin && destination) {
      mapEl.current.fitToCoordinates([origin, destination], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
      
          <Image
            animation="flipInY"
            source={require('../../assets/logo.png')}
            style={styles.imgLogo}
            resizeMode="contain"
          />
          <Text style={styles.titleImg}>
            
            Sua experiência personalizada no transporte público
          </Text>
        </View>

      
        <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        ref={mapEl}
      >
        <Marker
          coordinate={{
            latitude: -22.9654139,
            longitude: -47.1354069,
          }}
          pinColor="#002684"
          title="Terminal Ouro Verde"
          description="Rua Armando Frederico Renganeschi - Jardim Cristina, Campinas - SP"
        />

        {destination &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            apikey={config.googleApi}
            strokeWidth={3}
            strokeColor="#fa6001"
            onReady={result => {
              setDistance(result.distance);
              mapEl.current.fitToCoordinates(
                result.coordinates, {
                  edgePadding: {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50 
                  }
                }
              )
            }}
          />
        }


        {destination &&
          <Marker
            coordinate={destination}
            title="Terminal Barão Geraldo"
            description="Lázaro de Campos Faria"
            pinColor="#002684"
          />
        }
      </MapView>

      <View style={styles.search}>

        <Text style={styles.lineRoutes}>      Rota Linha 134</Text>
      <Icon name="map-marker" size={25} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Terminal Ouro Verde"
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Terminal Barão Geraldo"
          editable={false}
        />
          
      </View>
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

  input: {
    fontSize: 16,
    height: 40,
    marginBottom: 20,
    backgroundColor: '#eaf2ff',
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  lineRoutes:{
    backgroundColor: '#eaf2ff',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 19,
    color: '#fa6001',
    borderRadius: 8,
  },

  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },

  map: {
    flex: 2,
    width: '100%',
  },

  search: {
    flex: 0.7,

  },

  containerHeader: {
    marginTop: 10,
    marginBottom: '5%',
    paddingStart: '5%',

  },
  
  sideBar:{
    marginTop: 110
  },

  icon:{
    marginLeft: -10,

  },

  imgLogo:{
    width: 390,
    height: 90,
  },

  titleImg:{
    marginTop: 2,
    color: '#666664',
    textAlign: 'center',
    fontSize: 12, 
    fontWeight: 'bold', 
  },

 welcomeText: {
    fontSize: 16,
    marginBottom: 10,
 },

 destination:{
  backgroundColor: '#eaf2ff',
 },
 
 busLineText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
 },

 addressText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
 },

 availableLinesText: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: '#eaf2ff',
    borderRadius: 6,
    fontWeight: '900',
    color: '#0a0909',
 },

 listItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
 },
 lineText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
 },
 
 seatsText: {
    fontSize: 14,
    color: 'gray',
 },

 timeText:{
  fontSize: 14,
  color: 'gray',
 },

 iconContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

busIcon: {
  marginRight: 5,
},

backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
  },


});