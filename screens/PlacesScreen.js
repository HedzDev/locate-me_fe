import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlace, removePlace } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PlacesScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [newCity, setNewCity] = useState('');

  const handlePress = () => {
    if (newCity.length === 0) {
      return;
    }

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${newCity}`)
      .then((res) => res.json())
      .then((data) => {
        const firstCity = data.features[0];
        const newPlace = {
          name: firstCity.properties.name,
          latitude: firstCity.geometry.coordinates[1],
          longitude: firstCity.geometry.coordinates[0],
        };
        dispatch(addPlace(newPlace));
        setNewCity('');
      });
  };

  const places = user.places.map((place, id) => {
    return (
      <View key={id} style={styles.placeCard}>
        <View>
          <Text style={styles.name}>{place.name}</Text>
          <Text>
            LAT : {place.latitude} LON : {place.longitude}
          </Text>
        </View>
        <FontAwesome
          name="trash-o"
          style={styles.icon}
          onPress={() => dispatch(removePlace(place.name))}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{user.nickname}'s Places</Text>

      <View style={styles.inputBlock}>
        <TextInput
          placeholder="New city"
          style={styles.input}
          onChangeText={(value) => setNewCity(value)}
          value={newCity}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handlePress()}
        >
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {places}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'Pacifico_400Regular',
  },
  name: {
    fontSize: 18,
  },
  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
  },
  input: {
    width: '65%',
    borderBottomWidth: 1,
    borderBottomColor: '#B733D0',
    fontSize: 17,
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#B733D0',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 7,
  },
  textButton: {
    color: '#fff',
  },
  scrollView: {
    alignItems: 'center',
    marginTop: 20,
    maxWidth: '100%',
  },
  placeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  icon: {
    color: '#B733D0',
    fontSize: 23,
    cursor: 'pointer',
  },
});
