import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from '../../middleware/axios';

export default function UserSuggestion({ user, onPress }) {
  const [isFollowing, setIsFollowing] = useState(false); // Estado para seguimiento
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el popup
  const [followedList, setFollowedList] = useState([]); // Estado para la lista de seguidos

  // Función para manejar el seguimiento o dejar de seguir
  const handleFollowAction = async () => {
    try {
      // Obtener el ID del usuario autenticado
      const idResponse = await axios.get('/users/getId');
      const userId = idResponse.data;

      if (userId) {
        if (isFollowing) {
          // Dejar de seguir
          await axios.delete(`/users/${userId}/unfollow/${user.id}`);
          setIsFollowing(false);
        } else {
          // Seguir al usuario
          await axios.post(`/users/${userId}/follow/${user.id}`);
          setIsFollowing(true);
        }
      } else {
        console.error("User ID not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Función para chequear si el usuario está siguiendo
  const checkIfFollowing = async () => {
    try {
      // Obtener el ID del usuario autenticado
      const idResponse = await axios.get('/users/getId');
      const userId = idResponse.data;

      if (userId) {
        // Obtener lista de usuarios seguidos
        const followedListResponse = await axios.get(`/users/${userId}/followed`);
        const followedIds = followedListResponse.data.map(user => user.id); 
        setFollowedList(followedIds);

        // Verificar si el usuario recibido está en la lista de seguidos
        const isUserFollowing = followedIds.includes(user.id);
        setIsFollowing(isUserFollowing);
      } else {
        console.error("User ID not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Llamar a la función para verificar si el usuario está siguiendo al componente cuando cambia "user"
    checkIfFollowing();
  }, [user]);

  // Confirmar dejar de seguir
  const confirmUnfollow = async () => {
    try {
      // Lógica para dejar de seguir al usuario
      const idResponse = await axios.get('/users/getId');
      const userId = idResponse.data;
      if (userId) {
        // Aquí iría la lógica para eliminar el seguimiento
        await axios.delete(`/users/${userId}/unfollow/${user.id}`);
        setIsFollowing(false); // Actualizamos el estado para reflejar que ya no estamos siguiendo
        setShowConfirmation(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={user.profileImage ? { uri: user.profileImage } : require('../../assets/default-profile.png')} 
        style={styles.profileImage} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <TouchableOpacity
        onPress={handleFollowAction} // Llama a handleFollowAction
        style={isFollowing ? styles.unfollowButton : styles.followButton}
      >
        <Text style={isFollowing ? styles.unfollowButtonText : styles.followButtonText}>
          {isFollowing ? 'Eliminar' : 'Seguir'}
        </Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <Modal
          transparent
          animationType="fade"
          visible={showConfirmation}
          onRequestClose={() => setShowConfirmation(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                ¿Estás seguro de que deseas dejar de seguir a esta persona?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowConfirmation(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmUnfollow}
                >
                  <Text style={styles.confirmButtonText}>Sí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderImage: 'linear-gradient(to right, #902CA5, #00F0FF) 1',
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  username: {
    fontSize: 12,
    color: '#2e2e2e',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 10,
    color: '#3B3F58',
  },
  followButton: {
    backgroundColor: '#3B3F58',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  unfollowButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#4F5269',
    borderWidth: 1,
  },
  unfollowButtonText: {
    color: '#3B3F58',
    fontSize: 11,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#2B2B2B',
    width: 91,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#2B2B2B',
    width: 91,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
