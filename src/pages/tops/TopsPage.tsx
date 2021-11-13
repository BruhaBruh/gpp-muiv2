import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import BoughtTop from "../../components/tops/BoughtTop";
import RatingTop from "../../components/tops/RatingTop";
import SoldTop from "../../components/tops/SoldTop";
import StyledTab from "../../components/ui/StyledTab";
import StyledTabs from "../../components/ui/StyledTabs";
import { TopBy } from "../../graphql/graphql";

const TopsPage = () => {
  const [currentTab, setCurrentTab] = React.useState<TopBy>(TopBy.Rating);
  const isMobile = useMediaQuery("(max-width: 1200px)");

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <StyledTabs
        value={currentTab}
        onChange={(e, v) => setCurrentTab(v)}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
      >
        <StyledTab
          label="Рейтингу"
          value={TopBy.Rating}
          sx={{ width: "100%", maxWidth: "none" }}
        />
        <StyledTab
          label="Проданным товарам/услугам"
          value={TopBy.Soldproducts}
          sx={{ width: "100%", maxWidth: "none" }}
        />
        <StyledTab
          label="Купленным товарам/услугам"
          value={TopBy.Boughtproducts}
          sx={{ width: "100%", maxWidth: "none" }}
        />
      </StyledTabs>
      {currentTab === TopBy.Rating && <RatingTop />}
      {currentTab === TopBy.Soldproducts && <SoldTop />}
      {currentTab === TopBy.Boughtproducts && <BoughtTop />}
    </Stack>
  );
};

export default TopsPage;
