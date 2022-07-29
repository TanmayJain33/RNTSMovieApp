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
        tabBarActiveTintColor: theme.colors.activeIconColor,
        tabBarInactiveTintColor: theme.colors.inactiveIconColor,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon title="home" size={theme.iconSize.normal} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({color}) => (
            <Icon title="heart" size={theme.iconSize.normal} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon title="settings" size={theme.iconSize.normal} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
