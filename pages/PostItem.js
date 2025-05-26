import React, { useContext } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { LanguageContext } from '../App';
import * as Calendar from 'expo-calendar';

const PostItem = ({ item, darkTheme }) => {
  const { translations, language } = useContext(LanguageContext);

  const cardStyle = darkTheme ? styles.darkCard : styles.lightCard;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;
  const paragraphStyle = darkTheme ? styles.darkParagraph : styles.lightParagraph;
  const buttonStyle = darkTheme ? styles.darkButton : styles.lightButton;
  const buttonTextStyle = darkTheme ? styles.darkButtonText : styles.lightButtonText;

  const eventDate = item.description
    ? item.description.split(', ')[1] || translations[language].dateNotSpecified
    : translations[language].dateNotSpecified;

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
      if (item.description) {
        const dateStr = item.description.split(', ')[1];
        if (dateStr) {
          const parsedDate = new Date(`2025 ${dateStr}`); 
          if (!isNaN(parsedDate)) {
            startDate = parsedDate;
          }
        }
      }

      const eventDetails = {
        title: item.title || 'Подія',
        startDate,
        endDate: new Date(startDate.getTime() + 60 * 60 * 1000),
        notes: item.description || 'Немає опису',
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

  return (
    <Card style={[styles.card, cardStyle]}>
      <Card.Content>
        <Title style={[styles.title, titleStyle]}>
          {item.title || 'Без назви'}
        </Title>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
        <Paragraph style={[styles.body, paragraphStyle]}>
          {item.description || 'Опис відсутній'}
        </Paragraph>
        <Paragraph style={[styles.date, paragraphStyle]}>
          {translations[language]?.date || 'Дата'}: {eventDate}
        </Paragraph>
        <Paragraph style={[styles.price, paragraphStyle]}>
          {translations[language]?.price || 'Ціна'}: {item.price || 'Не вказано'}
        </Paragraph>
        <Button
          mode="contained"
          onPress={addToCalendar}
          style={[styles.calendarButton, buttonStyle]}
          labelStyle={buttonTextStyle}
        >
          {translations[language]?.addToCalendar || 'Додати до календаря'}
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  lightParagraph: {
    color: '#5d4037',
  },
  darkParagraph: {
    color: '#d4af37',
  },
  calendarButton: {
    marginVertical: 5,
    paddingVertical: 2,
  },
  lightButton: {
    backgroundColor: '#8B4513',
  },
  darkButton: {
    backgroundColor: '#d4af37',
  },
  lightButtonText: {
    color: '#fff',
  },
  darkButtonText: {
    color: '#1e3d2f',
  },
});

export default PostItem;