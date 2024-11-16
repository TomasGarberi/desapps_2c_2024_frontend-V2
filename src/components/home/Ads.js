import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Share } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const exampleAd = {
  userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Logo_Mercado_Libre.png/800px-Logo_Mercado_Libre.png',
  username: 'mercadolibre',
  image: 'https://i.imgur.com/JXxTdsu.jpg',
  websiteUrl: 'https://www.mercadolibre.com.ar'
};

export default function Ad({ ad = exampleAd }) {
  const handlePressLink = () => {
    Linking.openURL(ad.Url);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Visita ${ad.username} en ${ad.websiteUrl}`,
        url: ad.websiteUrl,
      });
      console.log(result);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.adContainer}>
      {/* Header del Usuario */}
      <View style={styles.header}>
        <View style={styles.profileImageWrapper}>
          <Image source={{ uri: ad.imagePath[0].portraite }} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{ad.commerce}</Text>
          <Text style={styles.adLabel}>Publicidad</Text>
        </View>
      </View>

      {/* Imagen del Anuncio */}
      <View style={styles.imageWrapper}>
        {/* Descripción del Anuncio */}
        <TouchableOpacity onPress={handlePressLink} style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>Visita nuestra página web para más detalles</Text>
        </TouchableOpacity>
        <Image source={{ uri: ad.imagePath[0].portraite }} style={styles.adImage} />

        {/* Botón de Compartir */}
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleShare} style={styles.shareIcon}>
            <Ionicons name="share-social-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
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
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  adLabel: {
    fontSize: 10,
    color: '#7C8089',
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  descriptionContainer: {
    position: 'absolute',
    zIndex: 999,
    left: 30,
    right: 30,
    top: -5,
    padding: 5,
    backgroundColor: '#091456',
    borderRadius: 8,
  },
  descriptionText: {
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  adImage: {
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
    alignItems: 'center',
  },
  shareIcon: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  }
});
