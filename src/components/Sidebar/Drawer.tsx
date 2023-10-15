import { RIGHT_TO_LEFT } from "@dashboard/theme/consts";
import useCurrentDir from "@dashboard/theme/useCurrentDir";
import Drawer from "@material-ui/core/Drawer";
import { Box, MenuIcon } from "@saleor/macaw-ui/next";
import React, { useState } from "react";

import { SidebarContent } from "./Content";

const DrawerComponent = () => {
  const dir = useCurrentDir();
  const [open, setOpen] = useState(false);
  const anchor = dir === RIGHT_TO_LEFT ? "right" : "left";
  const toggleDrawer = (open: boolean) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <Box
        onClick={toggleDrawer(true)}
        as="button"
        borderWidth={0}
        backgroundColor="interactiveNeutralHighlightDefault"
        cursor="pointer"
        data-test-id="sidebar-drawer-open"
      >
        <MenuIcon />
      </Box>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
        <SidebarContent />
      </Drawer>
    </>
    // <Drawer>
    //   <Drawer.Trigger>
    //     <Box
    //       as="button"
    //       borderWidth={0}
    //       backgroundColor="interactiveNeutralHighlightDefault"
    //       cursor="pointer"
    //       data-test-id="sidebar-drawer-open"
    //     >
    //       <MenuIcon />
    //     </Box>
    //   </Drawer.Trigger>
    //   <Drawer.Content
    //     right={dir === "rtl" && 0}
    //     __width={dir === "rtl" && 240}
    //     backgroundColor="subdued"
    //     data-test-id="sidebar-drawer-content"
    //     paddingTop={0}
    //   >
    //     <SidebarContent />
    //   </Drawer.Content>
    // </Drawer>
  );
};

export default DrawerComponent;
