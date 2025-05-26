import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import EventsScreen from './pages/EventsScreen';
import EditEventScreen from './pages/EditEventScreen';
import SettingsScreen from './pages/SettingsScreen';
import AuthScreen from './pages/AuthScreen';
import PostsScreen from './pages/PostsScreen';
import PostDetailsScreen from './pages/PostDetailsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const AuthContext = createContext();
export const LanguageContext = createContext();


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, 
      staleTime: 1000 * 60 * 5, 
    },
  },
});


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const eventsData = [
  {
    id: '1',
    title: 'Фестиваль вуличної музики',
    description: 'Центр Ужгорода, 10 червня, 17:00.',
    price: 'Вхід вільний',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDMWVYT4O-uLBrkZc_zAMymSJhpTnIEB1Kg&s',
  },
  {
    id: '2',
    title: 'Вечір поезії',
    description: 'Бібліотека ім. Шевченка, 5 червня.',
    price: '100 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFX3FRezXVT1XW9Ddc7aIZ_ht3EdhA54MkUg&s',
  },
  {
    id: '3',
    title: 'Етнофестиваль «Берлибаський банош»',
    description: 'с. Костилівка, Рахівський район, 8 червня.',
    price: '150 грн',
    image: 'https://pershij.com.ua/wp-content/uploads/2018/05/IMG_4962.jpg',
  },
  {
    id: '4',
    title: 'Ніч музеїв у замку Паланок',
    description: 'Мукачево, 18 травня.',
    price: '50 грн',
    image: 'https://mukachevo.net/uploads/media/images/image/ac/8b/ac8bc00cb20c4323a4fd9f6c862ea0b96130htfn1esabhi_image.jpg',
  },
  {
    id: '5',
    title: 'Середньовічна реконструкція у замку Сент-Міклош',
    description: 'с. Чинадійово, 22 червня.',
    price: '120 грн',
    image: 'https://ua.igotoworld.com/frontend/webcontent/images/tours/1925858_800x600_sent_miklosh_2.jpg',
  },
  {
    id: '6',
    title: 'Винний фестиваль у Берегові',
    description: 'Центр міста, 12 липня.',
    price: '200 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsgIqLXTu_FBNAyd4EGEOb9umTPKzW_otzw&s',
  },
  {
    id: '7',
    title: 'Концерт камерної музики',
    description: 'Філармонія Ужгорода, 28 червня.',
    price: '80 грн',
    image: 'https://static.ukrinform.com/photos/2025_05/thumb_files/630_360_1747918360-6083.jpeg',
  },
  {
    id: '8',
    title: 'Фестиваль меду',
    description: 'Іршава, 3 серпня.',
    price: '50 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-nEZVbPUctUcEL4XsVL3ousFNwNaqT7TWg&s',
  },
  {
    id: '9',
    title: 'Фестиваль народного танцю',
    description: 'Тячів, 20 серпня.',
    price: 'Вхід вільний',
    image: 'https://rai.ua/wp-content/uploads/2025/05/op3-870x400.jpg',
  },
  {
    id: '10',
    title: 'Театральний фестиваль',
    description: 'Драмтеатр, Ужгород, 10 вересня.',
    price: '100 грн',
    image: 'https://images.unsplash.com/photo-1569163556164-35f53c6812e0',
  },
  {
    id: '11',
    title: 'Конкурс молодих художників',
    description: 'Галерея «Ілько», 25 червня.',
    price: '30 грн',
    image: 'https://day.kyiv.ua/sites/default/files/news/22102016/15.jpg',
  },
  {
    id: '12',
    title: 'Свято різьбярства',
    description: 'с. Колочава, 14 липня.',
    price: '70 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6vEozScw05RxUccfSUwcy0TXNfFDJpNKyQ&s',
  },
  {
    id: '13',
    title: 'Кінопоказ просто неба',
    description: 'Площа Народна, Ужгород, 19 червня.',
    price: 'Безкоштовно',
    image: 'https://mukachevo.net/uploads/media/images/image/02/a9/02a9acdd287e4b99902157355511d772o7ucjn0y6mdfeic_image.jpg',
  },
  {
    id: '14',
    title: 'Фестиваль ремесел',
    description: 'Хуст, 7 серпня.',
    price: '90 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghc1zBZGHackTz_QrH0EvIcu8O3tafBAVgw&s',
  },
  {
    id: '15',
    title: 'Концерт джазової музики',
    description: 'Філармонія, 15 липня.',
    price: '120 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:'
      + 'Andr3FRezXVT1XW9Ddc7aIZ_ht3EdhA54MkUg&s',
  },
  {
    id: '16',
    title: 'Фольклорний фестиваль',
    description: 'Великоберезнянський район, 2 серпня.',
    price: '70 грн',
    image: 'https://newch.tv/wp-content/uploads/2019/08/201908_poliske_kolo.jpg',
  },
  {
    id: '17',
    title: 'Художня виставка',
    description: 'Центр сучасного мистецтва, 29 червня.',
    price: '50 грн',
    image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
  },
];

