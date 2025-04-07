import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, Image, Animated
} from 'react-native';
import { Audio } from 'expo-av';

const GRID_SIZE = 5;

export default function App() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [grannyPos, setGrannyPos] = useState({ x: 4, y: 4 });
  const [bgMusic, setBgMusic] = useState(null);
  const [flashAnim] = useState(new Animated.Value(0));
  const flashRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      moveGranny();
    }, 1000);
    return () => clearInterval(interval);
  }, [grannyPos, playerPos]);

  useEffect(() => {
    checkCollision();
  }, [playerPos, grannyPos]);

  useEffect(() => {
    playBackgroundMusic();
    return () => stopBackgroundMusic();
  }, []);

  const playBackgroundMusic = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/images/bg-music.mp3'));
    setBgMusic(sound);
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
  };

  const stopBackgroundMusic = async () => {
    if (bgMusic) {
      await bgMusic.stopAsync();
      await bgMusic.unloadAsync();
    }
  };

  const playJumpscare = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/images/jumpscare.mp3'));
    await sound.playAsync();
  };

  const flashScreen = () => {
    flashAnim.setValue(1);
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]).start();
  };

  const checkCollision = () => {
    if (playerPos.x === grannyPos.x && playerPos.y === grannyPos.y) {
      playJumpscare();
      flashScreen();
      Alert.alert("😱 Game Over!", "Granny caught you!", [
        { text: "Restart", onPress: resetGame }
      ]);
    }
  };

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setGrannyPos({ x: 4, y: 4 });
  };

  const movePlayer = (direction) => {
    setPlayerPos((prev) => {
      let { x, y } = prev;
      if (direction === 'up' && y > 0) y--;
      if (direction === 'down' && y < GRID_SIZE - 1) y++;
      if (direction === 'left' && x > 0) x--;
      if (direction === 'right' && x < GRID_SIZE - 1) x++;
      return { x, y };
    });
  };

  const moveGranny = () => {
    let dx = playerPos.x - grannyPos.x;
    let dy = playerPos.y - grannyPos.y;
    let moveX = grannyPos.x + Math.sign(dx);
    let moveY = grannyPos.y + Math.sign(dy);
    if (Math.abs(dx) > Math.abs(dy)) {
      setGrannyPos({ x: moveX, y: grannyPos.y });
    } else {
      setGrannyPos({ x: grannyPos.x, y: moveY });
    }
  };

  const renderGrid = () => {
    const rows = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const cols = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPlayer = playerPos.x === x && playerPos.y === y;
        const isGranny = grannyPos.x === x && grannyPos.y === y;
        cols.push(
          <View key={`${x}-${y}`} style={styles.cell}>
            {isPlayer && <View style={styles.player} />}
            {isGranny && (
              <Image
                source={require('./assets/images/scary-granny.png')}
                style={styles.grannyImage}
              />
            )}
          </View>
        );
      }
      rows.push(<View key={y} style={styles.row}>{cols}</View>);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👻 Ghost Granny House</Text>
      <View style={styles.grid}>{renderGrid()}</View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayer('up')} style={styles.control}><Text>⬆️</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => movePlayer('left')} style={styles.control}><Text>⬅️</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => movePlayer('right')} style={styles.control}><Text>➡️</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => movePlayer('down')} style={styles.control}><Text>⬇️</Text></TouchableOpacity>
      </View>

      <Animated.View
        ref={flashRef}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, {
          backgroundColor: 'red',
          opacity: flashAnim
        }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  grid: { marginVertical: 20 },
  row: { flexDirection: 'row' },
  cell: {
    width: 60, height: 60, borderWidth: 1, borderColor: '#444', backgroundColor: '#111',
    justifyContent: 'center', alignItems: 'center', position: 'relative'
  },
  player: {
    width: 40, height: 40, backgroundColor: 'lime', borderRadius: 5
  },
  grannyImage: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    borderRadius: 5
  },
  controls: { alignItems: 'center', marginTop: 20 },
  control: {
    backgroundColor: '#222', padding: 10, margin: 5, borderRadius: 10
  },
});
