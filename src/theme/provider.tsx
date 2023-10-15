import useLocalStorage from "@dashboard/hooks/useLocalStorage";
import {
  defaultThemeOverrides,
  paletteOverrides,
  RtlThemeOverrides,
} from "@dashboard/themeOverrides";
import { ThemeProvider as LegacyThemeProvider } from "@saleor/macaw-ui";
import {
  DefaultTheme,
  ThemeProvider as MacawThemeProvider,
} from "@saleor/macaw-ui/next";
import React from "react";

import { defaultDirection, defaultTheme, localStorageKey } from "./consts";
import useCurrentDir from "./useCurrentDir";

export const ThemeProvider: React.FC = ({ children }) => {
  const [activeTheme] = useLocalStorage<DefaultTheme>(
    localStorageKey,
    defaultTheme,
  );

  const dir = useCurrentDir();

  const overrides =
    dir === defaultDirection ? defaultThemeOverrides : RtlThemeOverrides;

  return (
    <LegacyThemeProvider overrides={overrides} palettes={paletteOverrides}>
      <MacawThemeProvider defaultTheme={activeTheme}>
        {children}
      </MacawThemeProvider>
    </LegacyThemeProvider>
  );
};
