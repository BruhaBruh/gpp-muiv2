import { Stack } from "@mui/material";
import React from "react";
import DonateHeader from "../../components/donates/DonateHeader";
import DonateList from "../../components/donates/DonateList";
const DonatesPage = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <DonateHeader />
      <DonateList />
    </Stack>
  );
};

export default DonatesPage;
