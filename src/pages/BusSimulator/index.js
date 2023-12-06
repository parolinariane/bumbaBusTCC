import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BusSimulator = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [linha, setLinha] = useState();
  const totalSeats = 8;
  const [seats, setSeats] = useState(Array(totalSeats).fill(false));

  useEffect(() => {
    const { params } = route;
    if (params && params.line) {
      console.log('Número da linha:', params.line);
      setLinha(params.line);
    }
  }, [route]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeats((prevSeats) => {
        const newSeats = [...prevSeats];
        const randomIndex = Math.floor(Math.random() * totalSeats);
        newSeats[randomIndex] = !newSeats[randomIndex];
        return newSeats;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const countOccupiedSeats = () => seats.filter((isOccupied) => isOccupied).length;
  const countEmptySeats = () => totalSeats - countOccupiedSeats();

  const handleLotouPress = () => {
    const occupiedSeatsCount = countOccupiedSeats();
    if (occupiedSeatsCount === totalSeats) {
      Alert.alert('Ônibus Lotado', 'Não há mais assentos disponíveis.');
    } else {
      Alert.alert('Ônibus Não Lotado', 'Ainda há assentos disponíveis.');
    }
  };

  const handleTitlePress = () => {
    navigation.navigate('PageMap');
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
    
        <Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={styles.imgLogo}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={handleTitlePress}>
          <Text style={styles.title}>  Linha {linha}  </Text>
        </TouchableOpacity>
      <Text style={styles.titleAssentos}>  Assentos  </Text>
      <Text style={styles.assentosOc}>   <Icon name="circle" color="#ee600b"/> Ocupados: {countOccupiedSeats()}   </Text>
      <Text style={styles.assentosV}>     <Icon name="circle" color="#002684"/> Vazios: {countEmptySeats()}       </Text>

      <TouchableOpacity style={styles.lotouButton} onPress={handleLotouPress}>
        <Text style={styles.lotouButtonText}>Lotou</Text>
      </TouchableOpacity>

      <ImageBackground
        source={require('../../assets/bus.png')}
        style={styles.busImage}
        resizeMode="contain"
      >
        <View style={styles.seatContainer}>
          {/* Assentos */}
          {seats.map((isOccupied, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSeat(index)}
              style={[styles.seat]}
            >
              <Image
                source={require('../../assets/seatBus.png')}
                style={[
                  styles.innerSeat,
                  { tintColor: isOccupied ? '#ee600b' : '#00277b' },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  lotouButton: {
    marginTop: 400,
    marginLeft: -300,
    padding: 10,
    backgroundColor: '#ee600b',
    borderRadius: 5,
    alignItems: 'center',
  },

  lotouButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ee600b',
    backgroundColor: '#eaf2ff',
    borderRadius: 7,
    fontWeight: '900',
  },


  titleAssentos: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ee600b',
    backgroundColor: '#eaf2ff',
    borderRadius: 7,
    fontWeight: '900',
    marginTop: 100,
    marginLeft: -230,
  },

  busImage: {
    width: 500,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 175,
    marginTop: -650,
  },

  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 450,
  },

  seat: {
    width: 180,
    aspectRatio: 1.4,
    margin: '0.1%',
    marginTop: -50,
    marginEnd: -40,
    marginLeft: 35,
    marginRight: -48,
  },
  
  innerSeat: {
    flex: 1,
  },

  containerHeader: {
    marginTop: -45,
    marginBottom: '8%',
    paddingStart: '5%',
    backgroundColor: '#eaf2ff',

  },

  assentosOc:{
    backgroundColor: '#eaf2ff',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginTop: 20,
    marginLeft: -240,
  }, 
  
  assentosV:{
    backgroundColor: '#eaf2ff',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    marginLeft: -240,
    
  },

  imgLogo:{
    width: 390,
    height: 80,
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  leftSeat: {
    marginLeft: 28, 
  
  },

  rightSeat: {
    marginLeft: 28, // Ajuste este valor conforme necessário
  },



});

export default BusSimulator;

