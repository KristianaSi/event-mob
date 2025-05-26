import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import * as Calendar from 'expo-calendar';
import { useContext } from 'react';
import { LanguageContext } from '../App';

export default function PostDetailsScreen({ route, navigation, darkTheme }) {
  const { post } = route.params || {};
  const { translations, language } = useContext(LanguageContext);

  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;
  const paragraphStyle = darkTheme ? styles.darkParagraph : styles.lightParagraph;

  if (!post) {
    return (
      <View style={[styles.screen, screenStyle]}>
        <Text style={[styles.errorText, paragraphStyle]}>
          {translations[language]?.errorNoData || 'Помилка: Дані не знайдено'}
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={[styles.button, darkTheme ? styles.darkButton : styles.lightButton]}
          labelStyle={darkTheme ? styles.darkText : styles.lightText}
        >
          {translations[language]?.backFromDetails || 'Повернутися'}
        </Button>
      </View>
    );
  }

  const addToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          translations[language]?.calendarError,
          translations[language]?.calendarPermissionDenied
        );
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find((cal) => cal.allowsModifications) || calendars[0];

      if (!defaultCalendar) {
        Alert.alert(
          translations[language]?.calendarError,
          translations[language]?.noCalendarFound
        );
        return;
      }

      let startDate = new Date();
      if (post.description) {
        const dateStr = post.description.split(', ')[1];
        if (dateStr) {
          const parsedDate = new Date(`2025 ${dateStr}`); 
          if (!isNaN(parsedDate)) {
            startDate = parsedDate;
          }
        }
      }

      const eventDetails = {
        title: post.title || 'Подія',
        startDate,
        endDate: new Date(startDate.getTime() + 60 * 60 * 1000), 
        notes: post.description || 'Немає опису',
        calendarId: defaultCalendar.id,
      };

      await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
      Alert.alert(translations[language]?.calendarEventAdded);
    } catch (error) {
      Alert.alert(
        translations[language]?.calendarError,
        error.message
      );
    }
  };

  const eventDate = post.description
    ? post.description.split(', ')[1] || translations[language].dateNotSpecified
    : translations[language].dateNotSpecified;

  return (
    <View style={[styles.screen, screenStyle]}>
      <Card style={[styles.card, darkTheme ? styles.darkCard : styles.lightCard]}>
        <Card.Content>
          <Title style={[styles.title, titleStyle]}>
            {post.title || 'Без назви'}
          </Title>
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.image} />
          )}
          <Paragraph style={[styles.body, paragraphStyle]}>
            {post.description || 'Опис відсутній'}
          </Paragraph>
          <Paragraph style={[styles.date, paragraphStyle]}>
            {translations[language]?.date || 'Дата'}: {eventDate}
          </Paragraph>
          <Paragraph style={[styles.price, paragraphStyle]}>
            {translations[language]?.price || 'Ціна'}: {post.price || 'Не вказано'}
          </Paragraph>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={addToCalendar}
        style={[styles.button, darkTheme ? styles.darkButton : styles.lightButton]}
        labelStyle={darkTheme ? styles.darkText : styles.lightText}
      >
        {translations[language]?.addToCalendar || 'Додати до календаря'}
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={[styles.button, darkTheme ? styles.darkButton : styles.lightButton]}
        labelStyle={darkTheme ? styles.darkText : styles.lightText}
      >
        {translations[language]?.backFromDetails || 'Повернутися'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  lightScreen: {
    backgroundColor: '#f5f5dc',
  },
  darkScreen: {
    backgroundColor: '#1e3d2f',
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
    fontSize: 24,
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
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  body: {
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
  button: {
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
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});