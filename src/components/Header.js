import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/logo-header.png')} style={styles.logo} />
      <View style={styles.separatorLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: 391, // Ajustado al tamaño de layout que proporcionaste
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 99999,
  },
  logo: {
    width: 128,
    height: 61,
    resizeMode: 'contain',
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    opacity: 0.1,
    position: 'absolute',
    bottom: 0,
  },
});
