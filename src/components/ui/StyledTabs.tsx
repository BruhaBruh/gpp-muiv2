import { lighten, Tabs, TabsProps } from "@mui/material";
import React from "react";

const StyledTabs: React.FC<TabsProps> = ({ sx, ...props }) => {
  return (
    <Tabs
      {...props}
      sx={{
        ...sx,
        background: (theme) =>
          lighten(theme.palette.background.paper, 2 * 0.025),
        borderRadius: (theme) => theme.spacing(1.5),
        "& .MuiTabs-scroller": {
          padding: "4px",
        },
        "& .MuiTabs-indicator": {
          height: "calc(100% - 8px)",
          bottom: "4px",
          borderRadius: (theme) => theme.spacing(1.5),
          background: (theme) =>
            lighten(theme.palette.background.paper, 6 * 0.025),
        },
      }}
    />
  );
};

export default StyledTabs;
