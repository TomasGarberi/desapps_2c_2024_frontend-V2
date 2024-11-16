import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import * as ExpoSplashScreen from "expo-splash-screen"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../middleware/axios";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    ExpoSplashScreen.preventAutoHideAsync(); 

    setTimeout(async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {

        // try {
        //   const response = await axios.post("/auth/refreshToken");
        // } catch (error) {

        // }
        
        navigation.replace("MainTabs");
      } else {
        navigation.replace("Main");
      }

      ExpoSplashScreen.hideAsync();
    }, 1000)

  }, []);

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 212,
    height: 215,
  },
});

