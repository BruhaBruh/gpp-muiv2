import { Stack } from "@mui/material";
import React from "react";
import DonateHeader from "../../components/donate/DonateHeader";
import DonateList from "../../components/donate/DonateList";

const DonatePage = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <DonateHeader />
      <DonateList />
    </Stack>
  );
};

export default DonatePage;
