import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import firebase from './components/firebaseConfig';

export default function App() {

  const [name,setName] = useState('Carregando...')

  useEffect(() => {

    async function getData(){
      await firebase.database().ref('Usuários/2').on('value', (snapshot) => {
        setName(snapshot.val().nome)
      })
    }
    getData()

  }, [])

  return (
    <View style={styles.container}>
      <Text>Olá {name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
