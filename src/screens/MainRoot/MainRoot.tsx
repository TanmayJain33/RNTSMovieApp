import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import FavoriteScreen from '../Favorite/FavoriteScreen';
import SettingScreen from '../Setting/SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

Ionicons.loadFont().then();
const Tab = createBottomTabNavigator();

export default function MainRoot() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.activeIconColor,
        tabBarInactiveTintColor: theme.colors.inactiveIconColor,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={theme.iconSize.normal} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({color}) => (
            <Ionicons name="heart" color={color} size={theme.iconSize.normal} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Ionicons
              name="settings"
              color={color}
              size={theme.iconSize.normal}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
