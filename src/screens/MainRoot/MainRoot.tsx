import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import FavoriteScreen from '../Favorite/FavoriteScreen';
import SettingScreen from '../Setting/SettingScreen';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';

const Tab = createBottomTabNavigator();

export default function MainRoot() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginBottom: theme.spacing.xxs,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon title="home" size={theme.spacing.ml} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
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
