import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WelcomeHome() {
  return (
    <View style={styles.container}>
      {/*       <LottieView
        source={require('../../assets/animations/welcome_animation.json')}
        autoPlay
        loop
        style={styles.animation}
      /> */}
      <Image
        source={require('../../assets/animations/welcome_animation.gif')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Bienvenido a Lattice</Text>
      <Text style={styles.instructions}>
        Comienza a seguir personas o haz tu primera publicación para ver contenido aquí.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingTop: 180, // Agrega un padding top adicional para mover el contenido hacia abajo
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
