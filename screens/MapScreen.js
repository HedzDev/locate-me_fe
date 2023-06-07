import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { addPlace } from '../reducers/user';

export default function MapScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPlace, setNewPlace] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  const handleLongPress = (e) => {
    setTempCoordinates(e.nativeEvent.coordinate);
    setIsModalVisible(true);
  };

  const handleNewPlace = () => {
    dispatch(
      addPlace({
        name: newPlace,
        latitude: tempCoordinates.latitude,
        longitude: tempCoordinates.longitude,
      })
    );
    setIsModalVisible(false);
    setNewPlace('');
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setNewPlace('');
  };

  const markers = user.places.map((data, id) => {
    return (
      <Marker
        key={id}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        title={data.name}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="New place"
              onChangeText={(value) => setNewPlace(value)}
              value={newPlace}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => handleNewPlace()}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleClose()}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MapView
        style={styles.map}
        mapType="hybrid"
        onLongPress={(e) => handleLongPress(e)}
      >
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="My position"
            pinColor="#fecb2d"
          />
        )}
        {markers}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: '#B733D0',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#B733D0',
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});
