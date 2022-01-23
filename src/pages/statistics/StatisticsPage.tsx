import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import NewPlayerStatisticts from "../../components/statistics/NewPlayerStatisticts";
import ServerOnlineStatisticts from "../../components/statistics/ServerOnlineStatisticts";
import SiteOnlineStatisticts from "../../components/statistics/SiteOnlineStatisticts";

const StatisticsPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
        display: "grid",
        gridTemplateColumns: matches
          ? "repeat(auto-fit, minmax(400px, 1fr))"
          : "repeat(auto-fit, minmax(288px, 1fr))",
        gap: (theme) => theme.spacing(1),
      }}
    >
      <SiteOnlineStatisticts />
      <ServerOnlineStatisticts />
      <NewPlayerStatisticts />
    </Box>
  );
};

export default StatisticsPage;
