import { Drawer as MUIDrawer, DrawerProps, useMediaQuery } from "@mui/material";
import React from "react";

const Drawer: React.FC<DrawerProps> = ({ sx, ...props }) => {
  const lower = useMediaQuery("(max-width: 900px)");

  return (
    <MUIDrawer
      {...props}
      anchor={"bottom"}
      sx={{
        ...sx,
        margin: "0 auto",
        "& .MuiPaper-root": {
          background: (theme) => theme.palette.background.paper,
          overflow: "hidden",
          borderRadius: (theme) => theme.spacing(2),
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          padding: (theme) => theme.spacing(1),
          marginLeft: (theme) => (lower ? theme.spacing(1) : "auto"),
          marginRight: (theme) => (lower ? theme.spacing(1) : "auto"),
          maxWidth: (theme) => theme.breakpoints.values.md,
        },
      }}
    />
  );
};

export default Drawer;
