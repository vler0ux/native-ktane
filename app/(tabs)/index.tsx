import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/bomb2.jpeg')}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenue sur Ktane</Text>
      <Text style={styles.subtitle}>Tu es prêt(e) à désamorcer les consignes? </Text>

      <Pressable style={styles.startButton} onPress={onStart}>
        <Text style={styles.startText}>Commencer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 250,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