const translations = {
  uk: {
    events: 'Події',
    edit: 'Редагування',
    settings: 'Налаштування',
    posts: 'Пости',
    login: 'Вхід у додаток',
    username: "Ім'я користувача",
    password: 'Пароль',
    loginButton: 'Увійти',
    testUsers: 'Тестові користувачі',
    loginError: 'Невірне ім\'я користувача або пароль',
    loginErrorAlert: 'Помилка авторизації',
    eventList: 'Список подій',
    backFromDetails: 'Вийти з деталей',
    moreDetails: 'Детальніше',
    date: 'Дата',
    price: 'Вартість',
    currentUser: 'Поточний користувач',
    guest: 'Гість',
    darkTheme: 'Темна тема',
    textSize: 'Розмір тексту',
    small: 'Малий',
    medium: 'Середній',
    large: 'Великий',
    showEventDate: 'Показувати дату події',
    logout: 'Вийти',
    add: 'Додати',
    editButton: 'Редагувати',
    delete: 'Видалити',
    eventTitle: 'Назва події',
    eventDescription: 'Опис',
    eventPrice: 'Ціна',
    eventImage: 'URL зображення',
    errorFillFields: 'Будь ласка, заповніть усі поля',
    error: 'Помилка',
    language: 'Мова',
    ukrainian: 'Українська',
    english: 'Англійська',
    postsList: 'Список постів',
    loading: 'Завантаження...',
    errorLoading: 'Помилка завантаження постів',
    addToCalendar: 'Додати до календаря',
    calendarEventAdded: 'Подію додано до календаря!',
    calendarError: 'Помилка при роботі з календарем',
    usernameError: "Ім'я користувача не може бути порожнім",
    passwordError: 'Пароль не може бути порожнім',
    calendarPermissionDenied: 'Дозвіл на доступ до календаря не надано',
    noCalendarFound: 'Не знайдено доступного календаря',
    dateNotSpecified: 'Дата не вказана',
  },
  en: {
    events: 'Events',
    edit: 'Edit',
    settings: 'Settings',
    posts: 'Posts',
    login: 'Login to the app',
    username: 'Username',
    password: 'Password',
    loginButton: 'Login',
    testUsers: 'Test users',
    loginError: 'Invalid username or password',
    loginErrorAlert: 'Authentication Error',
    eventList: 'Event List',
    backFromDetails: 'Back from Details',
    moreDetails: 'More Details',
    date: 'Date',
    price: 'Price',
    currentUser: 'Current User',
    guest: 'Guest',
    darkTheme: 'Dark Theme',
    textSize: 'Text Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    showEventDate: 'Show Event Date',
    logout: 'Logout',
    add: 'Add',
    editButton: 'Edit',
    delete: 'Delete',
    eventTitle: 'Event Title',
    eventDescription: 'Description',
    eventPrice: 'Price',
    eventImage: 'Image URL',
    errorFillFields: 'Please fill in all fields',
    error: 'Error',
    language: 'Language',
    ukrainian: 'Ukrainian',
    english: 'English',
    postsList: 'List of Posts',
    loading: 'Loading...',
    errorLoading: 'Error loading posts',
    addToCalendar: 'Add to Calendar',
    calendarEventAdded: 'Event added to calendar!',
    calendarError: 'Error accessing calendar',
    usernameError: 'Username cannot be empty',
    passwordError: 'Password cannot be empty',
    calendarPermissionDenied: 'Calendar access permission not granted',
    noCalendarFound: 'No available calendar found',
    dateNotSpecified: 'Date not specified',
  },
};

