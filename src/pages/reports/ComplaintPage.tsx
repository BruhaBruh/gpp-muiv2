import { Paper, Stack, Typography } from "@mui/material";
import {
  Icon28ChevronRightOutline,
  Icon28UserOutline,
  Icon28UserStarBadgeOutline,
} from "@vkontakte/icons";
import React from "react";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";

const ComplaintPage = () => {
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
        На кого жалоба?
      </Typography>
      <Stack spacing={1}>
        <CellR
          to="/r/c/admin"
          startIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon28UserStarBadgeOutline />
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
          Персонал
        </CellR>
        <CellR
          to="/r/c/user"
          startIcon={
            <IconWrapper
              component="span"
              size={size}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon28UserOutline />
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
          Игрок
        </CellR>
      </Stack>
    </Paper>
  );
};

export default ComplaintPage;
