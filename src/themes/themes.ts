import { createTheme } from '@nextui-org/react';

export const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {}, // optional
  }
})

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}, // override dark theme colors
  }
});
