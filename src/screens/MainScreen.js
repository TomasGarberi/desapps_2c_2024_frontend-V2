import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function MainScreen({ navigation }) {
  // Configuración de la autenticación de Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'TU_EXPO_CLIENT_ID',
    iosClientId: 'TU_IOS_CLIENT_ID',
    androidClientId: 'TU_ANDROID_CLIENT_ID',
    webClientId: 'TU_WEB_CLIENT_ID',
  });

  // Efecto para manejar la respuesta de autenticación
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Manejar el token de autenticación aquí, por ejemplo, enviándolo al backend o guardándolo localmente
      console.log(authentication);
    }
  }, [response]);

  return (
    <LinearGradient
      colors={['#FF6F61', '#3B3F58']}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        {/* Botón Ingresar */}
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        {/* Botón Continuar con Google */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Image source={require('../assets/google-logo.png')} style={styles.googleLogo} />
          <Text style={styles.buttonText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Texto clickeable */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            ¿No tenes Cuenta? <Text style={styles.boldText}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 212,
    height: 215,
    marginBottom: 50,
    resizeMode: 'contain',
  },
  loginButton: {
    width: 319,
    height: 46,
    backgroundColor: '#292634',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 319,
    height: 46,
    backgroundColor: '#FF4057',
    borderRadius: 5,
    marginBottom: 40,
  },
  googleLogo: {
    width: 19.47,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  registerText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  boldText: {
    fontFamily: 'Roboto_700Bold', 
  },
});
