import { Box } from "@mui/material";
import React from "react";
import ButtonR, { ButtonRProps } from "./ButtonR";

interface props extends ButtonRProps {
  startIcon?: any;
  endIcon?: any;
}

const CellR: React.FC<props> = ({
  children,
  startIcon,
  endIcon,
  sx,
  to,
  disabled,
  ...props
}) => {
  return (
    <ButtonR
      color="inherit"
      {...(props as any)}
      to={to}
      size="medium"
      disabled={disabled}
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "start",
      }}
    >
      {startIcon && (
        <Box
          component="span"
          sx={{
            marginRight: (theme) => theme.spacing(1),
          }}
        >
          {startIcon}
        </Box>
      )}
      <Box
        sx={{
          color: (theme) =>
            disabled ? theme.palette.text.disabled : theme.palette.text.primary,
          flex: 1,
          display: "flex",
          justifyContent: "start",
        }}
      >
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

export default CellR;
