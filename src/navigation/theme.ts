import {COLORS} from '@constants/colors';
import {DefaultTheme} from '@react-navigation/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.background,
    text: COLORS.primary,
    border: COLORS.divider,
  },
};
