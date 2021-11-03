import { Box, Button, ButtonProps } from "@mui/material";
import React from "react";

interface props extends ButtonProps {
  startIcon?: any;
  endIcon?: any;
}

const CellR: React.FC<props> = ({
  children,
  startIcon,
  endIcon,
  sx,
  ...props
}) => {
  return (
    <Button
      color="inherit"
      {...(props as any)}
      size="medium"
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "start",
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
    </Button>
  );
};

export default CellR;
