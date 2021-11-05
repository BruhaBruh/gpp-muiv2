import { Box, Paper, Tooltip } from "@mui/material";
import { Icon24CrownOutline, Icon24DoneOutline } from "@vkontakte/icons";
import React from "react";
import { Permissions } from "../../graphql/graphql";
import { checkPermissions } from "../../redux/userData/types";
import LinkR from "../ui/LinkR";

interface props {
  height?: any;
  permissions: Permissions[];
}

const ProfileIcons: React.FC<props> = ({ height, permissions }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "min-content",
        gap: (theme) => theme.spacing(1),
        height: height !== undefined ? height : 128,
        overflowY: "scroll",
        padding: (theme) => theme.spacing(0.5),
      }}
      className="hide-scrollbar"
    >
      {checkPermissions(Permissions.All, permissions) && (
        <Tooltip title="Администратор сайта" placement="left">
          <Paper
            elevation={3}
            sx={{
              padding: (theme) => theme.spacing(0.5),
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <Icon24DoneOutline />
          </Paper>
        </Tooltip>
      )}
      {!checkPermissions(Permissions.All, permissions) &&
        checkPermissions(Permissions.PremiumSubscription, permissions) && (
          <LinkR to="/donate" onClick={(e) => e.stopPropagation()}>
            <Tooltip title="Premium пользователь" placement="left">
              <Paper
                elevation={3}
                sx={{ padding: (theme) => theme.spacing(0.5) }}
              >
                <Icon24CrownOutline
                  style={{ color: process.env.REACT_APP_PREMIUM_COLOR }}
                />
              </Paper>
            </Tooltip>
          </LinkR>
        )}
      {!checkPermissions(Permissions.All, permissions) &&
        checkPermissions(Permissions.LiteSubscription, permissions) && (
          <LinkR to="/donate" onClick={(e) => e.stopPropagation()}>
            <Tooltip title="Lite пользователь" placement="left">
              <Paper
                elevation={3}
                sx={{ padding: (theme) => theme.spacing(0.5) }}
              >
                <Icon24CrownOutline
                  style={{ color: process.env.REACT_APP_LITE_COLOR }}
                />
              </Paper>
            </Tooltip>
          </LinkR>
        )}
    </Box>
  );
};

export default ProfileIcons;
