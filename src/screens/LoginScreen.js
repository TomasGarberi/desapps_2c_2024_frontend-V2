import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';
import axios from "../middleware/axios"; // Asegúrate de importar axios
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Validación básica de username
  const isValidusername = (username) => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return usernameRegex.test(username);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    let validationErrors = {};

    if (!username) {
      validationErrors.username = "El campo de username es obligatorio.";
    }

    if (!password) {
      validationErrors.password = "El campo de contraseña es obligatorio.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Detener la ejecución si hay errores
    }

    setErrors({});
    setLoading(true); // Comenzar el estado de carga

    try {
      const response = await axios.post('/auth/authenticate', {
        username: username,
        password: password
      });

      const token = response.data.accessToken; // Suponiendo que el token está en `data.token`
      await AsyncStorage.setItem("authToken", token); // Guardar token

      navigation.navigate('MainTabs');
    } catch (error) {
      console.error(error);
      setErrors({ server: "Error al iniciar sesión, por favor intenta nuevamente." });
    } finally {
      setLoading(false); // Detener el estado de carga
    }
  };

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
        <Image source={require('../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordStep1')}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Usuario</Text>
        <TextInput
          placeholder="username"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.input}
          value={username}
          onChangeText={setusername}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          placeholder="************"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" /> // Muestra un indicador de carga
        ) : (
          <Text style={styles.loginText}>Ingresar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={styles.registerBold}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 168,
    height: 150,
    marginBottom: 20,
  },
  forgotText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_700Bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: 320,
    marginBottom: 20,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
    marginBottom: 5,
  },
  input: {
    background: 'transparent',
    border: '2px solid',
    borderImageSlice: 1,
    borderWidth: 2,
    borderImageSource: 'linear-gradient(45deg, #902CA5, #00F0FF)',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    outline: 'none',
  },
  errorText: {
    color: "red",
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
    marginTop: 5,
  },
  loginButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
  },
  registerBold: {
    fontFamily: "Roboto_700Bold",
  },
});