const MainTabs = ({ darkTheme, setDarkTheme, fontSize, setFontSize, showDate, setShowDate, language, setLanguage }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Events') iconName = 'event';
          else if (route.name === 'Edit') iconName = 'edit';
          else if (route.name === 'Settings') iconName = 'settings';
          else if (route.name === 'Posts') iconName = 'article';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: darkTheme ? styles.tabBarDark : styles.tabBarLight,
        tabBarActiveTintColor: darkTheme ? '#d4af37' : '#8B4513',
        tabBarInactiveTintColor: darkTheme ? '#aaa' : '#888',
        headerStyle: darkTheme ? styles.headerDark : styles.headerLight,
        headerTintColor: darkTheme ? '#d4af37' : '#5d4037',
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === 'Events') label = translations[language].events;
          else if (route.name === 'Edit') label = translations[language].edit;
          else if (route.name === 'Settings') label = translations[language].settings;
          else if (route.name === 'Posts') label = translations[language].posts;
          return (
            <Text style={{ color: focused ? (darkTheme ? '#d4af37' : '#8B4513') : (darkTheme ? '#aaa' : '#888'), fontSize: 12 }}>
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Events">
        {(props) => <EventsScreen {...props} events={eventsData} fontSize={fontSize} showDate={showDate} darkTheme={darkTheme} language={language} />}
      </Tab.Screen>
      <Tab.Screen name="Edit">
        {() => (
          <EditEventScreen
            events={eventsData}
            fontSize={fontSize}
            darkTheme={darkTheme}
            language={language}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => (
          <SettingsScreen
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            showDate={showDate}
            setShowDate={setShowDate}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Posts">
        {() => (
          <PostsScreen
            events={eventsData}
            darkTheme={darkTheme}
            language={language}
            translations={translations}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showDate, setShowDate] = useState(true);
  const [language, setLanguage] = useState('uk');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser }}>
        <LanguageContext.Provider value={{ language, setLanguage, translations }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: darkTheme ? styles.headerDark : styles.headerLight,
                headerTintColor: darkTheme ? '#d4af37' : '#5d4037',
              }}
            >
              {user ? (
                <>
                  <Stack.Screen
                    name="Main"
                    component={() => (
                      <MainTabs
                        darkTheme={darkTheme}
                        setDarkTheme={setDarkTheme}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        showDate={showDate}
                        setShowDate={setShowDate}
                        language={language}
                        setLanguage={setLanguage}
                      />
                    )}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PostDetails"
                    component={PostDetailsScreen}
                    options={{ title: translations[language].posts }}
                    initialParams={{ darkTheme }}
                  />
                </>
              ) : (
                <Stack.Screen
                  name="Auth"
                  component={() => <AuthScreen darkTheme={darkTheme} language={language} />}
                  options={{ title: translations[language].login }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  headerLight: {
    backgroundColor: '#d6c9b8',
  },
  headerDark: {
    backgroundColor: '#254832',
  },
  tabBarLight: {
    backgroundColor: '#d6c9b8',
  },
  tabBarDark: {
    backgroundColor: '#254832',
  },
});