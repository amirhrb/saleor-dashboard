// @ts-strict-ignore
import { getStatusColor } from "@dashboard/misc";
import { makeStyles, Pill as MacawuiPill, PillProps } from "@saleor/macaw-ui";
import { useTheme, vars } from "@saleor/macaw-ui/next";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles<{
  color: PillProps["color"];
}>(
  {
    pill: {
      borderRadius: "32px",
      border: "none",
      backgroundColor: ({ color }) => `${color} !important`,
    },
  },
  { name: "Pill" },
);

// Main purpose of this component is to override default Pill component
// from macaw-ui to add custom styles
// TODO: migrate to Pill component from new macaw-ui when it will be ready
export const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ color, ...props }, ref) => {
    const { theme: currentTheme } = useTheme();
    const backgroundColor = getStatusColor(color, currentTheme);
    const classes = useStyles({
      color: backgroundColor.startsWith("#")
        ? backgroundColor
        : vars.colors.background[backgroundColor],
    });

    return (
      <MacawuiPill
        {...props}
        ref={ref}
        className={clsx(classes.pill, props.className)}
      />
    );
  },
);

Pill.displayName = "Pill";
