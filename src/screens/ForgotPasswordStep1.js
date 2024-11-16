import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "../middleware/axios"

export default function ForgotPasswordStep1() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`/users/isEmailUsed`, {
        params: { email },
      });
      return response.data; // true si existe, false si no
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await axios.post("/pass/request-reset", null, {
        params: { email },
      });
      Alert.alert(
        "Recuperación de Contraseña",
        "Se ha enviado un código de recuperación a tu correo electrónico."
      );
      navigation.navigate("ForgotPasswordStep2", { email });
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      Alert.alert("Error", "Hubo un problema al enviar el correo de recuperación. Inténtalo de nuevo.");
    }
  };
  

  const handlePasswordReset = async () => {
    let validationErrors = {};

    if (!email) {
      validationErrors.email = "El campo de email es obligatorio.";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Por favor, ingrese un email válido.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const exists = await checkEmailExists(email);
      if (exists) {
        await sendPasswordResetEmail(email);
      } else {
        setErrors({ email: "El correo electrónico no está registrado." });
      }
    }
  };

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require("../assets/back-icon.png")} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-Mail</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Escribe tu correo"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handlePasswordReset}
      >
        <Text style={styles.resetText}>Recuperar Contraseña</Text>
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
    position: 'absolute',
    top: 166,
    left: 112,
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
  inputWrapper: {
    backgroundColor: "transparent",
    borderRadius: 5,
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
  resetButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  resetText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});
