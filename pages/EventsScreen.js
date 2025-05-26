import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { LanguageContext } from '../App';
import EventItem from './EventItem';

export default function EventsScreen({ navigation, events, fontSize = 'medium', showDate, darkTheme, language }) {
  const { translations } = useContext(LanguageContext);

  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;

  const renderItem = ({ item }) => (
    <EventItem
      item={item}
      fontSize={fontSize}
      showDate={showDate}
      darkTheme={darkTheme}
      language={language}
      navigation={navigation}
    />
  );

  return (
    <View style={[styles.screen, screenStyle]}>
      <Text style={[styles.header, titleStyle]}>{translations[language].eventList}</Text>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  card: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 4,
  },
  lightCard: {
    backgroundColor: '#f0e6d2',
  },
  darkCard: {
    backgroundColor: '#254832',
  },
  title: {
    fontWeight: 'bold',
  },
  lightTitle: {
    color: '#5d4037',
  },
  darkTitle: {
    color: '#d4af37',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  description: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
  },
  lightParagraph: {
    color: '#5d4037',
  },
  darkParagraph: {
    color: '#d4af37',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  detailContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  detailCard: {
    borderRadius: 10,
    elevation: 4,
    padding: 10,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailDescription: {
    marginBottom: 10,
  },
  detailDate: {
    marginBottom: 10,
  },
  detailPrice: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsButton: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  backButton: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  lightButton: {
    backgroundColor: '#8B4513',
  },
  darkButton: {
    backgroundColor: '#d4af37',
  },
  lightText: {
    color: '#fff',
  },
  darkText: {
    color: '#1e3d2f',
  },
});