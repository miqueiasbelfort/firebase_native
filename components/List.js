import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function List({data}) {
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>{data.nome}</Text>
      <Text style={{color: '#fff'}}>{data.cargo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        padding: 10,
        backgroundColor: '#121212',
        width: 300,
    }
})