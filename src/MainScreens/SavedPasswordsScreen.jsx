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
      const connection = await getConnection();//obtem conexão com o bd
      const senhaRepository = connection.getRepository(GeraSenha); //obtém o repositório das senhas usando getRepositoty(GeraSenha)
      const senhasSalvas = await senhaRepository.find(); //busca as senhas usando senhaRepository.find()
      //e adiciona a senha ao estado, enquanto adiciona uma propriedade isVisible a cada senha para controlar a visibilidade.
      // Adiciona uma propriedade 'isVisible' a cada senha
      setSenhas(senhasSalvas.map(senha => ({ ...senha, isVisible: false })));
    } catch (error) {
      console.error('Erro ao buscar senhas do banco de dados:', error);
    }
  };

  // Buscar as senhas salvas quando a tela for montada ou atualizada
  useEffect(() => {
    buscarSenhasSalvas();
  }, []);

// Função para alternar a visibilidade da senha, chamada quando o usuário pressiona o botão de olho 
const togglePasswordVisibility = index => {
  setSenhas(prevSenhas => {
    // Cria uma nova lista de senhas com a visibilidade alternada para a senha específica
    //mapeia sobre o estado anterior das senhas e alterna a visibilidade para a senha específica
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
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true} // Define esta propriedade como true para mostrar apenas a barra de rolagem
      >
        {/* Renderizar cada senha como um quadrado, para isso mapeia o estado da senha*/}
        {senhas.map((senha, index) => (
          //rendereiza cada senha como um quadrado
          <View key={index} style={[styles.passwordContainer, senha.isVisible && styles.visibleContainer]}>
            <Text style={[styles.text, senha.isVisible && styles.whiteText]}>
              {senha.isVisible ? senha.password : '•'.repeat(senha.password.length)}
            </Text>
            {/* Botão para alternar a visibilidade da senha */}
            <TouchableOpacity onPress={() => togglePasswordVisibility(index)} style={styles.eyeButton}>
              <Ionicons name={senha.isVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {/* Botão para excluir a senha */}
            <TouchableOpacity onPress={() => excluirSenha(index)} style={styles.deleteButton}>
              {/* Ícone de olho para mostrar ou ocultar a senha */}
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
    marginLeft: 10,
    marginRight: 10,
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Definindo o fundo da ScrollView como transparente
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
