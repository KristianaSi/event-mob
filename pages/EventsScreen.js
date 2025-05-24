import React, { useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { LanguageContext } from '../App';

const EventItem = ({ item, onPress, fontSize, showDate, darkTheme, language }) => {
  const { translations } = useContext(LanguageContext);
  const textStyle = fontSize === 'small' ? styles.smallText : fontSize === 'large' ? styles.largeText : styles.mediumText;
  const cardStyle = darkTheme ? styles.darkCard : styles.lightCard;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;
  const paragraphStyle = darkTheme ? styles.darkParagraph : styles.lightParagraph;

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Card style={[styles.card, cardStyle]}>
        <Card.Content>
          <Title style={[styles.title, textStyle, titleStyle]}>{item.title}</Title>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Paragraph style={[styles.description, textStyle, paragraphStyle]}>
            {item.description}
          </Paragraph>
          {showDate && (
            <Paragraph style={[styles.date, textStyle, paragraphStyle]}>
              {translations[language].date}: {item.description.split(', ')[1]}
            </Paragraph>
          )}
          <Paragraph style={[styles.price, textStyle, paragraphStyle]}>
            {translations[language].price}: {item.price}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default function EventsScreen({ events, fontSize, showDate, darkTheme, language }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { translations } = useContext(LanguageContext);

  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const textStyle = fontSize === 'small' ? styles.smallText : fontSize === 'large' ? styles.largeText : styles.mediumText;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;
  const paragraphStyle = darkTheme ? styles.darkParagraph : styles.lightParagraph;

  const renderItem = ({ item }) => (
    <EventItem
      item={item}
      onPress={setSelectedEvent}
      fontSize={fontSize}
      showDate={showDate}
      darkTheme={darkTheme}
      language={language}
    />
  );

  if (selectedEvent) {
    return (
      <View style={[styles.detailContainer, screenStyle]}>
        <Card style={[styles.detailCard, darkTheme ? styles.darkCard : styles.lightCard]}>
          <Card.Content>
            <Title style={[styles.detailTitle, textStyle, titleStyle]}>{selectedEvent.title}</Title>
            <Image source={{ uri: selectedEvent.image }} style={styles.detailImage} />
            <Paragraph style={[styles.detailDescription, textStyle, paragraphStyle]}>
              {selectedEvent.description}
            </Paragraph>
            {showDate && (
              <Paragraph style={[styles.detailDate, textStyle, paragraphStyle]}>
                {translations[language].date}: {selectedEvent.description.split(', ')[1]}
              </Paragraph>
            )}
            <Paragraph style={[styles.detailPrice, textStyle, paragraphStyle]}>
              {translations[language].price}: {selectedEvent.price}
            </Paragraph>
          </Card.Content>
          <Button
            mode="contained"
            onPress={() => setSelectedEvent(null)}
            style={[styles.backButton, darkTheme ? styles.darkButton : styles.lightButton]}
            labelStyle={darkTheme ? styles.darkText : styles.lightText}
          >
            {translations[language].backFromDetails}
          </Button>
        </Card>
      </View>
    );
  }

  return (
    <View style={[styles.screen, screenStyle]}>
      <Text style={[styles.header, textStyle, titleStyle]}>{translations[language].eventList}</Text>
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
    paddingTop: 1,
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
    marginBottom: 1,
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
  backButton: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  lightButton: {
    backgroundColor: '#a67c52',
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