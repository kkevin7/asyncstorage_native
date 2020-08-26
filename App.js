import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  const [nombre, setNombre] = useState('');
  const [nombreStorage, setNombreStorage] = useState('');

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', nombre);
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.contenedor}>
      <Text>Hola: {nombreStorage}</Text>
        <TextInput 
        placeholder="Escribe tu nombre" 
        style={styles.input} 
        onChangeText={text => setNombre(text)}
        />
        <Button 
        title="Guardar" 
        color="#333"
        onPress={() => guardarDatos()}
         />
        <TouchableHighlight style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
