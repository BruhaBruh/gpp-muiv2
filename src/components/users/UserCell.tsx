import { Avatar, Badge, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import alchemist from "../../assets/images/roles/alchemist.png";
import blacksmith from "../../assets/images/roles/blacksmith.png";
import builder from "../../assets/images/roles/builder.png";
import crafter from "../../assets/images/roles/crafter.png";
import farmer from "../../assets/images/roles/farmer.png";
import fisherman from "../../assets/images/roles/fisherman.png";
import hunter from "../../assets/images/roles/hunter.png";
import lumberjack from "../../assets/images/roles/lumberjack.png";
import miner from "../../assets/images/roles/miner.png";
import { User } from "../../graphql/types";
import { getLastOnline } from "../../redux/userData/types";
import CellR from "../ui/CellR";

interface props {
  user: User;
}

const UserCell: React.FC<props> = ({ user }) => {
  const getImageByRole = () => {
    switch (user.role) {
      case "Ремесленник":
        return crafter;
      case "Шахтёр":
        return miner;
      case "Охотник":
        return hunter;
      case "Строитель":
        return builder;
      case "Кузнец":
        return blacksmith;
      case "Плотник":
        return lumberjack;
      case "Повар":
        return alchemist;
      case "Рыбак":
        return fisherman;
      case "Фермер":
        return farmer;
      default:
        return null;
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
            marginRight: (theme) => theme.spacing(2),
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
          sx={{ margin: 0, alignSelf: "center" }}
          primary={
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                display: "flex",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {user.nickname}
              {getImageByRole() !== null && (
                <LazyLoadImage
                  src={getImageByRole() as any}
                  alt={user.role ? user.role : undefined}
                  style={{
                    imageRendering: "pixelated",
                    userSelect: "none",
                    display: "inline",
                    alignSelf: "center",
                    marginLeft: "auto",
                  }}
                  draggable={false}
                  height="100%"
                />
              )}
            </Typography>
          }
          secondary={
            user.discordRoles.sort((a, b) => a.position - b.position)[0] && (
              <Typography
                variant="body2"
                sx={{
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
