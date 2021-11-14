import { Stack } from "@mui/material";
import React from "react";
import BoughtTop from "../../components/tops/BoughtTop";
import FriendsTop from "../../components/tops/FriendsTop";
import RatingTop from "../../components/tops/RatingTop";
import SoldTop from "../../components/tops/SoldTop";
import SubscribersTop from "../../components/tops/SubscribersTop";
import ViewsTop from "../../components/tops/ViewsTop";
import StyledTab from "../../components/ui/StyledTab";
import StyledTabs from "../../components/ui/StyledTabs";
import { TopBy } from "../../graphql/graphql";

const TopsPage = () => {
  const [currentTab, setCurrentTab] = React.useState<TopBy>(TopBy.Views);

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
        variant={"scrollable"}
        scrollButtons="auto"
      >
        <StyledTab label="Просмотрам" value={TopBy.Views} />
        <StyledTab label="Друзьям" value={TopBy.Friends} />
        <StyledTab label="Подписчикам" value={TopBy.Subscribers} />
        <StyledTab label="Рейтингу" value={TopBy.Rating} />
        <StyledTab
          label="Проданным товарам/услугам"
          value={TopBy.Soldproducts}
        />
        <StyledTab
          label="Купленным товарам/услугам"
          value={TopBy.Boughtproducts}
        />
      </StyledTabs>
      {currentTab === TopBy.Rating && <RatingTop />}
      {currentTab === TopBy.Soldproducts && <SoldTop />}
      {currentTab === TopBy.Boughtproducts && <BoughtTop />}
      {currentTab === TopBy.Views && <ViewsTop />}
      {currentTab === TopBy.Friends && <FriendsTop />}
      {currentTab === TopBy.Subscribers && <SubscribersTop />}
    </Stack>
  );
};

export default TopsPage;
