import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

export default function EventsScreen({ events, fontSize, showDate, darkTheme }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const textSize = fontSize === 'small' ? 14 : fontSize === 'large' ? 20 : 16;
  
  // Стилі для темної/світлої теми
  const containerStyle = darkTheme ? styles.darkContainer : styles.lightContainer;
  const cardStyle = darkTheme ? styles.darkCard : styles.lightCard;
  const textStyle = darkTheme ? styles.darkText : styles.lightText;
  const priceStyle = darkTheme ? styles.darkPrice : styles.lightPrice;
  const buttonStyle = darkTheme ? styles.darkButton : styles.lightButton;
  const modalContainerStyle = darkTheme ? styles.darkModalContainer : styles.lightModalContainer;

  const renderItem = ({ item }) => (
    <View style={[styles.card, cardStyle]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={[styles.title, { fontSize: textSize }, textStyle]}>{item.title}</Text>
        <Text style={[styles.description, { fontSize: textSize - 2 }, textStyle]}>{item.description}</Text>
        <Text style={[styles.price, { fontSize: textSize - 2 }, priceStyle]}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.detailsButton, buttonStyle]}
        onPress={() => setSelectedEvent(item)}>
        <Text style={styles.detailsText}>Деталі</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Modal
        visible={!!selectedEvent}
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}>
        <View style={[styles.modalContainer, modalContainerStyle]}>
          {selectedEvent && (
            <>
              <Image source={{ uri: selectedEvent.image }} style={styles.modalImage} />
              <Text style={[styles.modalTitle, { fontSize: textSize }, textStyle]}>{selectedEvent.title}</Text>
              <Text style={[styles.modalDescription, { fontSize: textSize - 2 }, textStyle]}>
                {selectedEvent.description}
              </Text>
              <Text style={[styles.modalPrice, { fontSize: textSize - 2 }, priceStyle]}>{selectedEvent.price}</Text>
              <Button 
                title="Закрити" 
                onPress={() => setSelectedEvent(null)} 
                color={darkTheme ? '#d4af37' : '#8B4513'}
              />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  lightContainer: {
    backgroundColor: '#fef7ec',
  },
  darkContainer: {
    backgroundColor: '#1e3d2f',
  },
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  lightCard: {
    backgroundColor: '#fff',
  },
  darkCard: {
    backgroundColor: '#254832',
  },
  image: {
    width: 100,
    height: 100,
  },
  textWrapper: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  lightText: {
    color: '#5d4037',
  },
  darkText: {
    color: '#d4af37',
  },
  description: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  lightPrice: {
    color: '#aa0000',
  },
  darkPrice: {
    color: '#ff6b6b',
  },
  lightButton: {
    backgroundColor: '#b5a789',
  },
  darkButton: {
    backgroundColor: '#d4af37',
  },
  detailsButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    padding: 5,
    borderRadius: 5,
  },
  detailsText: {
    color: 'white',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightModalContainer: {
    backgroundColor: '#fff',
  },
  darkModalContainer: {
    backgroundColor: '#1e3d2f',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    marginTop: 4,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPrice: {
    marginTop: 4,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
  },
});