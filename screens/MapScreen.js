import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function MapScreen() {
  return <Image source={require('../assets/map.jpg')} style={styles.image} />;
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
