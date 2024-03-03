// SavedPasswordsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedPasswordsScreen = ({ route }) => {
  const { senhaSalva } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Senha salva: {senhaSalva}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
  },
});

export default SavedPasswordsScreen;
