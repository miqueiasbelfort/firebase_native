import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './components/firebaseConfig';

import List from './components/List';

export default function App() {

  const [name,setName] = useState('')
  const [cargo,setCargo] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  async function cadastrar(){
    if(nome !== '' & cargo !== ''){
      let usuarios = await firebase.database().ref('users')
      const chave = usuarios.push().key

      usuarios.child(chave).set({
        nome: name,
        cargo
      })

      alert('Cadastrado com sucesso!')
      setName('')
      setCargo('')
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

 useEffect(() => {
  async function data(){
    await firebase.database().ref('users').on('value', (snapshot) => {
      setUsers([])
      snapshot.forEach(childItem => {
        const dataObj = {
          key: childItem.key,
          nome: childItem.val().nome,
          cargo: childItem.val().cargo
        }
        setUsers(oldArray => [...oldArray, dataObj].reverse())  
      })
      setLoading(false)
    })
  }
  data()
 }, [])

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

      {
        loading ? (
          <ActivityIndicator
            color='#121212'
            size={40}
          />
        ) : (
          <FlatList
          keyExtractor={item => item.key}
         data={users}
          renderItem={ ({item}) =>(<List data={item}/>) }
          />
        )
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 35,
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
