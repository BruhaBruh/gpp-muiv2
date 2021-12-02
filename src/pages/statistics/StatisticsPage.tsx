import { Box } from "@mui/material";
import React from "react";
import SiteOnlineStatisticts from "../../components/statistics/SiteOnlineStatisticts";

const StatisticsPage = () => {
  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(288px, 1fr))",
      }}
    >
      <SiteOnlineStatisticts />
    </Box>
  );
};

export default StatisticsPage;
