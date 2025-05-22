import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen({
  darkTheme,
  setDarkTheme,
  fontSize,
  setFontSize,
  showDate,
  setShowDate,
}) {
  const fontSizes = ['small', 'medium', 'large'];

  return (
    <View style={[styles.screen, darkTheme ? styles.dark : styles.light]}>
      <View style={styles.settingRow}>
        <Text style={[styles.label, darkTheme && styles.labelDark]}>Темна тема</Text>
        <Switch value={darkTheme} onValueChange={setDarkTheme} />
      </View>

      <View style={styles.settingRowColumn}>
        <Text style={[styles.label, darkTheme && styles.labelDark]}>Розмір тексту</Text>
        <View style={styles.fontSizeButtons}>
          {fontSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.fontButton,
                fontSize === size && styles.fontButtonActive,
                darkTheme && fontSize === size && styles.fontButtonActiveDark,
              ]}
              onPress={() => setFontSize(size)}
            >
              <Text
                style={[
                  styles.fontButtonText,
                  darkTheme && styles.fontButtonTextDark,
                ]}
              >
                {size === 'small' ? 'Малий' : size === 'medium' ? 'Середній' : 'Великий'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.label, darkTheme && styles.labelDark]}>Показувати дату події</Text>
        <Switch value={showDate} onValueChange={setShowDate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 16, paddingTop: 40 }, // Змінено paddingTop на 40
  light: { backgroundColor: '#fef9f0' },
  dark: { backgroundColor: '#1e3d2f' },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  settingRowColumn: {
    marginVertical: 15,
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  labelDark: {
    color: '#ffffff',
  },
  fontSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fontButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3b5d44',
    borderRadius: 6,
  },
  fontButtonActive: {
    backgroundColor: '#b5a789',
  },
  fontButtonActiveDark: {
    backgroundColor: '#d4af37',
  },
  fontButtonText: {
    color: '#333',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  fontButtonTextDark: {
    color: '#ffffff',
  },
});