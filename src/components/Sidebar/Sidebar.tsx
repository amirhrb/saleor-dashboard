import { ThemeProvider } from "@dashboard/theme/provider";
import { Box } from "@saleor/macaw-ui/next";
import React from "react";

import { LocaleProvider } from "../Locale";
import { SidebarContent } from "./Content";
import DrawerComponent from "./Drawer";

export const Sidebar = () => {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <Box
          display={{ mobile: "none", tablet: "none", desktop: "block" }}
          height="100%"
        >
          <SidebarContent />
        </Box>
        <Box display={{ mobile: "block", tablet: "block", desktop: "none" }}>
          <DrawerComponent />
        </Box>
      </ThemeProvider>
    </LocaleProvider>
  );
};
