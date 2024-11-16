import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from './Post';

export default function Timeline({ posts }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Post post={item} />}
      contentContainerStyle={styles.timelineContainer}
      showsVerticalScrollIndicator={false} 
    />
  );
}

const styles = StyleSheet.create({
  timelineContainer: {
    paddingVertical: 10,
  },
});
