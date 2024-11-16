import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Footer = ({ navigation, state }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: 'Home', key: Date.now().toString() })}>
        <Ionicons name="home-outline" size={30} color={state.index === 0 ? "#000" : "#888"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: 'Search' })}>
        <Ionicons name="search-outline" size={30} color={state.index === 1 ? "#000" : "#888"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: 'NewPost' })}>
        <Ionicons name="add-circle-outline" size={30} color={state.index === 2 ? "#000" : "#888"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: 'Notifications' })}>
        <Ionicons name="heart-outline" size={30} color={state.index === 3 ? "#000" : "#888"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: 'Profile' })}>
        <Ionicons name="person-outline" size={30} color={state.index === 4 ? "#000" : "#888"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
});

export default Footer;
