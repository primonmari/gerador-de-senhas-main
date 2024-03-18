import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getConnection } from 'typeorm';
import GeraSenha from '../database/entities/GeraSenha';

const SavedPasswordsScreen = () => {
  const [senhas, setSenhas] = useState([]); // Estado para armazenar as senhas salvas

  // Função para buscar as senhas do banco de dados SQLite
  const buscarSenhasSalvas = async () => {
    try {
      const connection = await getConnection();
      const senhaRepository = connection.getRepository(GeraSenha);
      const senhasSalvas = await senhaRepository.find();
      setSenhas(senhasSalvas.map(senha => ({ ...senha, isVisible: false })));
    } catch (error) {
      console.error('Erro ao buscar senhas do banco de dados:', error);
    }
  };

  // Buscar as senhas salvas quando a tela for montada ou atualizada
  useEffect(() => {
    buscarSenhasSalvas();
  }, []);

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = index => {
    setSenhas(prevSenhas => {
      return prevSenhas.map((senha, i) => {
        if (i === index) {
          return { ...senha, isVisible: !senha.isVisible };
        }
        return senha;
      });
    });
  };

  // Função para excluir uma senha do banco de dados
  const excluirSenha = async index => {
    try {
      const connection = await getConnection();
      const senhaRepository = connection.getRepository(GeraSenha);
      const senhaExcluida = senhas[index];
      await senhaRepository.delete(senhaExcluida.id); // Delete a senha com base no ID
      // Atualize o estado das senhas para refletir a exclusão
      setSenhas(prevSenhas => prevSenhas.filter((_, i) => i !== index));
      console.log('Senha excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a senha:', error);
    }
  };

  return (  
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {senhas.map((senha, index) => (
          <View key={index} style={[styles.passwordContainer, senha.isVisible && styles.visibleContainer]}>
            <Text style={[styles.text, senha.isVisible && styles.whiteText]}>
              {senha.isVisible ? senha.password : '•'.repeat(senha.password.length)}
            </Text>
            <TouchableOpacity onPress={() => togglePasswordVisibility(index)} style={styles.eyeButton}>
              <Ionicons name={senha.isVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {/* Botão para excluir a senha */}
            <TouchableOpacity onPress={() => excluirSenha(index)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    marginRight: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#274135',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    height: 50,
    width: '100%',
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Arial', 
    color: '#FFFFFF',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  eyeButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  visibleContainer: {
    backgroundColor: '#A2D9A1',
  },
});

export default SavedPasswordsScreen;
