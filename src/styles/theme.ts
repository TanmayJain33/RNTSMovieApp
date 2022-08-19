/* eslint-disable prettier/prettier */
import {createTheme} from '@shopify/restyle';

const palette = {
  white: '#FFF',
  black: '#000',
  grey: '#333',
  lightGrey: '#999',
  baseColor: '#151C26',
  gold: '#F4C10F',
  red: '#F13939',
};

const theme = createTheme({
  colors: {
    whiteColor: palette.white,
    darkColor: palette.black,
    primary: palette.baseColor,
    secondary: palette.gold,
    greyColor: palette.grey,
    lightGreyColor: palette.lightGrey,
    ratingColor: palette.red,
    whiteText: palette.white,
  },
  spacing: {
    '-ml': -20,
    '-xl': -40,
    '-xxl': -45,
    none: 0,
    xxs: 3,
    xs: 5,
    s: 8,
    sm: 10,
    m: 16,
    ml: 20,
    l: 24,
    xl: 40,
    xxl: 60,
    lxx: 70,
    CL: 150,
  },
  textVariants: {
    mainHeading: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 40,
      color: 'whiteText',
    },
    subHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'whiteText',
    },
    headingSmall: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'whiteText',
    },
    title_normal: {
      textAlign: 'center',
      fontSize: 14,
      color: 'whiteText',
    },
    title_sm: {
      fontSize: 12,
      color: 'whiteText',
      textAlign: 'center',
    },
    title_imdb: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'darkColor',
      textAlign: 'center',
    },
    text_normal: {
      textAlign: 'justify',
      fontSize: 15,
      color: 'whiteText',
    },
    text_normal_special: {
      color: 'secondary',
      fontSize: 14,
      fontWeight: 'bold',
    },
    genre: {
      color: 'whiteText',
      fontSize: 16,
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;

const lightTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: palette.white,
    whiteText: palette.baseColor,
    whiteColor: palette.baseColor,
  },
};

export default theme;
export {lightTheme};
