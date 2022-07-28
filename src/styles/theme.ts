/* eslint-disable prettier/prettier */
import { createTheme } from '@shopify/restyle';

const palette = {
   white: '#fff',
   black: '#000',
   purple: '#5a31f4',
};

const theme = createTheme({
   colors: {
      mainBackground: palette.white,
      darkText: palette.black,
      primary: palette.purple,
      blackBorder: palette.black,
   },
   spacing: {
      s: 8,
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
   breakpoints: {
      phone: 0,
      tablet: 768,
   },
});

export type Theme = typeof theme;
export default theme;
