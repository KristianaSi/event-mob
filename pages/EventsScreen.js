// EventsScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const events = [
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSieCKGENcQFlQpx_NmCTN2-lPuJGo0dW6rBQ&s',
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
  {
    id: '18',
    title: 'Літературний вечір',
    description: 'Книгарня «Є», 6 червня.',
    price: '60 грн',
    image: 'https://vgorode.ua/img/article/6605/77_main-v1577304026.jpghttps://cdn4.suspilne.media/images/5a2d71187c2645c7.png',
  },
  {
    id: '19',
    title: 'Туристичний ярмарок',
    description: 'Площа Корятовича, 10 липня.',
    price: 'Безкоштовно',
    image: 'https://tamtour.com.ua/image/686/010/img-4540.jpg',
  },
  {
    id: '20',
    title: 'Гастрономічний фестиваль «Смак Закарпаття»',
    description: 'Берегово, 22 серпня.',
    price: '200 грн',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3BGwNYS4vjwg5bEuAox5lZHTzbVMXkBk1g&s',
  },
];

export default function EventsScreen({ fontSize, darkTheme }) {
  const textSize = fontSize === 'small' ? 14 : fontSize === 'large' ? 20 : 16;
  const containerStyle = darkTheme ? styles.dark : styles.light;

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textWrapper}>
              <Text style={[styles.title, { fontSize: textSize }]}>{item.title}</Text>
              <Text style={[styles.description, { fontSize: textSize - 2 }]}>{item.description}</Text>
              <Text style={[styles.price, { fontSize: textSize - 2 }]}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  light: {
    backgroundColor: '#fef7ec',
  },
  dark: {
    backgroundColor: '#1e3d2f',
  },
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
