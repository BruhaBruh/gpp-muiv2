import { Box } from "@mui/material";
import React from "react";
import { donateItems } from "../../donate/items";
import DonateCard from "./DonateCard";
import DonateCardLite from "./DonateCardLite";
import DonateCardPremium from "./DonateCardPremium";

const DonateList = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))",
        gap: (theme) => theme.spacing(2),
      }}
    >
      <DonateCardLite />
      <DonateCardPremium />
      {donateItems.slice(10).map((item) => (
        <DonateCard item={item} key={item.type} />
      ))}
    </Box>
  );
};

export default DonateList;
