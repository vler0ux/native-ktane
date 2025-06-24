import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <View style={styles.logoWrapper}>
            <Image
              source={require('@/assets/images/bomb2.jpeg')}
              style={styles.reactLogo}
            />
          </View>
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Désamorce la bombe</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.introContainer}>
          <ThemedText>Sélectionne les couleurs dans l'ordre d'apparition des fils.</ThemedText>
          <ThemedText>Tu peux en sélectionner 3 maximum.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.colorContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  reactLogo: {
    height: 230,
    width: 170,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  introContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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
  stepContainer: {
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
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
