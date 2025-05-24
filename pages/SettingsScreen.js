import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text, Button } from 'react-native-paper';

export default function SettingsScreen({
  darkTheme,
  setDarkTheme,
  fontSize,
  setFontSize,
  showDate,
  setShowDate,
}) {
  const fontSizes = ['small', 'medium', 'large'];
  const [language, setLanguage] = useState('uk');

  // Стилі для темної/світлої теми
  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const settingRowStyle = darkTheme ? styles.darkSettingRow : styles.lightSettingRow;
  const textStyle = darkTheme ? styles.darkText : styles.lightText;
  const switchColor = darkTheme ? '#d4af37' : '#8B4513';

  // Стилі для кнопок
  const getButtonStyle = (isActive) => ({
    backgroundColor: isActive 
      ? (darkTheme ? '#d4af37' : '#a67c52') 
      : 'transparent',
    borderColor: darkTheme ? '#d4af37' : '#8B4513',
    borderWidth: 1,
  });

  const getButtonTextStyle = (isActive) => ({
    color: isActive 
      ? (darkTheme ? '#1e3d2f' : '#fff') 
      : (darkTheme ? '#d4af37' : '#5d4037'),
  });

  return (
    <View style={[styles.screen, screenStyle]}>
      <View style={[styles.settingRow, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>Темна тема</Text>
        <Switch 
          value={darkTheme} 
          onValueChange={setDarkTheme}
          color={switchColor}
        />
      </View>

      <View style={[styles.settingRowColumn, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>Розмір тексту</Text>
        <View style={styles.fontSizeButtons}>
          {fontSizes.map((size) => (
            <Button
              key={size}
              mode="outlined"
              onPress={() => setFontSize(size)}
              style={getButtonStyle(fontSize === size)}
              labelStyle={getButtonTextStyle(fontSize === size)}
              theme={{
                colors: {
                  primary: darkTheme ? '#d4af37' : '#8B4513',
                },
              }}
            >
              {size === 'small' ? 'Малий' : size === 'medium' ? 'Середній' : 'Великий'}
            </Button>
          ))}
        </View>
      </View>

      <View style={[styles.settingRow, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>Показувати дату події</Text>
        <Switch 
          value={showDate} 
          onValueChange={setShowDate}
          color={switchColor}
        />
      </View>

      <View style={[styles.settingRowColumn, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>Мова</Text>
        <View style={styles.languageButtons}>
          <Button
            mode="outlined"
            onPress={() => setLanguage('uk')}
            style={getButtonStyle(language === 'uk')}
            labelStyle={getButtonTextStyle(language === 'uk')}
            theme={{
              colors: {
                primary: darkTheme ? '#d4af37' : '#8B4513',
              },
            }}
          >
            Українська
          </Button>
          <Button
            mode="outlined"
            onPress={() => setLanguage('en')}
            style={getButtonStyle(language === 'en')}
            labelStyle={getButtonTextStyle(language === 'en')}
            theme={{
              colors: {
                primary: darkTheme ? '#d4af37' : '#8B4513',
              },
            }}
          >
            English
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 40,
  },
  lightScreen: {
    backgroundColor: '#f5f5dc',
  },
  darkScreen: {
    backgroundColor: '#1e3d2f',
  },
  lightSettingRow: {
    backgroundColor: '#f0e6d2',
  },
  darkSettingRow: {
    backgroundColor: '#254832',
  },
  lightText: {
    color: '#5d4037',
  },
  darkText: {
    color: '#d4af37',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingRowColumn: {
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fontSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});