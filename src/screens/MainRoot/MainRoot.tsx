import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../Favorite/FavoriteScreen';
import SettingScreen from '../Setting/SettingScreen';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import MoviesScreen from '../MoviesScreen/MoviesScreen';
import TVScreen from '../TVScreen/TVScreen';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function MainRoot() {
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);
  const {t} = useTranslation();

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
          tabBarLabel: `${t('navigate:movies_tab_title')}`,
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
          tabBarLabel: `${t('navigate:tv_tab_title')}`,
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
          tabBarLabel: `${t('navigate:favorite_tab_title')}`,
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
          tabBarLabel: `${t('navigate:setting_tab_title')}`,
          tabBarIcon: ({color}) => (
            <Icon title="settings" size={theme.spacing.ml} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
