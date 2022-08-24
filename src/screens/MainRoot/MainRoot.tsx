import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../Favorite/FavoriteScreen';
import SettingScreen from '../Setting/SettingScreen';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import MoviesScreen from '../MoviesScreen/MoviesScreen';
import TVScreen from '../TVScreen/TVScreen';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

export default function MainRoot() {
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);

  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor:
          ThemeReducer.theme === true
            ? theme.colors.primary
            : theme.colors.whiteColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginBottom: theme.spacing.xxs,
        },
        tabBarStyle: {
          backgroundColor:
            ThemeReducer.theme === true
              ? theme.colors.whiteColor
              : theme.colors.primary,
          borderTopWidth: 3,
          borderTopColor: theme.colors.secondary,
        },
      }}>
      <Tab.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{
          tabBarLabel: 'Movies',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon title="film" size={theme.spacing.ml} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TVScreen"
        component={TVScreen}
        options={{
          tabBarLabel: 'TV',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon title="tv" size={theme.spacing.ml} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <Icon title="heart" size={theme.spacing.ml} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon title="settings" size={theme.spacing.ml} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
