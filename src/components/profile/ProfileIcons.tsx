import { Box, Paper, Tooltip } from "@mui/material";
import { Icon24CrownOutline, Icon24DoneOutline } from "@vkontakte/icons";
import React from "react";
import { Permissions } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { checkPermissions } from "../../redux/userData/types";

interface props {
  height?: any;
}

const ProfileIcons: React.FC<props> = ({ height }) => {
  const permissions = useAppSelector(
    (state) => state.currentProfile.profile?.user.permissions
  );
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
          <Tooltip title="Premium пользователь" placement="left">
            <Box component="a" href="/donate">
              <Paper
                elevation={3}
                sx={{ padding: (theme) => theme.spacing(0.5) }}
              >
                <Icon24CrownOutline
                  style={{ color: process.env.REACT_APP_PREMIUM_COLOR }}
                />
              </Paper>
            </Box>
          </Tooltip>
        )}
      {!checkPermissions(Permissions.All, permissions) &&
        checkPermissions(Permissions.LiteSubscription, permissions) && (
          <Tooltip title="Lite пользователь" placement="left">
            <Box component="a" href="/donate">
              <Paper
                elevation={3}
                sx={{ padding: (theme) => theme.spacing(0.5) }}
              >
                <Icon24CrownOutline
                  style={{ color: process.env.REACT_APP_LITE_COLOR }}
                />
              </Paper>
            </Box>
          </Tooltip>
        )}
    </Box>
  );
};

export default ProfileIcons;
