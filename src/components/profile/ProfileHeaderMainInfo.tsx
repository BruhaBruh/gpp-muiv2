import { Typography, useMediaQuery } from "@mui/material";
import { Box, Theme } from "@mui/system";
import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { getLastOnline } from "../../redux/userData/types";
import ProfileHeaderButtons from "./ProfileHeaderButtons";

interface props {
  updateProfile: () => void;
}

const ProfileHeaderMainInfo: React.FC<props> = ({ updateProfile }) => {
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "min-content min-content 1fr",
      }}
    >
      <Typography
        variant={isMobile ? "body1" : "h6"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "baseline",
          fontWeight: "bold",
          color: (theme: Theme) =>
            currentProfile?.id === "6171b40cc87c467779872271"
              ? theme.palette.success.light
              : undefined,
        }}
      >
        {currentProfile?.nickname}
        <Typography
          variant={isMobile ? "body2" : "subtitle1"}
          component="span"
          sx={{ color: (theme: Theme) => theme.palette.text.disabled }}
        >
          {currentProfile?.lastOnline &&
            getLastOnline(currentProfile?.lastOnline)}
        </Typography>
      </Typography>
      <Typography variant={isMobile ? "body2" : "subtitle1"}>
        {currentProfile?.status}
      </Typography>
      <ProfileHeaderButtons updateProfile={updateProfile} />
    </Box>
  );
};

export default ProfileHeaderMainInfo;
