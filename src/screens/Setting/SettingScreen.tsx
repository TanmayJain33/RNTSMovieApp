import React, {useEffect, useState} from 'react';
import {Alert, Pressable, Switch} from 'react-native';
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
import {useTranslation} from 'react-i18next';

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'fr', label: 'Français'},
  {code: 'hi', label: 'हिन्दी'},
];

export default function SettingScreen() {
  const dispatch: any = useDispatch();
  const ThemeReducer = useSelector(({themeReducer}: any) => themeReducer);
  const {userDetails} = useSelector((state: any) => state.settingReducer);
  const [isEnabled, setIsEnabled] = useState(true);

  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: any) => {
    return i18n.changeLanguage(code);
  };

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
      config: {
        display: {
          language: i18n.language === 'hi' ? 'hi' : 'en',
        },
      },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        Alert.alert(`${t('common:success_text')}: ${data.razorpay_payment_id}`);
      })
      .catch((error: any) => {
        Alert.alert(
          `${t('common:failure_text')}: ${error.code}: ${error.description}`,
        );
      });
  }

  return (
    <Box bg="primary" flex={1}>
      <Header
        title={t('common:settings_title')}
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
                  {t('common:app_theme_title')}
                </Text>
                <Text textAlign="left" variant="title_sm">
                  {isEnabled
                    ? `${t('common:dark_theme')}`
                    : `${t('common:light_theme')}`}
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
            <Box mt="l" mx="m">
              <Text textAlign="left" variant="headingSmall">
                {t('common:app_language_title')}
              </Text>
              <Box mt="m" flexDirection="row" justifyContent="space-around">
                {LANGUAGES.map(language => {
                  const selectedLanguage =
                    language.code === selectedLanguageCode;
                  return (
                    <Box
                      bg={
                        selectedLanguage
                          ? isEnabled
                            ? 'ratingColor'
                            : 'secondary'
                          : 'lightGreyColor'
                      }
                      p="s"
                      borderRadius={100}>
                      <Pressable
                        key={language.code}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}>
                        <Text variant="text_normal">{language.label}</Text>
                      </Pressable>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box my="m">
            <Text
              variant="headingSmall"
              textAlign="center"
              color="secondary"
              onPress={completePayment}>
              {t('common:support_me_title')}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
