import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

export default function CommentsModal({ isVisible, onClose, postId }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: '1', username: 'carla.mendoza', timeAgo: 'Hace 3 minutos', text: '¡Qué hermoso lugar! Central Park siempre es mágico en cualquier época del año. 🌳🍂' },
    { id: '2', username: 'laura.sanchez', timeAgo: 'Hace 1 hora', text: 'Increíble vista de Central Park, ¡es el lugar perfecto para relajarse y disfrutar de la naturaleza! 🌿😊' },
    { id: '3', username: 'luis.martinez', timeAgo: 'Hace 2 horas', text: 'Central Park 🌳 siempre es una buena idea. Qué vista más espectacular ✨' },
  ]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: (comments.length + 1).toString(),
        username: 'tu.usuario', // Cambiar por el usuario actual
        timeAgo: 'Justo ahora',
        text: commentText,
      };
      setComments([newComment, ...comments]); // Agregar el nuevo comentario al inicio
      setCommentText('');
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.username}>@{item.username}</Text>
      <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Comentarios</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de comentarios */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          style={styles.commentsList}
          contentContainerStyle={styles.commentsContainer}
        />

        {/* Input de nuevo comentario */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Añade un comentario..."
            placeholderTextColor="#B0B0B0"
            value={commentText}
            onChangeText={setCommentText}
          />
          <Button title="Enviar" onPress={handleAddComment} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B3F58',
  },
  closeButton: {
    fontSize: 18,
    color: '#3B3F58',
  },
  commentsList: {
    maxHeight: '60%',
    backgroundColor: '#fff',
  },
  commentsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  commentContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B3F58',
  },
  timeAgo: {
    fontSize: 10,
    color: '#7C8089',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#2e2e2e',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  commentInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#00C1FF',
    borderRadius: 5,
    marginRight: 10,
    color: '#000',
  },
});
