/* eslint-disable prettier/prettier */
import { createTheme } from '@shopify/restyle';

const palette = {
   white: '#fff',
   black: '#000',
   grey: '#333',
   lightGrey: '#999',
   baseColor: '#151c26',
   gold: '#F4C10F',
};

const theme = createTheme({
   colors: {
      mainBackground: palette.white,
      whiteText: palette.white,
      darkText: palette.black,
      darkColor: palette.black,
      primary: palette.baseColor,
      secondary: palette.gold,
      blackBorder: palette.black,
      activeIconColor: palette.grey,
      inactiveIconColor: palette.lightGrey,
   },
   spacing: {
      xxs: 3,
      xs: 5,
      s: 8,
      sm: 10,
      m: 16,
      ml: 20,
      l: 24,
      xl: 40,
   },
   textVariants: {
      header: {
         fontSize: 24,
         fontWeight: 'bold',
         lineHeight: 40,
         color: 'whiteText',
      },
      body: {
         fontSize: 12,
         lineHeight: 24,
         fontWeight: 'bold',
         color: 'darkText',
      },
      movieTitle: {
         width: 150,
         textAlign: 'center',
         marginTop: 'xs',
         fontSize: 16,
         color: 'darkText',
      },
   },
   border: {
      borderWidth: 1,
      borderRadius: 5,
   },
   iconSize: {
      normal: 22,
   },
   breakpoints: {
      phone: 0,
      tablet: 768,
   },
});

export type Theme = typeof theme;
export default theme;
