import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { LanguageContext } from '../App';

const EventItem = ({ item, fontSize, showDate, darkTheme, language, navigation }) => {
  const { translations } = useContext(LanguageContext);

  const cardStyle = darkTheme ? styles.darkCard : styles.lightCard;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;
  const paragraphStyle = darkTheme ? styles.darkParagraph : styles.lightParagraph;
  const buttonStyle = darkTheme ? styles.darkButton : styles.lightButton;
  const buttonTextStyle = darkTheme ? styles.darkButtonText : styles.lightButtonText;

  const textSizeStyle = fontSize === 'small' ? styles.smallText : fontSize === 'large' ? styles.largeText : styles.mediumText;

  const eventDate = item.description
    ? item.description.split(', ')[1] || translations[language].dateNotSpecified
    : translations[language].dateNotSpecified;

  const handleDetailsPress = () => {
    navigation.navigate('Posts', { eventId: item.id });
  };

  return (
    <Card style={[styles.card, cardStyle]}>
      <Card.Content>
        <Title style={[styles.title, titleStyle, textSizeStyle]}>{item.title}</Title>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <Paragraph style={[styles.description, paragraphStyle, textSizeStyle]} numberOfLines={2}>
          {item.description}
        </Paragraph>
        {showDate && (
          <Paragraph style={[styles.date, paragraphStyle, textSizeStyle]}>
            {translations[language].date}: {eventDate}
          </Paragraph>
        )}
        <Paragraph style={[styles.price, paragraphStyle, textSizeStyle]}>
          {translations[language].price}: {item.price}
        </Paragraph>
        <Button
          mode="contained"
          onPress={handleDetailsPress}
          style={[styles.detailsButton, buttonStyle]}
          labelStyle={buttonTextStyle}
        >
          {translations[language].moreDetails || 'Детальніше'}
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
    marginBottom: 10,
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
  detailsButton: {
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

export default EventItem;