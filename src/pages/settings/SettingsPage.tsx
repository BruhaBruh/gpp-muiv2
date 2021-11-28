import { Paper, Stack } from "@mui/material";
import {
  Icon28ChevronRightOutline,
  Icon28GridLayoutOutline,
  Icon28Notifications,
  Icon28PaletteOutline,
} from "@vkontakte/icons";
import React from "react";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";

const SettingsPage = () => {
  const size = 28;

  return (
    <Paper
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={1}>
        <CellR
          to="/settings/themes"
          startIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon28PaletteOutline />
            </IconWrapper>
          }
          endIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              <Icon28ChevronRightOutline />
            </IconWrapper>
          }
        >
          Внешний вид
        </CellR>
        <CellR
          to="/settings/interface"
          startIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon28GridLayoutOutline />
            </IconWrapper>
          }
          endIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              <Icon28ChevronRightOutline />
            </IconWrapper>
          }
        >
          Настройки интерфейса
        </CellR>
        <CellR
          to="/settings/notification"
          startIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon28Notifications />
            </IconWrapper>
          }
          endIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              <Icon28ChevronRightOutline />
            </IconWrapper>
          }
        >
          Настройки Discord уведомлений
        </CellR>
      </Stack>
    </Paper>
  );
};

export default SettingsPage;
