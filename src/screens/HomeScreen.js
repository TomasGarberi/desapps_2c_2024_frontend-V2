import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHome from '../components/home/WelcomeHome';
import Post from '../components/home/Post';
import Ad from '../components/home/Ads';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from '../middleware/axios';
import { useFocusEffect } from '@react-navigation/native'; // Importa el hook

export default function HomeScreen({ navigation }) {
  const [ads, setAds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener anuncios
  const getAds = async () => {
    try {
      const res = await axios.get('/ads');
      setAds(res.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  // Función para obtener el timeline del usuario
  const getTimeline = async (userId) => {
    try {
      const res = await axios.get(`posts/timeline/${userId}`);
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const idResponse = await axios.get('/users/getId');
          const userId = idResponse.data;
          await getAds();
          await getTimeline(userId);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }, [])
  );

  // Función para renderizar contenido con anuncios intercalados
  const RenderContentWithAds = () => {
    const content = [];
    let adsIndex = 0;

    posts.forEach((post, index) => {
      content.push(<Post key={`post-${post.postId}`} post={post} />);
      if ((index + 1) % 3 === 0 && ads.length > 0) {
        const ad = ads[adsIndex % ads.length];
        content.push(<Ad key={`ad-${ad}-${index}`} ad={ad} />);
        adsIndex += 1;
      }
    });

    return content;
  };

  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView style={styles.scrollView}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : posts.length === 0 ? (
              <WelcomeHome />
            ) : (
              RenderContentWithAds()
            )}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
