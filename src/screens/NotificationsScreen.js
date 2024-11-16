import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'; // Importa el Header

export default function NotificationsScreen() {
  const navigation = useNavigation();

  // Datos mockeados de notificaciones
  const exampleNotifications = [
    { id: 1, username: '@carla.mendoza', timeAgo: 'Hace 3 min', postId: 101 },
    { id: 2, username: '@carlos.lopez', timeAgo: 'Hace 25 min', postId: 102 },
    { id: 3, username: '@ana.garcia', timeAgo: 'Hace 30 min', postId: 103 },
    { id: 4, username: '@maria.fernandez', timeAgo: 'Hace 2 horas', postId: 104 },
    { id: 5, username: '@laura.sanchez', timeAgo: 'Hace 6 horas', postId: 105 },
    { id: 6, username: '@laura.gonzales', timeAgo: 'Hace 12 horas', postId: 106 },
    { id: 7, username: '@martin.torres', timeAgo: 'Hace 1 día', postId: 107 },
    { id: 8, username: '@diego.lopez', timeAgo: 'Hace 1 semana', postId: 108 },
  ];

  // Contador de comentarios basados en las notificaciones mockeadas
  const commentsCount = exampleNotifications.length;

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => navigation.navigate('Post', { postId: item.postId })}
    >
      <View style={styles.notificationTextContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      </View>
      <Text style={styles.commentText}>Añadió un comentario a tu publicación</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Contador de comentarios */}
      <Text style={styles.commentsCount}>{commentsCount}</Text>
      <Text style={styles.commentsLabel}>Comentarios Realizados</Text>

      {/* Lista de notificaciones */}
      <FlatList
        data={exampleNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.notificationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  commentsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C0F14',
    textAlign: 'center',
    paddingTop: 30,
  },
  commentsLabel: {
    fontSize: 12,
    color: '#0C0F14',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 30,
  },
  notificationsList: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  notificationTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  username: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  timeAgo: {
    fontSize: 12,
    color: '#3F3F3F',
    opacity: 0.5,
  },
  commentText: {
    fontSize: 12,
    color: '#3F3F3F',
  },
});
