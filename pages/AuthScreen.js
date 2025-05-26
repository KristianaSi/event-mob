import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext, LanguageContext } from '../App';
import axios from 'axios';

export default function AuthScreen({ darkTheme, language }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);

  const containerStyle = darkTheme ? styles.darkContainer : styles.lightContainer;
  const textStyle = darkTheme ? styles.darkText : styles.lightText;
  const inputStyle = darkTheme ? styles.darkInput : styles.lightInput;

  const validateInputs = () => {
    if (!username.trim()) {
      setError(translations[language].usernameError);
      return false;
    }
    if (!password.trim()) {
      setError(translations[language].passwordError);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');
    if (!validateInputs()) return;

    setLoading(true);
    try {
      if (username === 'kris.siladiy@gmail.com' && password === '1234') {
        setUser({ name: username.split('@')[0] || 'Користувач', token: 'mock-token-1234' });
        setUsername('');
        setPassword('');
        return; 
      }

      
      const response = await axios.post('https://yourserver.com/api/login', {
        email: username,
        password: password,
      });

      if (response.data.token) {
        setUser({ name: username.split('@')[0] || 'Користувач', token: response.data.token });
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError(translations[language].loginError);
      Alert.alert(translations[language].loginErrorAlert, translations[language].loginError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, textStyle]}>{translations[language].login}</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={translations[language].username}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor={darkTheme ? '#aaa' : '#888'}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={translations[language].password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={darkTheme ? '#aaa' : '#888'}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.loginButton, darkTheme ? styles.darkButton : styles.lightButton]}
        labelStyle={textStyle}
        disabled={loading}
        loading={loading}
      >
        {translations[language].loginButton}
      </Button>
      <View style={styles.userInfo}>
        <Text style={[styles.infoText, textStyle]}>
          {translations[language].testUsers}:
        </Text>
        <Text style={[styles.infoText, textStyle]}>
          Email: kris.siladiy@gmail.com
        </Text>
        <Text style={[styles.infoText, textStyle]}>
          Password: 1234
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fef7ec',
  },
  darkContainer: {
    backgroundColor: '#1e3d2f',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lightText: {
    color: '#5d4037',
  },
  darkText: {
    color: '#d4af37',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
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
  loginButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
  lightButton: {
    backgroundColor: '#8B4513',
  },
  darkButton: {
    backgroundColor: '#d4af37',
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
});