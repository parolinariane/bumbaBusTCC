import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import PageMap from '../PageMap';

const { width } = Dimensions.get('window');
const sidebarWidth = width * 0.6;

export default function SideBar() {
  const navigation = useNavigation();
  const [animatedValue] = useState(new Animated.Value(-sidebarWidth));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [-sidebarWidth, 0],
    outputRange: [-sidebarWidth, 0],
  });

  const handleBackToPageMap = () => {
    navigation.navigate('PageMap');
  };

  const handleLogout = () => {
    // Mostrar mensagem de confirmação antes de efetuar o logout
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja sair do BumbaBus?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            // Implemente a lógica de logout aqui
            // Por exemplo, chame uma função que realize o logout
            // logout();
  
            // Reseta a navegação para a tela de login removendo todas as telas anteriores
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUserProfile = () => {
    // Navegue para a tela de perfil do usuário
    console.log('Navegar para a página de Perfil do Usuário');
    navigation.navigate('Profile');
  };


  const handleTicketPrice = () => {
    // Navega para a tela "TicketPrice"
    console.log('Navegar para a página de Preço das Passagens');
    navigation.navigate('TicketPrice');
  };

  const handleAppReview = () => {
    console.log('Navegar para a página de Avaliação do Aplicativo');
    navigation.navigate('RateApp');
  };
  

  const handleBusLines = () => {
    // Adicione a lógica desejada para lidar com as linhas de ônibus
    console.log('Navegar para a página de Linhas de ônibus');
    navigation.navigate('LineBus');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sideBar, { width: sidebarWidth, transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={handleBackToPageMap} style={styles.iconBars}>
          <Icon name="chevron-left" size={30} color="#002684" />
          <Text style={styles.back}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.line}></Text>

        <TouchableOpacity onPress={handleUserProfile} style={styles.menuItem}>
          <Icon name="user" size={25} color="#002684" />
          <Text style={styles.menuItemText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTicketPrice} style={styles.menuItem}>
          <Icon name="money" size={25} color="#002684" />
          <Text style={styles.menuItemText}>Preço das Passagens</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBusLines} style={styles.menuItem}>
            <Icon name="bus" size={25} color="#002684" />
            <Text style={styles.menuItemText}>Linhas de ônibus</Text>
        </TouchableOpacity>

        

        <TouchableOpacity onPress={handleAppReview} style={styles.menuItem}>
          <Icon name="star" size={25} color="#002684" />
          <Text style={styles.menuItemText}>Avalie nosso App</Text>
        </TouchableOpacity>


        {/* Logout no final da página */}
        <Text style={styles.lineOut}></Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Icon name="sign-out" size={25} color="#002684" />
          <Text style={styles.menuItemText}>Sair</Text>
        </TouchableOpacity>
      </Animated.View>
      <PageMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sideBar: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    padding: 20,
    elevation: 5,
    zIndex: 1,
  },
  iconBars: {
    marginLeft: 2,
    marginBottom: 60,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#002684',
  },

  logout:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    
  },

  config:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
  },

  back:{
    marginLeft: 40,
    marginTop: -24,
  },

  line:{
    marginTop: -60,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#999",
  },

  lineOut:{
    marginTop: 450,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#999",
  },
});