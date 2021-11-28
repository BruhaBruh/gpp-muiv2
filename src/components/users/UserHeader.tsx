import {
  Avatar,
  Box,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Icon12Circle,
  Icon12CircleOutline,
  Icon24CrownOutline,
  Icon28UserStarBadgeOutline,
} from "@vkontakte/icons";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { User, UserRoleEnum } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import {
  checkPermissionsWA,
  getImageByRole,
  getLastOnline,
  getUserRoleString,
  Permissions,
} from "../../redux/userData/types";
import IconWrapper from "../ui/IconWrapper";
import LinkR from "../ui/LinkR";

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
              <Stack spacing={0.5} direction="row">
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme) =>
                      user.isBanned ? theme.palette.error.main : undefined,
                  }}
                >
                  {user.nickname}
                </Typography>
                {user.userRole !== UserRoleEnum.None && (
                  <Tooltip
                    title={`Персонал (${getUserRoleString(user.userRole)})`}
                    placement="top"
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <IconWrapper
                        sx={{
                          color: (theme) => theme.palette.info.main,
                          alignSelf: "center",
                        }}
                        size={24}
                      >
                        <Icon28UserStarBadgeOutline />
                      </IconWrapper>
                    </Box>
                  </Tooltip>
                )}
                {checkPermissionsWA(Permissions.Premium, user.permissions) && (
                  <Tooltip title={`Premium`} placement="top">
                    <Box sx={{ alignSelf: "center" }}>
                      <LinkR to="/d">
                        <IconWrapper
                          sx={{
                            color: process.env.REACT_APP_PREMIUM_COLOR,
                            alignSelf: "center",
                          }}
                          size={24}
                        >
                          <Icon24CrownOutline />
                        </IconWrapper>
                      </LinkR>
                    </Box>
                  </Tooltip>
                )}
                {checkPermissionsWA(Permissions.Lite, user.permissions) && (
                  <Tooltip title={`Lite`} placement="top">
                    <Box sx={{ alignSelf: "center" }}>
                      <LinkR to="/d">
                        <IconWrapper
                          sx={{
                            color: process.env.REACT_APP_LITE_COLOR,
                            alignSelf: "center",
                          }}
                          size={24}
                        >
                          <Icon24CrownOutline />
                        </IconWrapper>
                      </LinkR>
                    </Box>
                  </Tooltip>
                )}
                {getLastOnline(user.lastOnline) === "Онлайн" && (
                  <Tooltip
                    title={getLastOnline(user.lastOnline)}
                    placement="top"
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <IconWrapper
                        sx={{
                          color: (theme) => theme.palette.success.main,
                          alignSelf: "center",
                        }}
                        size={12}
                      >
                        <Icon12Circle />
                      </IconWrapper>
                    </Box>
                  </Tooltip>
                )}
                {getLastOnline(user.lastOnline) !== "Онлайн" && (
                  <Tooltip
                    title={getLastOnline(user.lastOnline)}
                    placement="top"
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <IconWrapper
                        sx={{
                          color: (theme) => theme.palette.error.main,
                          alignSelf: "center",
                        }}
                        size={12}
                      >
                        <Icon12CircleOutline />
                      </IconWrapper>
                    </Box>
                  </Tooltip>
                )}
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
              </Stack>
            }
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserHeader;
