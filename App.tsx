import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from '@shopify/restyle';
import theme, {lightTheme} from './src/styles/theme';
import MainRoot from './src/screens/MainRoot/MainRoot';
import MovieDetails from './src/screens/MovieDetails/MovieDetails';
import VideoPlayer from './src/screens/VideoPlayer/VideoPlayer';
import TVDetails from './src/screens/TVDetails/TVDetails';
import {useSelector} from 'react-redux';
import './src/utilities/IMLocalize';

const Stack = createNativeStackNavigator();

export default function App() {
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);

  return (
    <ThemeProvider theme={ThemeReducer.theme ? theme : lightTheme}>
      <SafeAreaView
        style={{
          backgroundColor: ThemeReducer.theme
            ? theme.colors.primary
            : theme.colors.whiteColor,
          ...styles.mainContainer,
        }}>
        <StatusBar
          barStyle={ThemeReducer.theme ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainRoot" component={MainRoot} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="TVDetails" component={TVDetails} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
