import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import EventsScreen from './pages/EventsScreen';
import SettingsScreen from './pages/SettingsScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('events');
  const [darkTheme, setDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showDate, setShowDate] = useState(true);

  const containerStyle = darkTheme ? styles.containerDark : styles.containerLight;
  const navStyle = darkTheme ? styles.navDark : styles.navLight;

  return (
    <View style={[styles.container, containerStyle]}>
      {activeScreen === 'events' ? (
        <EventsScreen fontSize={fontSize} showDate={showDate} darkTheme={darkTheme} />
      ) : (
        <SettingsScreen
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          showDate={showDate}
          setShowDate={setShowDate}
        />
      )}

      <View style={[styles.nav, navStyle]}>
        <TouchableOpacity
          style={[styles.navButton, activeScreen === 'events' && styles.activeButton]}
          onPress={() => setActiveScreen('events')}>
          <Text style={styles.buttonText}>Події</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeScreen === 'settings' && styles.activeButton]}
          onPress={() => setActiveScreen('settings')}>
          <Text style={styles.buttonText}>Налаштування</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  containerLight: { backgroundColor: '#fef9f0' }, // більш приємний бежевий
  containerDark: { backgroundColor: '#1e3d2f' },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navLight: {
    backgroundColor: '#d6c9b8',
  },
  navDark: {
    backgroundColor: '#254832',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffd700',
  },
  buttonText: {
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
