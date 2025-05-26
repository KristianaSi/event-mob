import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostItem from './PostItem';

export default function PostsScreen({ navigation, route, events, darkTheme, language, translations }) {
  const flatListRef = useRef(null);

  const eventId = route?.params?.eventId;

  useEffect(() => {
    if (eventId && flatListRef.current) {
      const index = events.findIndex((event) => event.id === eventId);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [eventId, events]);

  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;

  const renderItem = ({ item }) => (
    <PostItem
      item={item}
      darkTheme={darkTheme}
    />
  );

  return (
    <View style={[styles.screen, screenStyle]}>
      <Text style={[styles.header, titleStyle]}>{translations[language].postsList || 'Список постів'}</Text>
      <FlatList
        ref={flatListRef}
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onScrollToIndexFailed={(info) => {
          console.warn('Scroll to index failed:', info);
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          }, 100);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
  },
  lightScreen: {
    backgroundColor: '#f5f5dc',
  },
  darkScreen: {
    backgroundColor: '#1e3d2f',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
});