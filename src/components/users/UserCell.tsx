import { Avatar, Badge, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { User } from "../../graphql/types";
import { getImageByRole, getLastOnline } from "../../redux/userData/types";
import CellR from "../ui/CellR";

interface props {
  user: User;
}

const UserCell: React.FC<props> = ({ user }) => {
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
    >
      <CellR to={"/u/" + user.userId} color="inherit">
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
              border: (theme) => `2px solid ${theme.palette.background.paper}`,
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
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {user.nickname}
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
                  height="20px"
                />
              )}
            </Typography>
          }
          secondary={
            user.discordRoles.sort((a, b) => a.position - b.position)[0] && (
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
                  user.discordRoles.sort((a, b) => a.position - b.position)[0]
                    ?.name
                }
              </Typography>
            )
          }
        />
      </CellR>
    </Paper>
  );
};

export default UserCell;
