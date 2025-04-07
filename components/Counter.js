import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count: {count}</Text>
      <Button title="Increase" onPress={() => setCount(count + 1)} color="#6200ea" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Counter;
