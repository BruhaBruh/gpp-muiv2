import { Avatar, Badge, Box, Paper, Typography } from "@mui/material";
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
import { Profile, Role } from "../../graphql/graphql";
import { getLastOnline } from "../../redux/userData/types";
import CellR from "../ui/CellR";
import ProfileIcons from "./ProfileIcons";

interface props {
  profile: Profile;
  minWidth?: boolean;
  hasMargin?: boolean;
  showRatings?: boolean;
  showSold?: boolean;
  showBought?: boolean;
}

const ProfileCell: React.FC<props> = ({
  profile,
  hasMargin,
  minWidth,
  showRatings,
  showBought,
  showSold,
}) => {
  const getImageByRole = () => {
    switch (profile.role) {
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

  const getSubComponent = () => {
    if (showRatings) {
      return (
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
        >
          Рейтинг: {profile.ratings}
        </Typography>
      );
    } else if (showSold) {
      return (
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
        >
          Продано: {profile.soldProducts}
        </Typography>
      );
    } else if (showBought) {
      return (
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
        >
          Куплено: {profile.boughtProducts}
        </Typography>
      );
    } else {
      return (
        profile.roles.length !== 0 && (
          <Typography
            variant="subtitle2"
            sx={{
              color: JSON.parse(JSON.stringify(profile.roles))
                .sort((a: Role, b: Role) => b.position - a.position)
                .shift().color,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
            }}
          >
            {
              JSON.parse(JSON.stringify(profile.roles))
                .sort((a: Role, b: Role) => b.position - a.position)
                .shift().name
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
        background: profile.banner ? `url(${profile.banner})` : undefined,
        backgroundPosition: "50% 0%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundClip: "border-box",
        height: "min-content",
        cursor: "pointer",
        flex: 1,
      }}
      elevation={1}
    >
      <CellR
        to={"/profile/" + profile.id}
        sx={{
          background: "#00000077",
          "&:hover": {
            background: "#00000066",
          },
        }}
      >
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
          badgeContent={
            getLastOnline(profile.lastOnline) === "Онлайн" ? " " : 0
          }
          overlap="circular"
          color={"success"}
          sx={{
            marginRight: (theme) => theme.spacing(2),
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
            src={profile.avatar}
            sx={{
              width: 48,
              height: 48,
            }}
          />
        </Badge>
        <Box
          sx={{
            flex: 1,
            width: minWidth ? "min-content" : "1px",
            marginRight: (theme) => theme.spacing(2),
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              display: "flex",
              color: (theme) =>
                profile.id === "6171b40cc87c467779872271"
                  ? theme.palette.success.light
                  : "#FFFFFF",
            }}
          >
            {getImageByRole() !== null && (
              <LazyLoadImage
                src={getImageByRole() as any}
                alt={profile.role ? profile.role : undefined}
                style={{
                  imageRendering: "pixelated",
                  userSelect: "none",
                  display: "inline",
                  alignSelf: "center",
                  marginRight: "4px",
                }}
                draggable={false}
                height="100%"
              />
            )}{" "}
            {profile.nickname}
          </Typography>
          {getSubComponent()}
        </Box>
        <ProfileIcons permissions={profile.user.permissions} height={48} />
      </CellR>
    </Paper>
  );
};

export default ProfileCell;
