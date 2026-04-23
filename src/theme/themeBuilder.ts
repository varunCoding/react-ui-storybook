import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';

/**
 * Utility to create an MUI Theme directly from a JSON configuration object.
 * This function can be used dynamically when a JSON payload is returned from an endpoint.
 */
export const createThemeFromJson = (themeJson: any): Theme => {
  // We explicitly cast the incoming JSON to ThemeOptions.
  // In a real production app, you might want Zod or another validator here to ensure the endpoint returns valid structures.
  const themeOptions: ThemeOptions = {
    ...themeJson,
  };

  return createTheme(themeOptions);
};
