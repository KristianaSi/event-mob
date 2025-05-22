import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

export default function EventItem({ event, fontSize, showDate }) {
  return (
    <View style={styles.item}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.textBlock}>
        <Text style={[styles.title, { fontSize: fontSizes[fontSize], fontStyle: 'italic' }]}>
          {event.title}
        </Text>
        {showDate && (
          <Text style={[styles.date, { fontSize: fontSizes[fontSize] - 2, fontStyle: 'italic' }]}>
            {event.date}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#fff8dc',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  textBlock: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    color: '#333',
  },
  date: {
    color: '#666',
    marginTop: 4,
  },
});
