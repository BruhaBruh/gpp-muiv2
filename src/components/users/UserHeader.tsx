import { Avatar, ListItemText, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { User } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import {
  getImageByRole,
  getLastOnline,
  getUserRoleString,
} from "../../redux/userData/types";

const UserHeader = () => {
  const user = useAppSelector((state) => state.cache.user) as User;

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Stack spacing={1}>
        {user.banner && (
          <LazyLoadImage
            src={user.banner}
            style={{ aspectRatio: "722 / 185", width: "100%" }}
          />
        )}
        <Stack
          spacing={1}
          direction="row"
          sx={{
            padding: (theme) => `${theme.spacing(2)}`,
          }}
        >
          <Avatar
            children={user.nickname.substr(0, 1)}
            src={user.avatar}
            variant="rounded"
            sx={{
              width: 80,
              height: 80,
            }}
          />
          <ListItemText
            primary={
              <Stack spacing={1} direction="row">
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme) =>
                      user.isBanned ? theme.palette.error.main : undefined,
                  }}
                >
                  {user.nickname}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                  alignSelf={"center"}
                >
                  {getLastOnline(user.lastOnline)}
                </Typography>
                {getImageByRole(user.role) !== null && (
                  <LazyLoadImage
                    src={getImageByRole(user.role) as any}
                    alt={user.role ? user.role : undefined}
                    style={{
                      imageRendering: "pixelated",
                      userSelect: "none",
                      display: "inline",
                      alignSelf: "center",
                      marginLeft: "auto",
                    }}
                    draggable={false}
                    height="24px"
                  />
                )}
              </Stack>
            }
            secondary={
              <Stack>
                {user.status && (
                  <Typography variant="body1">{user.status}</Typography>
                )}
                <Typography variant="body1">
                  {getUserRoleString(user.userRole)}
                </Typography>
              </Stack>
            }
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserHeader;
