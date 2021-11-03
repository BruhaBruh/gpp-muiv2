import { Box } from "@mui/material";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import ButtonR, { ButtonRProps } from "../ButtonR";

interface props extends ButtonRProps {
  startIcon?: any;
  endIcon?: any;
}

const SidebarCell: React.FC<props> = ({
  children,
  startIcon,
  endIcon,
  sx,
  to,
  ...props
}) => {
  const match = useRouteMatch(to);

  return (
    <ButtonR
      color="inherit"
      {...(props as any)}
      to={to}
      size="medium"
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "start",
        background: (theme) => (match ? theme.palette.action.hover : undefined),
      }}
    >
      {startIcon && (
        <Box component="span" sx={{ marginRight: (theme) => theme.spacing(1) }}>
          {startIcon}
        </Box>
      )}
      <Box sx={{ color: (theme) => theme.palette.text.primary, flex: 1 }}>
        {children}
      </Box>
      {endIcon && (
        <Box
          component="span"
          sx={{
            marginLeft: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.info.main,
          }}
        >
          {endIcon}
        </Box>
      )}
    </ButtonR>
  );
};

export default SidebarCell;
