import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function LineBus() {
  const navigation = useNavigation();

  // Função para lidar com o pressionar do botão
  const handleBusLinePress = (lineNumber) => {

    if (lineNumber === '212') {
      navigation.navigate('Line212');

    } else if (lineNumber === '213') {
        navigation.navigate('Line213');

    } else if (lineNumber === '210') {
        navigation.navigate('Line210');
      
    } else if (lineNumber === '134') {
        navigation.navigate('Line134');
      
    }


  };

  const handleBackToSideBar = () => {
    navigation.navigate('SideBar');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.containerHeader}>
      <TouchableOpacity onPress={handleBackToSideBar} style={styles.sideBar}>
          <Icon name="arrow-left" size={25} color="#002684" />
        </TouchableOpacity>
      <Image
        animation="flipInY"
        source={require('../../assets/logo.png')}
        style={styles.imgLogo}
        resizeMode="contain"
      />
    </View>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('212')}
      >
        <Text style={styles.buttonText}>Linha 212                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Itajai / Av. Dr Moraes Salles</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('213')}
      >
        <Text style={styles.buttonText}>Linha 213                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Itajai / Rodoviária</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('210')}
      >
        <Text style={styles.buttonText}>Linha 210                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Campo Grande / Barão Geraldo</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('134')}
      >
        <Text style={styles.buttonText}>Linha 134                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Ouro Verde / Terminal Barão Geraldo</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('213')}
      >
        <Text style={styles.buttonText}>Linha 357                                                            </Text>
        <Text style={styles.buttonSubText}>Rodoviária / PUCC - Campus I</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('213')}
      >
        <Text style={styles.buttonText}>Linha 220                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Campo Grande / Av. Br de Itapura</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('213')}
      >
        <Text style={styles.buttonText}>Linha 116                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Ouro Verde / Terminal Shop. Dom Pedro</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => handleBusLinePress('213')}
      >
        <Text style={styles.buttonText}>Linha 211                                                            </Text>
        <Text style={styles.buttonSubText}>Terminal Campo Grande / Shopping Iguatemi</Text>
        <Icon name="chevron-right" size={25} color="#002684" style={styles.icon} />
      </TouchableOpacity>


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
  button: {
    backgroundColor: '#eaf2ff',
    padding: 15,
    margin: 2,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  containerHeader: {
    marginTop: -10,
    marginBottom: '5%',
    paddingStart: '5%',

  },

  imgLogo:{
    width: 390,
    height: 90,
    marginTop: 30,
  },

  icon:{
    marginLeft: 350,
    marginTop: -30

  },

  buttonSubText:{
    fontWeight: 'bold',
    color: '#737373',
  },

});
