import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';
import axios from "../middleware/axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para almacenar el token

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para mensajes de error
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar requisitos de contraseña
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  // Manejar los cambios en los campos
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Limpiar mensaje de error cuando el usuario cambia el texto
  };

  const handleRegister = async () => {
    let validationErrors = {};

    if (!formData.name) validationErrors.name = "El campo de nombre es obligatorio.";
    if (!formData.lastname) validationErrors.lastname = "El campo de apellido es obligatorio.";
    if (!formData.username) validationErrors.username = "El campo de usuario es obligatorio.";
    if (!formData.email) {
      validationErrors.email = "El campo de email es obligatorio.";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Por favor, ingrese un email válido.";
    }

    if (!formData.password) {
      validationErrors.password = "El campo de contraseña es obligatorio.";
    } else if (!isValidPassword(formData.password)) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!isTermsAccepted) {
      Alert.alert("Términos y Condiciones", "Debe aceptar los términos y condiciones para registrarse.");
      return;
    }

    setErrors({});
    try {
      const response = await axios.post("/auth/register", {
        name: formData.name,
        lastname: formData.lastname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.status === 200) {
        setIsModalVisible(true); // Mostrar mensaje de éxito
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("El usuario o el correo electrónico ya están registrados.");
      } else {
        setErrorMessage("Hubo un problema al registrar. Inténtelo de nuevo.");
      }
    }
  };

  const handleContinue = () => {
    setIsModalVisible(false);
    navigation.navigate("Login");
  };

  const translateFieldNames = {
    "Name": "Nombre", "Lastname": "Apellido", "Username": "Usuario", "Email": "Email", "Password": "Contraseña"
  }

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {["Name", "Lastname", "Username", "Email", "Password"].map((label, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{translateFieldNames[label]}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={
                label === "Email" ? "username@mail.com" :
                  label === "Password" ? "************" :
                    `Escriba su ${translateFieldNames[label]}`
              }
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.input}
              secureTextEntry={label === "Password"}
              value={formData[label.toLowerCase()] || ""}
              onChangeText={(text) => handleInputChange(label.toLowerCase(), text)}
            />
          </View>
          {errors[label.toLowerCase()] && <Text style={styles.errorText}>{errors[label.toLowerCase()]}</Text>}
        </View>
      ))}

      {/* Mostrar mensaje de error si existe */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.termsContainer}>
        <Switch
          value={isTermsAccepted}
          onValueChange={setIsTermsAccepted}
          trackColor={{ false: "#FFFFFF", true: "#FF4057" }}
          thumbColor="#FFFFFF"
          style={styles.termsSwitch}
        />
        <Text style={styles.termsText}>
          Acepto los{" "}
          <Text style={styles.termsBold} onPress={() => navigation.navigate('TermsScreen')}>
            Términos y Condiciones
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tu usuario ha sido creado satisfactoriamente.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleContinue}>
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  inputContainer: {
    marginBottom: 20,
    width: "80%",
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
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
    fontSize: 12,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  termsSwitch: {
    marginRight: 10,
  },
  termsText: {
    color: "#FFFFFF",
  },
  termsBold: {
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#FF4057",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FF4057",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
});
