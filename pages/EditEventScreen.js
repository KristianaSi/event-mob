import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { LanguageContext } from '../App';

export default function EditEventScreen({ events, fontSize, darkTheme, language }) {
  const [eventList, setEventList] = useState(events);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(''); // Додано стан для помилки
  const { translations } = useContext(LanguageContext);

  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const textStyle = fontSize === 'small' ? styles.smallText : fontSize === 'large' ? styles.largeText : styles.mediumText;
  const inputStyle = darkTheme ? styles.darkInput : styles.lightInput;
  const cardStyle = darkTheme ? styles.darkCard : styles.lightCard;
  const titleStyle = darkTheme ? styles.darkTitle : styles.lightTitle;
  const buttonStyle = darkTheme ? styles.darkButton : styles.lightButton;
  const buttonTextStyle = darkTheme ? styles.darkButtonText : styles.lightButtonText;

  const addEvent = () => {
    if (!title || !description || !price || !image) {
      setError(translations[language].errorFillFields); // Встановлення помилки
      Alert.alert(translations[language].error, translations[language].errorFillFields);
      return;
    }
    setError(''); // Очищення помилки

    const newEvent = {
      id: String(eventList.length + 1),
      title,
      description,
      price,
      image,
    };

    setEventList([...eventList, newEvent]);
    clearInputs();
  };

  const editEvent = () => {
    if (!selectedEvent) return;

    if (!title || !description || !price || !image) {
      setError(translations[language].errorFillFields); // Встановлення помилки
      Alert.alert(translations[language].error, translations[language].errorFillFields);
      return;
    }
    setError(''); // Очищення помилки

    const updatedEvents = eventList.map((event) =>
      event.id === selectedEvent.id
        ? { ...event, title, description, price, image }
        : event
    );

    setEventList(updatedEvents);
    clearInputs();
    setSelectedEvent(null);
  };

  const deleteEvent = () => {
    if (!selectedEvent) return;

    const updatedEvents = eventList.filter((event) => event.id !== selectedEvent.id);
    setEventList(updatedEvents);
    clearInputs();
    setSelectedEvent(null);
    setError(''); // Очищення помилки
  };

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage('');
    setError(''); // Очищення помилки
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setPrice(event.price);
    setImage(event.image);
    setError(''); // Очищення помилки при виборі події
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, cardStyle]} onPress={() => selectEvent(item)}>
      <Card.Content>
        <Title style={[styles.title, textStyle, titleStyle]}>{item.title}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.screen, screenStyle]}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null} {}
      <TextInput
        style={[styles.input, inputStyle, textStyle]}
        placeholder={translations[language].eventTitle}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={darkTheme ? '#aaa' : '#888'}
      />
      <TextInput
        style={[styles.input, inputStyle, textStyle]}
        placeholder={translations[language].eventDescription}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={darkTheme ? '#aaa' : '#888'}
      />
      <TextInput
        style={[styles.input, inputStyle, textStyle]}
        placeholder={translations[language].eventPrice}
        value={price}
        onChangeText={setPrice}
        placeholderTextColor={darkTheme ? '#aaa' : '#888'}
      />
      <TextInput
        style={[styles.input, inputStyle, textStyle]}
        placeholder={translations[language].eventImage}
        value={image}
        onChangeText={setImage}
        placeholderTextColor={darkTheme ? '#aaa' : '#888'}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={addEvent}
          style={[styles.button, buttonStyle]}
          labelStyle={[textStyle, buttonTextStyle]}
        >
          {translations[language].add}
        </Button>
        <Button
          mode="contained"
          onPress={editEvent}
          style={[styles.button, buttonStyle]}
          labelStyle={[textStyle, buttonTextStyle]}
          disabled={!selectedEvent}
        >
          {translations[language].editButton}
        </Button>
        <Button
          mode="contained"
          onPress={deleteEvent}
          style={[styles.button, buttonStyle]}
          labelStyle={[textStyle, buttonTextStyle]}
          disabled={!selectedEvent}
        >
          {translations[language].delete}
        </Button>
      </View>
      <FlatList
        data={eventList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    paddingTop: 15,
  },
  lightScreen: {
    backgroundColor: '#f5f5dc',
  },
  darkScreen: {
    backgroundColor: '#1e3d2f',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  lightInput: {
    borderColor: '#aaa',
    backgroundColor: '#fff',
    color: '#333',
  },
  darkInput: {
    borderColor: '#d4af37',
    backgroundColor: '#254832',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  lightButton: {
    backgroundColor: '#a67c52',
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
  list: {
    flex: 1,
  },
  card: {
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
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
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});