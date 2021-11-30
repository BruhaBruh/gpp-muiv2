import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Badge,
  Box,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Icon16AddCircleOutline,
  Icon20RemoveCircleOutline,
  Icon24CrownOutline,
  Icon28UserStarBadgeOutline,
} from "@vkontakte/icons";
import React from "react";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";
import { User, UserRoleEnum } from "../../graphql/types";
import {
  checkPermissionsWA,
  getLastOnline,
  getUserRoleString,
  Permissions,
} from "../../redux/userData/types";

const RatingsPage = () => {
  const { data, loading } = useQuery<{ me: User }>(gql`
    query myratings {
      me {
        userId
        ratingTos {
          ratingId
          from {
            userId
            discordId
            nickname
            avatar
            userRole
            permissions
            lastOnline
          }
          positive
        }
      }
    }
  `);

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {loading && <LinearProgress />}
      {data?.me.ratingTos && data?.me.ratingTos.length === 0 && (
        <Typography variant="subtitle2">Вам не ставили рейтинг</Typography>
      )}
      {data?.me.ratingTos &&
        data?.me.ratingTos.length !== 0 &&
        data.me.ratingTos
          .map((t) => t)
          .sort((a, b) => Number(b.positive) - Number(a.positive))
          .map((t) => (
            <CellR
              key={t.ratingId}
              to={`/u/${t.from.userId}`}
              sx={{ background: (theme) => theme.palette.background.paper }}
              startIcon={
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                  badgeContent={
                    getLastOnline(t.from.lastOnline) === "Онлайн" ? " " : 0
                  }
                  overlap="circular"
                  color={"success"}
                  sx={{
                    marginRight: (theme) => theme.spacing(1),
                    height: "min-content",
                    alignSelf: "center",
                    ".MuiBadge-dot": {
                      border: (theme) =>
                        `2px solid ${theme.palette.background.paper}`,
                      minWidth: "auto",
                      width: "7px",
                      height: "7px",
                      borderRadius: "100px",
                      boxSizing: "content-box",
                    },
                  }}
                >
                  <Avatar
                    src={t.from.avatar}
                    children={t.from.nickname.substr(0, 1)}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                </Badge>
              }
              endIcon={
                <IconWrapper
                  size={24}
                  sx={{
                    color: (theme) =>
                      t.positive
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  {t.positive && <Icon16AddCircleOutline />}
                  {!t.positive && <Icon20RemoveCircleOutline />}
                </IconWrapper>
              }
            >
              <Typography
                variant="body2"
                sx={{
                  padding: "0 2px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  display: "flex",
                  color: (theme) =>
                    t.from.userId === 1254
                      ? theme.palette.success.light
                      : t.from.userId === 1136
                      ? theme.palette.error.main
                      : theme.palette.text.primary,
                }}
              >
                {t.from.nickname}
                {t.from.userRole !== UserRoleEnum.None && (
                  <Tooltip
                    title={`Персонал (${getUserRoleString(t.from.userRole)})`}
                    placement="top"
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <IconWrapper
                        sx={{
                          color: (theme) => theme.palette.info.main,
                          alignSelf: "center",
                          marginRight: "2px",
                          marginLeft: "2px",
                        }}
                        size={16}
                      >
                        <Icon28UserStarBadgeOutline />
                      </IconWrapper>
                    </Box>
                  </Tooltip>
                )}
                {checkPermissionsWA(
                  Permissions.Premium,
                  t.from.permissions
                ) && (
                  <Tooltip title={`Premium`} placement="top">
                    <Box sx={{ alignSelf: "center" }}>
                      <IconWrapper
                        sx={{
                          color: process.env.REACT_APP_PREMIUM_COLOR,
                          alignSelf: "center",
                          marginRight: "2px",
                          marginLeft: "2px",
                        }}
                        size={16}
                      >
                        <Icon24CrownOutline />
                      </IconWrapper>
                    </Box>
                  </Tooltip>
                )}
                {checkPermissionsWA(Permissions.Lite, t.from.permissions) && (
                  <Tooltip title={`Lite`} placement="top">
                    <Box sx={{ alignSelf: "center" }}>
                      <IconWrapper
                        sx={{
                          color: process.env.REACT_APP_LITE_COLOR,
                          alignSelf: "center",
                          marginRight: "2px",
                          marginLeft: "2px",
                        }}
                        size={16}
                      >
                        <Icon24CrownOutline />
                      </IconWrapper>
                    </Box>
                  </Tooltip>
                )}
              </Typography>
            </CellR>
          ))}
    </Stack>
  );
};

export default RatingsPage;
