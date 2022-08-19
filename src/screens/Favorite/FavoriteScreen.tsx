import React from 'react';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FavMovies from '../FavMovies/FavMovies';
import theme from '../../styles/theme';
import FavTV from '../FavTV/FavTV';

const Tab = createMaterialTopTabNavigator();

export default function FavoriteScreen() {
  return (
    <Box flex={1} bg="primary">
      <Header
        title="Favorites"
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
      />
      <Tab.Navigator
        initialRouteName="FavMovies"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.whiteColor,
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
            borderTopColor: theme.colors.secondary,
            borderWidth: 1,
          },
          tabBarInactiveTintColor: theme.colors.lightGreyColor,
          tabBarIndicatorStyle: {backgroundColor: theme.colors.whiteColor},
        }}>
        <Tab.Screen
          name="FavMovies"
          component={FavMovies}
          options={{
            tabBarLabel: 'Favorite Movies',
          }}
        />
        <Tab.Screen
          name="FavTV"
          component={FavTV}
          options={{
            tabBarLabel: 'Favorite TV Shows',
          }}
        />
      </Tab.Navigator>
    </Box>
  );
}
