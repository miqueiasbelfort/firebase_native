import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import firebase from './components/firebaseConfig';

export default function App() {

  const [name,setName] = useState('')
  const [cargo,setCargo] = useState('')

  async function cadastrar(){
    if(nome !== '' & cargo !== ''){
      const usuarios = await firebase.database().ref('Usuários')
      const chave = usuarios.push().key

      usuarios.child(chave).set({
        nome: name,
        cargo
      })

      alert('Cadastrado com sucesso!')
    }
  }

  /*
  useEffect(() => {

    async function getData(){
      
      await firebase.database().ref('tipo').set('Vendedor')
      await firebase.database().ref('tipo').remove()
      await firebase.database().ref('Usuários').child(3).set({
        nome: 'Miqueias',
        cargo: 'Programador Junior'
      })
      await firebase.database().ref('Usuários').child(3).update({
        nome: 'Miqueias Belfort'
      })
      
    }
    getData()

  }, [])
  */

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
      />
      <Text style={{fontSize: 20}}>Cargo</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCargo(text)}
      />
      
      <Button 
        title='Novo Funcionario'
        onPress={cadastrar}
      />
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
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    width: 200,
    fontSize: 10,
    borderRadius: 5,
  }
});
