import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => {
        const breedList = Object.keys(data.message);
        setBreeds(breedList);
      })
      .catch((error) => console.error('Error fetching breeds:', error));
  }, []);

  const handleBreedSelect = (index, value) => {
    setSelectedBreed(value);
    fetch(`https://dog.ceo/api/breed/${value}/images/random`)
      .then((response) => response.json())
      .then((data) => {
        setDogImage(data.message);
      })
      .catch((error) => console.error('Error fetching dog image:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar perros por raza:  </Text>

      <ModalDropdown
        options={breeds}
        defaultValue="Selecciona una raza"
        onSelect={handleBreedSelect}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
      />

      {selectedBreed !== '' && (
        <View>
          <Text style={styles.selectedBreed}>     Raza seleccionada: {selectedBreed}</Text>
          <Image source={{ uri: dogImage }} style={styles.dogImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3E50', // Color de fondo oscuro
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#ECF0F1', // Color de texto claro
    marginBottom: 10,
  },
  dropdown: {
    width: 200,
    marginTop: 15,
    borderColor: '#3498DB', // Color del borde
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#1F2D3D', // Color del fondo oscuro
  },
  dropdownText: {
    fontSize: 16,
    color: '#ECF0F1', // Color del texto claro
  },
  selectedBreed: {
    fontSize: 16,
    color: '#ECF0F1', // Color del texto claro
    marginBottom: 10,
  },
  dogImage: {
    width: 300,
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default App;
