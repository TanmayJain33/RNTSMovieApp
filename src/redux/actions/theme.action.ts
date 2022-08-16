import {DARK_THEME, LIGHT_THEME} from '../constants';

export const ToggleDarkTheme = () => ({
  type: DARK_THEME,
});

export const ToggleLightTheme = () => ({
  type: LIGHT_THEME,
});

export const ToggleTheme = (theme: any) => {
  return async (dispatch: any) => {
    if (theme === true) {
      dispatch(ToggleDarkTheme());
    } else {
      dispatch(ToggleLightTheme());
    }
  };
};
