import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function PageMap() {


  const navigation = useNavigation();
  const mapEl = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [error, setError] = useState(null);

  const [lines, setLines] = useState([
    {id: '1', line: '230', time: ' - agora ', seats: '14 lugares disponíveis'},
    {id: '2', line: '121', time: ' - daqui a 1 min', seats: '2 lugares disponíveis'},
    {id: '3', line: '213', time: ' - daqui a 3 min', seats: '8 lugares disponíveis'},
    {id: '4', line: '357', time: ' - daqui a 5 min', seats: '4 lugares disponíveis'},
    {id: '5', line: '212', time: ' - daqui a 10 min', seats: '1 lugar disponível'},
 ]);


 const renderItem = ({item}) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() => navigation.navigate('BusSimulator', { line: item.line })}
  >
    <View style={styles.iconContainer}>
      <Icon name="bus" size={20} color="#002684" style={styles.busIcon} />
      <Text style={styles.lineText}>{item.line}</Text>
    </View>
    <Text style={styles.timeText}>{item.time}</Text>
    <Text style={styles.seatsText}>{item.seats}</Text>
  </TouchableOpacity>
);

 
  useEffect(() => {
    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização não concedida');
        setError('Permissão de localização não concedida');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address.length > 0) {
          const formattedAddress = `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].postalCode}`;
          setCurrentAddress(formattedAddress);
        } else {
          console.error('Nenhum endereço encontrado');
          setError('Nenhum endereço encontrado');
        }
      } catch (e) {
        console.error('Erro ao obter endereço:', e);
        setError('Erro ao obter endereço');
      }
    })();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>

      <TouchableOpacity onPress={() => navigation.navigate('SideBar')} style={styles.sideBar}>
        <Icon name="bars" size={25} color="#002684" style={styles.iconBars} />
      </TouchableOpacity>
      
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

        {destination &&
          <MapViewDirections
            origin={origin}
            destination={destination}
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
            }
            }
          />
        }

        {destination &&
          <Marker
            coordinate={destination}
            title="Destino do Usuário"
            pinColor="#002684" // Defina a cor do marcador como azul escuro
          />
        }

      </MapView>
      

      <View style={styles.search}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Icon name="map-marker" size={25} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Endereço Atual"
          value={currentAddress || 'Carregando...'}
          editable={false}
        />
          <GooglePlacesAutocomplete
            placeholder="Informe o destino"
            onPress={(data, details = null) => {
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
              });
              console.log(destination);
            }}

            query={{
              key: config.googleApi,
              language: 'pt-br',
            }}

            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{ listView: { height: 100 } }}
            style={styles.destination}
          />

 
    
        {distance && (
          <>
          <Text style={styles.availableLinesText}>                  LINHAS DISPONÍVEIS AGORA                     </Text>
          <FlatList 
            data={lines}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onPress={() => navigation.navigate('BusSimulator')}
          />

        
         
          </>
        )}
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
    flex: 2,

  },

  containerHeader: {
    marginTop: '3%',
    marginBottom: '8%',
    paddingStart: '5%',

  },

  icon:{
    marginLeft: -20,

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

});