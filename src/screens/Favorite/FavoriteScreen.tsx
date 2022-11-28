import React from 'react';
import Box from '../../atoms/Box/Box';
import {Header} from '../../atoms/Header/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FavMovies from '../FavMovies/FavMovies';
import theme from '../../styles/theme';
import FavTV from '../FavTV/FavTV';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

export default function FavoriteScreen() {
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);
  const {t} = useTranslation();

  return (
    <Box flex={1} bg="primary">
      <Header
        title={t('common:favorites_title')}
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
      />
      <Tab.Navigator
        initialRouteName="FavMovies"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.secondary,
          tabBarStyle: {
            backgroundColor:
              ThemeReducer.theme === true
                ? theme.colors.whiteColor
                : theme.colors.primary,
            borderTopColor: theme.colors.secondary,
            borderTopWidth: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
          },
          tabBarInactiveTintColor: theme.colors.lightGreyColor,
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.secondary,
            height: 3,
          },
        }}>
        <Tab.Screen
          name="FavMovies"
          component={FavMovies}
          options={{
            tabBarLabel: `${t('navigate:favorite_movies_tab_title')}`,
          }}
        />
        <Tab.Screen
          name="FavTV"
          component={FavTV}
          options={{
            tabBarLabel: `${t('navigate:favorite_tv_tab_title')}`,
          }}
        />
      </Tab.Navigator>
    </Box>
  );
}
