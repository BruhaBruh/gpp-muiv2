import { Button, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Icon56LockOutline } from "@vkontakte/icons";
import React from "react";
import IconWrapper from "../../components/ui/IconWrapper";

const AuthPage = () => {
  return (
    <Paper
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.sm,
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={2}>
        <IconWrapper
          size={64}
          sx={{
            alignSelf: "center",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <Icon56LockOutline />
        </IconWrapper>
        <ListItemText
          primary={
            <Typography variant="h5" color="primary">
              Вы не авторизованы
            </Typography>
          }
          secondary={
            <Typography variant="h6">
              Для работы сайта нужна авторизация через Discord
            </Typography>
          }
        />
        <Button href="/auth/login" size="large">
          Авторизоваться
        </Button>
      </Stack>
    </Paper>
  );
};

export default AuthPage;
