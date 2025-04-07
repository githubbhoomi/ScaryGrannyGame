import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let storedQuotes = await AsyncStorage.getItem('favorites');
        setFavorites(storedQuotes ? JSON.parse(storedQuotes) : []);
      } catch (error) {
        console.error("Error loading favorites", error);
      }
    };
    fetchFavorites();
  }, []);

  const clearFavorites = async () => {
    await AsyncStorage.removeItem('favorites');
    setFavorites([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Quotes</Text>
      <ScrollView>
        {favorites.length > 0 ? (
          favorites.map((quote, index) => (
            <Text key={index} style={styles.quote}>{quote}</Text>
          ))
        ) : (
          <Text>No saved quotes yet.</Text>
        )}
      </ScrollView>
      <Button title="Clear Favorites" onPress={clearFavorites} />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default FavoritesScreen;
