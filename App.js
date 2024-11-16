import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screens/SplashScreen';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordStep1 from './src/screens/ForgotPasswordStep1';
import ForgotPasswordStep2 from './src/screens/ForgotPasswordStep2';
import ForgotPasswordStep3 from './src/screens/ForgotPasswordStep3';
import TermsScreen from './src/screens/TermsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import AuthLoading from './src/components/AuthLoading';
import Footer from './src/components/Footer'; // Importa el Footer personalizado
import LostConnectionScreen from './src/screens/LostConnectionScreen'; // Pantalla de conexión perdida
import NotificationsScreen from './src/screens/NotificationsScreen'; // Importa la pantalla de notificaciones
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';
import ProfileScreen from './src/screens/Profile';
import NewPostScreen from './src/screens/NewPostScreen';
import NetInfo from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="NewPost" component={NewPostScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  useEffect(() => {
    // Suscribirse a los cambios de conexión
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe(); // Desuscribirse al desmontar
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer initialRouteName="Splash">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Mostrar la pantalla de conexión perdida si no hay conexión */}
        {isConnected ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewPost" component={NewPostScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordStep1" component={ForgotPasswordStep1} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordStep2" component={ForgotPasswordStep2} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordStep3" component={ForgotPasswordStep3} options={{ headerShown: false }} />
            <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AuthLoading" component={AuthLoading} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="LostConnection" component={LostConnectionScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
