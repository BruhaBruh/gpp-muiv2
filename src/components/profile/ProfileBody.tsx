import { useQuery } from "@apollo/client";
import { Paper, Stack, Theme, useMediaQuery } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import { ProductSearchResult, ProductSort } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import StyledTab from "../ui/StyledTab";
import StyledTabs from "../ui/StyledTabs";
import ProfileBodyDescription from "./ProfileBodyDescription";
import ProfileBodyInfo from "./ProfileBodyInfo";
import ProfileBodyProducts from "./ProfileBodyProducts";
import ProfileBodySettings from "./ProfileBodySettings";

interface props {
  updateProfile: () => void;
}
enum tabs {
  products,
  services,
  info,
  description,
  settings,
}

const ProfileBody: React.FC<props> = ({ updateProfile }) => {
  const [currentTab, setCurrentTab] = React.useState<tabs | string>(tabs.info);
  const serverId = useAppSelector((state) => state.userData.serverId);
  const profileId = useAppSelector((state) => state.userData.profileId);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { id } = useParams<{ id: string }>();
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );

  const { data: profileProducts } = useQuery<{
    products: ProductSearchResult;
  }>(
    gql`
      query products(
        $page: Int
        $limit: Int
        $search: String
        $server: ObjectID!
        $category: ObjectID
        $icon: ObjectID
        $sort: ProductSort
      ) {
        products(
          server: $server
          search: $search
          category: $category
          icon: $icon
          sort: $sort
          limit: $limit
          page: $page
        ) {
          result {
            id
            description
            cost
            createdAt
            isHighlighted
            amount
            icon {
              name
              image
              category {
                name
                color
              }
            }
            owner {
              id
              avatar
              nickname
              lastOnline
              user {
                permissions
              }
            }
          }
          hasMore
        }
      }
    `,
    {
      variables: {
        page: 1,
        limit: 25,
        server: serverId,
        sort: ProductSort.Default,
        search: id,
      },
    }
  );

  const { data: profileServices } = useQuery<{ services: ProductSearchResult }>(
    gql`
      query services(
        $page: Int
        $limit: Int
        $search: String
        $server: ObjectID!
        $icon: ObjectID
        $sort: ProductSort
      ) {
        services(
          server: $server
          search: $search
          icon: $icon
          sort: $sort
          limit: $limit
          page: $page
        ) {
          result {
            id
            description
            cost
            createdAt
            isHighlighted
            amount
            icon {
              name
              image
              category {
                name
                color
              }
            }
            owner {
              id
              avatar
              nickname
              lastOnline
              user {
                permissions
              }
            }
          }
          hasMore
        }
      }
    `,
    {
      variables: {
        page: 1,
        limit: 25,
        server: serverId,
        sort: ProductSort.Default,
        search: id,
      },
    }
  );

  return (
    <Paper
      sx={{
        padding: (theme: Theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={2}>
        <StyledTabs
          value={currentTab}
          onChange={(e, v) => setCurrentTab(v)}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
        >
          {profileProducts && !!profileProducts.products.result.length && (
            <StyledTab
              label="Товары"
              value={tabs.products}
              sx={{ width: "100%", maxWidth: "none" }}
            />
          )}
          {profileServices && !!profileServices.services.result.length && (
            <StyledTab
              label="Услуги"
              value={tabs.services}
              sx={{ width: "100%", maxWidth: "none" }}
            />
          )}
          <StyledTab
            label="Информация"
            value={tabs.info}
            sx={{ width: "100%", maxWidth: "none" }}
          />
          {!!currentProfile?.description && (
            <StyledTab
              label="Описание"
              value={tabs.description}
              sx={{ width: "100%", maxWidth: "none" }}
            />
          )}
          {profileId === id && (
            <StyledTab
              label="Настройки"
              value={tabs.settings}
              sx={{ width: "100%", maxWidth: "none" }}
            />
          )}
        </StyledTabs>
        {profileProducts && currentTab === tabs.products && (
          <ProfileBodyProducts products={profileProducts.products.result} />
        )}
        {profileServices && currentTab === tabs.services && (
          <ProfileBodyProducts products={profileServices.services.result} />
        )}
        {currentTab === tabs.info && (
          <ProfileBodyInfo updateProfile={updateProfile} />
        )}
        {currentTab === tabs.settings && (
          <ProfileBodySettings updateProfile={updateProfile} />
        )}
        {currentTab === tabs.description && currentProfile && (
          <ProfileBodyDescription text={currentProfile.description} />
        )}
      </Stack>
    </Paper>
  );
};

export default ProfileBody;
