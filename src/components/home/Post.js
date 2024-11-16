import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../../middleware/axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import CommentsModal from './CommentsModal';
import ImageCarouselModal from '../ImageCarouselModal';
import DefaultProfileImage from '../../assets/default-profile.png';

export default function Post({ post }) {
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isLiked, setIsLiked] = useState(false); // Estado para el corazón
  const [isFavorited, setIsFavorited] = useState(false); // Estado para el favorito

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const idResponse = await axios.get('/users/getId');
        const userId = idResponse.data;

        const userResponse = await axios.get(`/users/${post.userId}`);
        setUsername(userResponse.data.username);
        setProfileImage(userResponse.data.urlImage);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // Función para alternar el estado de "me gusta"
  const toggleLike = () => setIsLiked(!isLiked);

  // Función para alternar el estado de "favorito"
  const toggleFavorite = () => setIsFavorited(!isFavorited);

  return (
    <View style={styles.postContainer}>
      {/* Header del Usuario */}
      <View style={styles.header}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={profileImage ? { uri: profileImage } : DefaultProfileImage}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.location}>{post.direc}</Text>
        </View>
      </View>

      {/* Imagen de la Publicación */}
      <View style={styles.imageWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          {post.image && post.image.length > 0 && (
            <Image source={{ uri: post.image[0] }} style={styles.postImage} />
          )}
        </TouchableOpacity>
        <View style={styles.actionContainer}>
          <Text style={styles.timeAgo}>{new Date(post.fecha).toLocaleString()}</Text>
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={toggleLike}>
              <View style={styles.icons}>
                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCommentModalVisible(true)}>
              <View style={styles.icons}>
                <Ionicons name="chatbubble-outline" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite}>
              <View style={styles.icons}>
                <Ionicons name={isFavorited ? 'star' : 'star-outline'} size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal de Comentarios */}
      <CommentsModal
        isVisible={isCommentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        postId={post.postId}
        comments={post.comments}
      />

      {/* Modal de Carrusel de Imágenes */}
      <ImageCarouselModal
        isVisible={isImageModalVisible}
        onClose={() => setImageModalVisible(false)}
        images={post.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  userInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  location: {
    fontSize: 10,
    color: '#7C8089',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  descriptionContainer: {
    position: 'absolute',
    backdropFilter: 'blur(10px)',
    zIndex: 999,
    left: 30,
    right: 30,
    top: -5,
    padding: 5,
    backgroundColor: 'rgba(151, 151, 151, 0.4)',
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  postImage: {
    width: 339,
    height: 331,
    borderRadius: 10,
    marginVertical: 10,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 10,
    left: '15%',
    right: '15%',
    borderRadius: 15,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  timeAgo: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#3B3F58',
    marginBottom: 5,
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  icons: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
