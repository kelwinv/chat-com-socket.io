import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AuthRoutes from './src/auth.routes';

import { AuthProvider } from './src/Context/AuthProvider';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AuthRoutes />
        <StatusBar style="auto" />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
