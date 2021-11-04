import { Tab, TabProps } from "@mui/material";
import React from "react";

const StyledTab: React.FC<TabProps> = ({ sx, ...props }) => {
  return (
    <Tab
      {...props}
      color="inherit"
      disableRipple
      sx={{
        ...sx,
        color: (theme) => `${theme.palette.text.secondary}`,
        borderRadius: (theme) => theme.spacing(1.5),
        zIndex: 1,
        transition: (theme) => theme.transitions.easing.easeInOut,
        "&.Mui-selected": {
          color: (theme) => `${theme.palette.text.primary}`,
        },
      }}
    />
  );
};

export default StyledTab;
