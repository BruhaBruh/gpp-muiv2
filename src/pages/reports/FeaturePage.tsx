import { Paper, Stack, Typography } from "@mui/material";
import {
  Icon28ChevronRightOutline,
  Icon28CoinsOutline,
  Icon28GridLayoutOutline,
} from "@vkontakte/icons";
import React from "react";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";

const FeaturePage = () => {
  const size = 28;

  return (
    <Paper
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        Что вы бы хотели улучшить?
      </Typography>
      <Stack spacing={1}>
        <CellR
          to="/r/f/server"
          startIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon28CoinsOutline />
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
          Сервер
        </CellR>
        <CellR
          to="/r/f/site"
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
          Сайт
        </CellR>
      </Stack>
    </Paper>
  );
};

export default FeaturePage;
