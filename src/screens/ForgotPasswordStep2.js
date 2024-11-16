import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "../middleware/axios";

export default function ForgotPasswordStep2() {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState(false);
  const route = useRoute();
  const email = route.params?.email || ""; // Obtén el email pasado desde ForgotPasswordStep1

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text.replace(/[^0-9]/g, ""); // Asegura que solo se ingresen números
    setCode(newCode);
  };

  // Función para verificar el TOTP
  const verifyTotpCode = async (email, code) => {
    try {
      const response = await axios.post("/pass/verify-totp", null, {
        params: { email, totpCode: code.join("") }, // Unimos el código de 4 dígitos en un string
      });
      return response.data.success;
    } catch (error) {
      console.error("Error al verificar el TOTP:", error);
      return false;
    }
  };

  // Manejar la validación y la navegación al siguiente paso
  const handleValidation = async () => {
    if (code.includes("") || code.some((digit) => isNaN(digit))) {
      setErrors(true);
      Alert.alert("Código Incorrecto", "Por favor, ingrese los cuatro dígitos del código.");
    } else {
      setErrors(false);

      const isValid = await verifyTotpCode(email, code);

      if (isValid) {
        Alert.alert("Código Verificado", "El código es correcto.");
        
        try {
          const response = await axios.get("/users/email", {
            params: { email },
          });
          const user = response.data.username;
          navigation.navigate("ForgotPasswordStep3", { user });
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          Alert.alert("Error", "No se pudo obtener la información del usuario.");
        }
      } else {
        Alert.alert("Código Incorrecto", "El código ingresado no es válido. Inténtalo de nuevo.");
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
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
        <Image source={require("../assets/back-icon.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Campos de Código */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            style={[styles.codeInput, errors && digit === "" && styles.errorBorder]}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      {/* Texto de instrucciones */}
      <Text style={styles.instructionsText}>
        Completa con el código de cuatro dígitos que te enviamos por mail
      </Text>

      {/* Botón de Validar */}
      <TouchableOpacity
        style={styles.validateButton}
        onPress={handleValidation}
      >
        <Text style={styles.validateText}>Validar</Text>
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
    marginBottom: 40, // Ajustamos la separación
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    marginBottom: 30,
    gap: 10,
  },
  codeInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    backgroundColor: "transparent",
    textAlign: "center",
    width: 46,
    height: 46,
    borderImageSlice: 1,
    borderWidth: 2,
    borderImageSource: 'linear-gradient(45deg, #902CA5, #00F0FF)',
  },
  errorBorder: {
    borderColor: "red", // Cambia el color del borde si hay un error
  },
  instructionsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    marginBottom: 30,
  },
  validateButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  validateText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});
