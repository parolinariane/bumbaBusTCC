import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = () => {
  const user = {
    name: 'Usuário Exemplo',
    email: 'usuario@example.com',
    profileImage: require('../../assets/simbLogo.png'),
  };

  return (
    <View style={styles.container}>
      <Image source={user.profileImage} style={styles.profileImage} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Adiciona um fundo branco ao container
    borderRadius: 10, // Adiciona bordas arredondadas ao container
    shadowColor: '#000', // Adiciona sombra ao container
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Torna a imagem do perfil circular
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Cor mais escura para o nome
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
});

export default Profile;
