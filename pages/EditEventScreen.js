import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function EditEventScreen({
  events,
  setEvents,
  onAddEvent,
  onDeleteEvent,
  fontSize,
  darkTheme,
}) {
  const [mode, setMode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventPrice, setNewEventPrice] = useState('');
  const [newEventImage, setNewEventImage] = useState('');

  // Розмір тексту
  const textSize = fontSize === 'small' ? 14 : fontSize === 'large' ? 20 : 16;
  
  // Стилі для темної/світлої теми
  const containerStyle = darkTheme ? styles.darkContainer : styles.lightContainer;
  const textStyle = darkTheme ? styles.darkText : styles.lightText;
  const inputStyle = darkTheme ? styles.darkInput : styles.lightInput;
  const buttonStyle = darkTheme ? styles.darkButton : styles.lightButton;
  const activeButtonStyle = darkTheme ? styles.darkActiveButton : styles.lightActiveButton;
  const eventItemStyle = darkTheme ? styles.darkEventItem : styles.lightEventItem;
  const deleteButtonStyle = darkTheme ? styles.darkDeleteButton : styles.lightDeleteButton;

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setPrice(event.price);
    setImage(event.image);
  };

  const handleEdit = () => {
    if (selectedEvent && title && description && price && image) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, title, description, price, image }
          : event
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
      setMode(null);
    }
  };

  const handleDelete = (id) => {
    onDeleteEvent(id);
    setSelectedEvent(null);
    setMode(null);
  };

  const handleAddNewEvent = () => {
    if (newEventTitle && newEventDescription && newEventPrice && newEventImage) {
      const newEvent = {
        id: Date.now().toString(),
        title: newEventTitle,
        description: newEventDescription,
        price: newEventPrice,
        image: newEventImage,
      };
      onAddEvent(newEvent);
      setNewEventTitle('');
      setNewEventDescription('');
      setNewEventPrice('');
      setNewEventImage('');
      setMode(null);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.modeButton, buttonStyle, mode === 'add' && activeButtonStyle]}
          onPress={() => setMode('add')}>
          <Text style={[styles.buttonText, textStyle]}>Додати</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, buttonStyle, mode === 'edit' && activeButtonStyle]}
          onPress={() => setMode('edit')}>
          <Text style={[styles.buttonText, textStyle]}>Редагувати</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, buttonStyle, mode === 'delete' && activeButtonStyle]}
          onPress={() => setMode('delete')}>
          <Text style={[styles.buttonText, textStyle]}>Видалити</Text>
        </TouchableOpacity>
      </View>

      {mode === 'add' && (
        <View>
          <Text style={[styles.label, { fontSize: textSize }, textStyle]}>Додати нову подію</Text>
          <TextInput
            style={[styles.input, { fontSize: textSize }, inputStyle]}
            value={newEventTitle}
            onChangeText={setNewEventTitle}
            placeholder="Назва"
            placeholderTextColor={darkTheme ? '#aaa' : '#888'}
          />
          <TextInput
            style={[styles.input, { fontSize: textSize }, inputStyle]}
            value={newEventDescription}
            onChangeText={setNewEventDescription}
            placeholder="Опис"
            placeholderTextColor={darkTheme ? '#aaa' : '#888'}
          />
          <TextInput
            style={[styles.input, { fontSize: textSize }, inputStyle]}
            value={newEventPrice}
            onChangeText={setNewEventPrice}
            placeholder="Ціна"
            placeholderTextColor={darkTheme ? '#aaa' : '#888'}
          />
          <TextInput
            style={[styles.input, { fontSize: textSize }, inputStyle]}
            value={newEventImage}
            onChangeText={setNewEventImage}
            placeholder="URL зображення"
            placeholderTextColor={darkTheme ? '#aaa' : '#888'}
          />
          <View style={styles.actionButtons}>
            <Button 
              title="Додати" 
              onPress={handleAddNewEvent} 
              color={darkTheme ? '#d4af37' : '#8B4513'}
            />
            <Button 
              title="Скасувати" 
              onPress={() => setMode(null)} 
              color={darkTheme ? '#aaa' : '#888'}
            />
          </View>
        </View>
      )}

      {mode === 'edit' && (
        <View style={styles.fullScreenContainer}>
          <Text style={[styles.label, { fontSize: textSize }, textStyle]}>Виберіть подію для редагування</Text>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.eventItem, eventItemStyle]}
                onPress={() => handleSelectEvent(item)}>
                <Text style={[styles.eventTitle, { fontSize: textSize }, textStyle]}>{item.title}</Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
          {selectedEvent && (
            <View>
              <Text style={[styles.label, { fontSize: textSize }, textStyle]}>Редагувати подію</Text>
              <TextInput
                style={[styles.input, { fontSize: textSize }, inputStyle]}
                value={title}
                onChangeText={setTitle}
                placeholder="Назва"
                placeholderTextColor={darkTheme ? '#aaa' : '#888'}
              />
              <TextInput
                style={[styles.input, { fontSize: textSize }, inputStyle]}
                value={description}
                onChangeText={setDescription}
                placeholder="Опис"
                placeholderTextColor={darkTheme ? '#aaa' : '#888'}
              />
              <TextInput
                style={[styles.input, { fontSize: textSize }, inputStyle]}
                value={price}
                onChangeText={setPrice}
                placeholder="Ціна"
                placeholderTextColor={darkTheme ? '#aaa' : '#888'}
              />
              <TextInput
                style={[styles.input, { fontSize: textSize }, inputStyle]}
                value={image}
                onChangeText={setImage}
                placeholder="URL зображення"
                placeholderTextColor={darkTheme ? '#aaa' : '#888'}
              />
              <View style={styles.actionButtons}>
                <Button 
                  title="Редагувати" 
                  onPress={handleEdit} 
                  color={darkTheme ? '#d4af37' : '#8B4513'}
                />
                <Button 
                  title="Скасувати" 
                  onPress={() => setSelectedEvent(null)} 
                  color={darkTheme ? '#aaa' : '#888'}
                />
              </View>
            </View>
          )}
          {!selectedEvent && (
            <Button 
              title="Скасувати" 
              onPress={() => setMode(null)} 
              color={darkTheme ? '#aaa' : '#888'}
            />
          )}
        </View>
      )}

      {mode === 'delete' && (
        <View style={styles.fullScreenContainer}>
          <Text style={[styles.label, { fontSize: textSize }, textStyle]}>Виберіть подію для видалення</Text>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.eventItem, eventItemStyle]}>
                <Text style={[styles.eventTitle, { fontSize: textSize }, textStyle]}>{item.title}</Text>
                <TouchableOpacity
                  style={[styles.deleteButton, deleteButtonStyle]}
                  onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Видалити</Text>
                </TouchableOpacity>
              </View>
            )}
            style={styles.list}
          />
          <Button 
            title="Скасувати" 
            onPress={() => setMode(null)} 
            color={darkTheme ? '#aaa' : '#888'}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  lightContainer: {
    backgroundColor: '#fef7ec',
  },
  darkContainer: {
    backgroundColor: '#1e3d2f',
  },
  fullScreenContainer: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  lightButton: {
    backgroundColor: '#b5a789',
  },
  darkButton: {
    backgroundColor: '#254832',
  },
  lightActiveButton: {
    backgroundColor: '#d4af37',
  },
  darkActiveButton: {
    backgroundColor: '#d4af37',
  },
  buttonText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  lightText: {
    color: '#5d4037',
  },
  darkText: {
    color: '#d4af37',
  },
  label: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
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
  list: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  lightEventItem: {
    borderBottomColor: '#ccc',
    backgroundColor: '#f0e6d2',
  },
  darkEventItem: {
    borderBottomColor: '#254832',
    backgroundColor: '#254832',
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
    borderRadius: 5,
  },
  lightDeleteButton: {
    backgroundColor: '#ff4444',
  },
  darkDeleteButton: {
    backgroundColor: '#8B0000',
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});