import { Box, BoxProps, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/redux";

const PageWrapper: React.FC<BoxProps> = ({ sx, children, ...props }) => {
  const header = useAppSelector((state) => state.ui.header);
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "48px 1fr",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft: (theme) => theme.spacing(2),
          paddingRight: (theme) => theme.spacing(2),
          borderRadius: 0,
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          {header}
        </Typography>
      </Paper>
      <Box sx={{ padding: (theme) => theme.spacing(2), overflow: "hidden" }}>
        {children}
      </Box>
    </Box>
  );
};

export default PageWrapper;
