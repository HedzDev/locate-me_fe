import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PlacesScreen() {
  const placesData = [
    { name: 'Paris', latitude: 48.859, longitude: 2.347 },
    { name: 'Lyon', latitude: 45.758, longitude: 4.835 },
    { name: 'Marseille', latitude: 43.282, longitude: 5.405 },
  ];

  const places = placesData.map((place, id) => {
    return (
      <View key={id} style={styles.placeCard}>
        <View>
          <Text style={styles.name}>{place.name}</Text>
          <Text>
            LAT : {place.latitude} LON : {place.longitude}
          </Text>
        </View>
        <FontAwesome name="trash-o" style={styles.icon} />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>John Doe's Places</Text>

      <View style={styles.inputBlock}>
        <TextInput placeholder="New city" style={styles.input} />
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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
  },
});
