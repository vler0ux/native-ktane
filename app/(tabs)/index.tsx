import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const COLORS = ['white', 'yellow', 'green', 'blue', 'black', 'red'] as const;

export default function HomeScreen() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [validationResult, setValidationResult] = useState<string | null>(null);

 const handlePress = (color: string) => {
  setSelectedColors((prev) => {
    if (prev.length >= 3) return prev; 
    return [...prev, color];
  });
  setValidationResult(null);
};

  const handleReset = () => {
    setSelectedColors([]);
    setValidationResult(null);
  };

  const handleValidate = () => {
    const hasRed = selectedColors.includes('red');
    const blueCount = selectedColors.filter((c) => c === 'blue').length;

    if (!hasRed) {
      setValidationResult('coupe le second fil');
    } else if (blueCount > 1) {
      setValidationResult('coupe le second fil bleu');
    } else {
      setValidationResult('coupe le dernier fil');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bomb2.jpeg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Selectionne les couleurs d'apparition des fils</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.container}>
        {COLORS.map((color) => (
          <Pressable key={color} onPress={() => handlePress(color)}>
            <ThemedView style={[styles.square, styles[color]]} />
          </Pressable>
        ))}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Couleurs sélectionnées :</ThemedText>
        <ThemedText>{selectedColors.join(', ') || 'Aucune'}</ThemedText>

        <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Réinitialiser</Text>
        </Pressable>

          {selectedColors.length === 3 && (
          <Pressable style={styles.validateButton} onPress={handleValidate}>
            <Text style={styles.validateText}>Valider</Text>
          </Pressable>
        )}

        {validationResult && (
          <ThemedText type="subtitle">Résultat : {validationResult}</ThemedText>
        )}


      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-around',
  },
  square: {
    width: 80,
    height: 80,
    margin: 10,
  },
  white: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  green: {
    backgroundColor: 'green',
  },
  blue: {
    backgroundColor: 'blue',
  },
  black: {
    backgroundColor: 'black',
  },
  red: {
  backgroundColor: 'red',
},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  reactLogo: {
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#444',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
   validateButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
   validateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
