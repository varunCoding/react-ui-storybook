import type { Preview } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { createThemeFromJson } from '../src/theme/themeBuilder';

// Import JSON configurations
import defaultThemeJson from '../src/themes/default.json';
import acmeThemeJson from '../src/themes/acme.json';
import globexThemeJson from '../src/themes/globex.json';

// Build the themes dynamically
const defaultTheme = createThemeFromJson(defaultThemeJson);
const acmeTheme = createThemeFromJson(acmeThemeJson);
const globexTheme = createThemeFromJson(globexThemeJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        default: defaultTheme,
        acme: acmeTheme,
        globex: globexTheme,
      },
      defaultTheme: 'default',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;