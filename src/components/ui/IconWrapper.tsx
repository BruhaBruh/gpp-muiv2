import { Box, BoxProps } from "@mui/material";
import React from "react";

interface props extends BoxProps {
  size?: number;
}

const IconWrapper: React.FC<props> = ({ children, sx, size, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        "& .Icon, & svg": {
          width: `${size !== undefined ? size : 24}px !important`,
          height: `${size !== undefined ? size : 24}px !important`,
        },
      }}
    >
      {children}
    </Box>
  );
};

IconWrapper.defaultProps = { size: 24 };

export default IconWrapper;
