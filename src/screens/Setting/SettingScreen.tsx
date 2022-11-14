import React, {useEffect, useState} from 'react';
import {Alert, Switch} from 'react-native';
import Box from '../../atoms/Box/Box';
import * as themeActions from '../../redux/actions/theme.action';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../atoms/Header/Header';
import {Loader} from '../../atoms/Loader/Loader';
import theme from '../../styles/theme';
import {Icon} from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import {getUserDetails} from '../../redux/actions/setting.action';
import RazorpayCheckout from 'react-native-razorpay';

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

  function completePayment() {
    var options: any = {
      description: 'Support Me',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_NGfVTKmUH2Jz0s', //use your own generated key
      amount: '5000',
      name: 'RNTSMovieApp',
      // order_id: 'order_DslnoIgkIDL8Zt', //replace this with order_id created using Orders API
      prefill: {
        email: 'sample@example.com',
        contact: '9191919191',
        name: 'Sample',
      },
      theme: {color: '#151C26'},
      method: {
        netbanking: true,
        card: true,
        wallet: true,
        upi: true,
        paylater: true,
      },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error: any) => {
        Alert.alert(`Error: ${error.code}: ${error.description}`);
      });
  }

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
        <Box mx="m" justifyContent="space-between" flex={1}>
          <Box>
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
          <Box my="m">
            <Text
              variant="headingSmall"
              textAlign="center"
              color="secondary"
              onPress={completePayment}>
              Support Me
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
