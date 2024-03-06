import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone que deseja usar

const SavedPasswordsScreen = ({ route }) => {
  const { senhaSalva } = route.params; // Obtém a senha salva dos parâmetros de rota
  const [isPasswordVisible, setPasswordVisibility] = useState(false); // Define o estado para controlar a visibilidade da senha

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* Contêiner para exibir a senha */}
      <View style={[styles.SenhaContainer, isPasswordVisible && styles.visibleContainer]}>
        {/* Texto da senha: exibe a senha se for visível ou uma série de pontos se não for */}
        <Text style={styles.text}>{isPasswordVisible ? senhaSalva : '•'.repeat(senhaSalva.length)}</Text>
        {/* Botão para alternar a visibilidade da senha */}
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
          {/* Ícone de olho para mostrar ou ocultar a senha */}
          <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Arial', 
    color: '#FFFFFF',
  },
  SenhaContainer:{
    flexDirection: 'row',
    backgroundColor: '#274135',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // Adiciona uma borda transparente
    height: 50,
    marginHorizontal: 14,
    marginTop: 8,
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
  },
  visibleContainer: {
    backgroundColor: '#A2D9A1', // Cor do contêiner quando a senha está visível
  },
  eyeButton: {
    marginLeft: 'auto',
    marginRight: 10, // Ajuste conforme necessário para o espaçamento do botão à direita
  },
});

export default SavedPasswordsScreen;
