/* eslint-disable prettier/prettier */
import { createTheme } from '@shopify/restyle';

const palette = {
   white: '#fff',
   black: '#000',
   grey: '#333',
   lightGrey: '#999',
   magentaPrimary: '#e91e63',
};

const theme = createTheme({
   colors: {
      mainBackground: palette.white,
      darkText: palette.black,
      primary: palette.magentaPrimary,
      blackBorder: palette.black,
      activeIconColor: palette.grey,
      inactiveIconColor: palette.lightGrey,
   },
   spacing: {
      s: 8,
      sm: 10,
      m: 16,
      l: 24,
      xl: 40,
   },
   textVariants: {
      body: {
         fontSize: 16,
         lineHeight: 24,
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
