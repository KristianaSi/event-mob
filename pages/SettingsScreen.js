import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { AuthContext, LanguageContext } from '../App';

export default function SettingsScreen({
  darkTheme,
  setDarkTheme,
  fontSize,
  setFontSize,
  showDate,
  setShowDate,
  language,
}) {
  const { user, setUser } = useContext(AuthContext);
  const { setLanguage, translations } = useContext(LanguageContext);
  const fontSizes = ['small', 'medium', 'large'];
  const languages = ['uk', 'en'];

  const screenStyle = darkTheme ? styles.darkScreen : styles.lightScreen;
  const settingRowStyle = darkTheme ? styles.darkSettingRow : styles.lightSettingRow;
  const textStyle = darkTheme ? styles.darkText : styles.lightText;
  const switchColor = darkTheme ? '#d4af37' : '#8B4513';

  const getButtonStyle = (isActive) => ({
    backgroundColor: isActive ? (darkTheme ? '#d4af37' : '#a67c52') : 'transparent',
    borderColor: darkTheme ? '#d4af37' : '#8B4513',
    borderWidth: 1,
  });

  const getButtonTextStyle = (isActive) => ({
    color: isActive ? (darkTheme ? '#1e3d2f' : '#fff') : (darkTheme ? '#d4af37' : '#5d4037'),
  });

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={[styles.screen, screenStyle]}>
      <View style={[styles.settingRow, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>
          {translations[language].currentUser}: {user?.name || translations[language].guest}
        </Text>
      </View>
      <View style={[styles.settingRow, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>{translations[language].darkTheme}</Text>
        <Switch value={darkTheme} onValueChange={setDarkTheme} color={switchColor} />
      </View>
      <View style={[styles.settingRowColumn, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>{translations[language].textSize}</Text>
        <View style={styles.fontSizeButtons}>
          {fontSizes.map((size) => (
            <PaperButton
              key={size}
              mode="outlined"
              onPress={() => setFontSize(size)}
              style={getButtonStyle(fontSize === size)}
              labelStyle={getButtonTextStyle(fontSize === size)}
              theme={{ colors: { primary: darkTheme ? '#d4af37' : '#8B4513' } }}
            >
              {translations[language][size]}
            </PaperButton>
          ))}
        </View>
      </View>
      <View style={[styles.settingRowColumn, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>{translations[language].language}</Text>
        <View style={styles.fontSizeButtons}>
          {languages.map((lang) => (
            <PaperButton
              key={lang}
              mode="outlined"
              onPress={() => setLanguage(lang)}
              style={getButtonStyle(language === lang)}
              labelStyle={getButtonTextStyle(language === lang)}
              theme={{ colors: { primary: darkTheme ? '#d4af37' : '#8B4513' } }}
            >
              {translations[language][lang === 'uk' ? 'ukrainian' : 'english']}
            </PaperButton>
          ))}
        </View>
      </View>
      <View style={[styles.settingRow, settingRowStyle]}>
        <Text style={[styles.text, textStyle]}>{translations[language].showEventDate}</Text>
        <Switch value={showDate} onValueChange={setShowDate} color={switchColor} />
      </View>
      <View style={[styles.settingRow, settingRowStyle]}>
        <PaperButton
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, darkTheme ? styles.darkButton : styles.lightButton]}
          labelStyle={textStyle}
        >
          {translations[language].logout}
        </PaperButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
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
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 5,
  },
  lightButton: {
    backgroundColor: '#a67c52',
  },
  darkButton: {
    backgroundColor: '#8B4513',
  },
});