import React from 'react';
import {Switch} from 'react-native';
import Box from '../../atoms/Box/Box';
import Text from '../../atoms/Text/Text';
import * as themeActions from '../../redux/actions/theme.action';
import {useDispatch, useSelector} from 'react-redux';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);

  return (
    <Box bg="primary" flex={1} justifyContent="center" alignItems="center">
      <Text variant="text_normal">SettingScreen</Text>
      <Switch
        value={ThemeReducer.theme}
        onValueChange={val => dispatch(themeActions.ToggleTheme(val))}
      />
    </Box>
  );
}
