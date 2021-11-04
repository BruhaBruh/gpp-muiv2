import { Avatar, Paper, useMediaQuery } from "@mui/material";
import React from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { useAppSelector } from "../../hooks/redux";
import ProfileHeaderMainInfo from "./ProfileHeaderMainInfo";
import ProfileIcons from "./ProfileIcons";

interface props {
  updateProfile: () => void;
}

const ProfileHeader: React.FC<props> = ({ updateProfile }) => {
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );
  const isMobile = useMediaQuery("(max-width: 600px)");

  return currentProfile ? (
    <Paper sx={{ overflow: "hidden" }}>
      {!!currentProfile.banner && (
        <LazyLoadImage
          src={currentProfile.banner}
          style={{ aspectRatio: "722 / 185", width: "100%" }}
        />
      )}
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
          display: "grid",
          gridTemplateColumns: "min-content 1fr min-content",
          gap: (theme) => theme.spacing(2),
          height: "min-content",
          minHeight: (theme) => `calc(90px-${theme.spacing(4)})`,
        }}
      >
        <LazyLoadComponent>
          <Avatar
            variant="rounded"
            src={currentProfile.avatar}
            children={currentProfile.nickname.substring(0, 2)}
            sx={{
              height: isMobile ? 64 : 128,
              width: isMobile ? 64 : 128,
              backgroundColor: "#00000000",
            }}
          />
        </LazyLoadComponent>
        <ProfileHeaderMainInfo updateProfile={updateProfile} />
        <ProfileIcons height={isMobile ? 64 : 128} />
      </Paper>
    </Paper>
  ) : (
    <></>
  );
};

export default ProfileHeader;
