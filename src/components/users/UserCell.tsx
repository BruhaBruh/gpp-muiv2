import {
  Avatar,
  Badge,
  Box,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Icon24CrownOutline,
  Icon28UserStarBadgeOutline,
} from "@vkontakte/icons";
import React from "react";
import { User, UserRoleEnum, UserTopEnum } from "../../graphql/types";
import {
  ageToStr,
  checkPermissionsWA,
  getLastOnline,
  getUserRoleString,
  Permissions,
} from "../../redux/userData/types";
import CellR from "../ui/CellR";
import IconWrapper from "../ui/IconWrapper";
import RatingBar from "./RatingBar";

interface props {
  user: User;
  type?: UserTopEnum;
  elevation?: number;
}

const UserCell: React.FC<props> = ({ user, type, elevation }) => {
  const getSecondary = () => {
    switch (type) {
      case UserTopEnum.Views:
        return (
          <Typography
            variant="body2"
            sx={{
              padding: "0 2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              display: "flex",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            Просмотров: {user.views}
          </Typography>
        );
      case UserTopEnum.Friends:
        return (
          <Typography
            variant="body2"
            sx={{
              padding: "0 2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              display: "flex",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            Друзей: {user.totalFriends}
          </Typography>
        );
      case UserTopEnum.Subscribers:
        return (
          <Typography
            variant="body2"
            sx={{
              padding: "0 2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              display: "flex",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            Подписчиков: {user.totalSubscribers}
          </Typography>
        );
      case UserTopEnum.Years:
        return (
          <Typography
            variant="body2"
            sx={{
              padding: "0 2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              display: "flex",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {user.level} {ageToStr(user.level)} в городе
          </Typography>
        );
      case UserTopEnum.Rating:
        return (
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body2"
              sx={{
                padding: "0 2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                display: "flex",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {user.rating.result}
            </Typography>
            <RatingBar rating={user.rating} sx={{ marginLeft: "8px" }} />
          </Stack>
        );
      default:
        return (
          user.discordRoles
            .map((d) => d)
            .sort((a, b) => a.position - b.position)[0] && (
            <Typography
              variant="body2"
              sx={{
                padding: "0 2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                display: "flex",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {
                user.discordRoles
                  .map((d) => d)
                  .sort((a, b) => a.position - b.position)[0]?.name
              }
            </Typography>
          )
        );
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: 1,
        overflow: "hidden",
        position: "relative",
        background: user.banner ? `url(${user.banner})` : undefined,
        backgroundPosition: "50% 0%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundClip: "border-box",
        height: "min-content",
        cursor: "pointer",
        flex: 1,
      }}
      elevation={elevation}
    >
      <CellR
        to={"/u/" + user.userId}
        startIcon={
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            badgeContent={getLastOnline(user.lastOnline) === "Онлайн" ? " " : 0}
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
              src={user.avatar}
              children={user.nickname.substr(0, 1)}
              sx={{
                width: 48,
                height: 48,
              }}
            />
          </Badge>
        }
        color="inherit"
      >
        <ListItemText
          sx={{
            margin: 0,
            alignSelf: "center",
            textShadow: (theme) =>
              `-1px -1px 1px ${theme.palette.getContrastText(
                theme.palette.text.secondary
              )}, 1px -1px 1px ${theme.palette.getContrastText(
                theme.palette.text.secondary
              )}, -1px 1px 1px ${theme.palette.getContrastText(
                theme.palette.text.secondary
              )}, 1px 1px 1px ${theme.palette.getContrastText(
                theme.palette.text.secondary
              )}`,
          }}
          primary={
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
                  user.userId === 1254
                    ? theme.palette.success.light
                    : user.userId === 1136
                    ? theme.palette.error.main
                    : theme.palette.text.primary,
              }}
            >
              {user.nickname}
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
              {checkPermissionsWA(Permissions.Premium, user.permissions) && (
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
              {checkPermissionsWA(Permissions.Lite, user.permissions) && (
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
              {/*getImageByRole(user.role) !== null && (
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
                  height="20px"
                />
                )*/}
            </Typography>
          }
          secondary={getSecondary()}
        />
      </CellR>
    </Paper>
  );
};

export default UserCell;
