import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

import firebase from './components/firebaseConfig';

import List from './components/List';

export default function App() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  const cadastrar = async () => {
    /*if(nome !== '' & cargo !== ''){
      let usuarios = await firebase.database().ref('usuarios')
      const chave = usuarios.push().key

      usuarios.child(chave).set({
        nome: name,
        cargo: cargo
      })

      alert('Cadastrado com sucesso!')
      setName('')
      setCargo('')
    }8?
    */

   await firebase.auth().createUserWithEmailAndPassword(email,password)
     .then((value) => {
      alert('Usuário criado: ' + value.user.email)
      setEmail('')
      setPassword('')
     }).catch((error) => {
      if(error.code === 'auth/week-password'){
        alert('A sua senha deve conter no mínino seis caracters')
        return
      } else if(error.code === 'auth/invalid-email'){
        alert('E-mal invalido')
        return
      } else {
        alert('Opps! Algo deu errado!')
        return
      }
     })
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

 useEffect(() => {
  const data = async () => {
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
 */

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>E-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text style={{fontSize: 20}}>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      
      <Button 
        title='Cadastrar'
        onPress={cadastrar}
      />

      {/*
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
        */}

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
    width: 300,
    fontSize: 10,
    borderRadius: 5,
  }
})
