import { Button, Paper, Stack, Typography } from "@mui/material";
import { Icon24Back } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";
import StyledTab from "../../components/ui/StyledTab";
import StyledTabs from "../../components/ui/StyledTabs";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setHorizontalSnackbarPosition,
  setVerticalSnackbarPosition,
} from "../../redux/settings/reducer";
import { setSidebarHeader } from "../../redux/ui/reducer";

const InterfacePage = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const horizontalPosition = useAppSelector(
    (state) => state.settings.horizontalSnackbarPosition
  );
  const verticalPosition = useAppSelector(
    (state) => state.settings.verticalSnackbarPosition
  );

  React.useEffect(() => {
    dispatch(
      setSidebarHeader(
        <CellR
          to="/settings"
          onClick={() => dispatch(setSidebarHeader(null))}
          sx={{ height: "100%" }}
          startIcon={
            <IconWrapper
              component="span"
              size={20}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24Back />
            </IconWrapper>
          }
        >
          Назад
        </CellR>
      )
    );
  }, [dispatch]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textTransform: "uppercase",
            }}
          >
            Оповещения
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">Горизонтальное положение</Typography>
            <StyledTabs
              value={horizontalPosition}
              onChange={(_, v) => dispatch(setHorizontalSnackbarPosition(v))}
              variant="fullWidth"
            >
              <StyledTab label="Слева" value="left" />
              <StyledTab label="По центру" value="center" />
              <StyledTab label="Справа" value="right" />
            </StyledTabs>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Вертикальное положение</Typography>
            <StyledTabs
              value={verticalPosition}
              onChange={(_, v) => dispatch(setVerticalSnackbarPosition(v))}
              variant="fullWidth"
            >
              <StyledTab label="Сверху" value="top" />
              <StyledTab label="Снизу" value="bottom" />
            </StyledTabs>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Тестовые оповещения</Typography>
            <Stack spacing={1} direction="row">
              <Button
                onClick={() =>
                  enqueueSnackbar("Успешно", { variant: "success" })
                }
                color="success"
                size="small"
                sx={{ flex: 1 }}
              >
                ТЫК
              </Button>
              <Button
                onClick={() => enqueueSnackbar("Ошибка", { variant: "error" })}
                color="error"
                size="small"
                sx={{ flex: 1 }}
              >
                ТЫК
              </Button>
              <Button
                onClick={() =>
                  enqueueSnackbar("Внимание", { variant: "warning" })
                }
                color="warning"
                size="small"
                sx={{ flex: 1 }}
              >
                ТЫК
              </Button>
              <Button
                onClick={() =>
                  enqueueSnackbar("Информация", { variant: "info" })
                }
                color="info"
                size="small"
                sx={{ flex: 1 }}
              >
                ТЫК
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default InterfacePage;
