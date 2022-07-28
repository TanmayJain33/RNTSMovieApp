import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/styles/theme';
import HomeScreen from './src/screens/Home/HomeScreen';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.mainContainer}>
        <HomeScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
  },
});
