import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/styles/theme';
import MainRoot from './src/screens/MainRoot/MainRoot';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.mainContainer}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainRoot" component={MainRoot} />
          </Stack.Navigator>
        </NavigationContainer>
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
