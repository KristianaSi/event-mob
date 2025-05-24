import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

export default function EventItem({ event, fontSize, showDate }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={[styles.title, { fontSize: fontSizes[fontSize] }]}>{event.title}</Text>
        {showDate && (
          <Text style={[styles.description, { fontSize: fontSizes[fontSize] - 2 }]}>
            {event.description}
          </Text>
        )}
        <Text style={[styles.price, { fontSize: fontSizes[fontSize] - 2 }]}>{event.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
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
  description: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#aa0000',
    fontStyle: 'italic',
  },
});
