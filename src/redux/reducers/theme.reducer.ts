import {DARK_THEME, LIGHT_THEME} from '../constants';

const initialState = {
  theme: true,
};

export default (theme = initialState, {type}: any) => {
  switch (type) {
    case DARK_THEME:
      return {theme: true};
    case LIGHT_THEME:
      return {theme: false};
    default:
      return theme;
  }
};
