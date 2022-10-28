import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native';
import Box from '../../atoms/Box/Box';
import * as themeActions from '../../redux/actions/theme.action';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../atoms/Header/Header';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import {getUserDetails} from '../../redux/actions/setting.action';

export default function SettingScreen() {
  const dispatch: any = useDispatch();
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);
  const {userDetails} = useSelector((state: any) => state.settingReducer);
  const [isEnabled, setIsEnabled] = useState(true);

  const fetchUserDetails = async () => {
    await dispatch(getUserDetails());
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Box bg="primary" flex={1}>
      <Header
        title="Settings"
        alignItems="center"
        flexDirection="row"
        mb="sm"
        mx="ml"
      />
      {userDetails === undefined ? (
        <Loader />
      ) : (
        <Box mx="m">
          <Box flexDirection="row" alignItems="center">
            <Icon
              title="person-circle"
              size={24}
              color={theme.colors.secondary}
            />
            <Text variant="subHeading" ml="s">
              {userDetails.username}
            </Text>
          </Box>
          <Box
            mt="xl"
            mx="m"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between">
            <Box>
              <Text textAlign="left" variant="headingSmall">
                App Theme
              </Text>
              <Text textAlign="left" variant="title_sm">
                {isEnabled ? 'Dark' : 'Light'}
              </Text>
            </Box>
            <Switch
              value={ThemeReducer.theme}
              trackColor={{
                false: theme.colors.lightGreyColor,
                true: theme.colors.ratingColor,
              }}
              thumbColor={
                isEnabled ? theme.colors.whiteColor : theme.colors.secondary
              }
              onValueChange={val => {
                dispatch(themeActions.ToggleTheme(val));
                setIsEnabled(!isEnabled);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
