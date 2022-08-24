import React, {FC} from 'react';
import {ActivityIndicator} from 'react-native';
import theme from '../../styles/theme';
import {useSelector} from 'react-redux';

export const Loader: FC = () => {
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);
  return (
    <ActivityIndicator
      size="large"
      color={
        ThemeReducer.theme === true
          ? theme.colors.whiteColor
          : theme.colors.primary
      }
    />
  );
};
