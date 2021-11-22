import { Paper, Stack, Typography } from "@mui/material";
import {
  Icon28BugOutline,
  Icon28ChevronRightOutline,
  Icon28LightbulbStarOutline,
  Icon28ReportOutline,
} from "@vkontakte/icons";
import React from "react";
import ReportsList from "../../components/report/ReportsList";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";

const ReportsPage = () => {
  const size = 28;

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Выберите тип репорта
          </Typography>
          <CellR
            color="error"
            to="/r/c"
            startIcon={
              <IconWrapper component="span" size={size}>
                <Icon28ReportOutline />
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
            Жалоба
          </CellR>
          <CellR
            color="warning"
            to="/r/b"
            startIcon={
              <IconWrapper component="span" size={size}>
                <Icon28BugOutline />
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
            Баг
          </CellR>
          <CellR
            color="info"
            to="/r/f"
            startIcon={
              <IconWrapper component="span" size={size}>
                <Icon28LightbulbStarOutline />
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
            Предложение
          </CellR>
        </Stack>
      </Paper>
      <ReportsList />
    </Stack>
  );
};

export default ReportsPage;
