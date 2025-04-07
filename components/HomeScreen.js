import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const quotes = [
  "Believe in yourself and all that you are.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
];

const HomeScreen = ({ navigation }) => {
  const [quote, setQuote] = useState(quotes[0]);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const saveToFavorites = async () => {
    try {
      let storedQuotes = await AsyncStorage.getItem('favorites');
      storedQuotes = storedQuotes ? JSON.parse(storedQuotes) : [];
      storedQuotes.push(quote);
      await AsyncStorage.setItem('favorites', JSON.stringify(storedQuotes));
      alert("Quote saved!");
    } catch (error) {
      console.error("Error saving quote", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote}</Text>
      <Button title="Next Quote" onPress={getNewQuote} />
      <Button title="Save to Favorites" onPress={saveToFavorites} />
      <Button title="View Favorites" onPress={() => navigation.navigate('Favorites')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
