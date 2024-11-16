import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "../middleware/axios"

export default function ForgotPasswordStep3() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [errors, setErrors] = useState({});
  const route = useRoute();
  const username = route.params?.user || ""; // Obtén el username pasado desde ForgotPasswordStep2

  // Validación de requisitos de la contraseña
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  // Manejar la validación y el guardado de la contraseña
  const handleSavePassword = async () => {
    let validationErrors = {};

    if (!password) {
      validationErrors.password = "El campo de contraseña es obligatorio.";
    } else if (!isValidPassword(password)) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "El campo de confirmación de contraseña es obligatorio.";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});
        // Realizar la solicitud PUT para cambiar la contraseña
        const response = await axios.put("/pass/change-password", {
          username: username, // Asegúrate de pasar 'username' correctamente
          password: password,
        });

        if (response.data) {
          setModalVisible(true);
        } else {
          Alert.alert("Error", "No se pudo restablecer la contraseña.");
        }
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "Hubo un problema al intentar cambiar la contraseña.");
      }
    }
  };

  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate("Login");
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

      {/* Campo de Contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          placeholder="************"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry
          style={styles.input}
          value={password}
          onFocus={() => setShowPasswordRequirements(true)}
          onBlur={() => setShowPasswordRequirements(false)}
          onChangeText={setPassword}
        />
        {showPasswordRequirements && (
          <Text style={styles.passwordRequirements}>
            La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
          </Text>
        )}
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      {/* Campo de Repetir Contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Repetir Contraseña</Text>
        <TextInput
          placeholder="************"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      {/* Botón de Guardar Contraseña */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
        <Text style={styles.saveButtonText}>Guardar Contraseña</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Tu contraseña se restableció correctamente.</Text>
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
    marginBottom: 40,
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
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(144, 44, 165, 1)',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
  },
  errorText: {
    color: "red",
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
    marginTop: 5,
  },
  passwordRequirements: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
    marginTop: 5,
  },
  saveButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    width: 100,
    height: 40,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
});
