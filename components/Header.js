import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ea',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;
