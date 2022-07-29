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
      darkColor: palette.black,
      primary: palette.magentaPrimary,
      blackBorder: palette.black,
      activeIconColor: palette.grey,
      inactiveIconColor: palette.lightGrey,
   },
   spacing: {
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
         color: 'darkText',
      },
      body: {
         fontSize: 16,
         lineHeight: 24,
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
