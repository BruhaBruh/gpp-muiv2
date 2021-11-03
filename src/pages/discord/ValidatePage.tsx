import { Button, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Icon56FaceIdOutline } from "@vkontakte/icons";
import React from "react";
import IconWrapper from "../../components/ui/IconWrapper";

const ValidatePage = () => {
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
          <Icon56FaceIdOutline />
        </IconWrapper>
        <ListItemText
          primary={
            <Typography variant="h5" color="primary">
              У вас нет статуса <strong>Подтверженный</strong>
            </Typography>
          }
          secondary={
            <Typography variant="h6">
              Для этого привяжи свой аккаунт к дискорду через телефон в игре
            </Typography>
          }
        />
        <Button onClick={() => window.location.reload()} size="large">
          Я все сделал
        </Button>
      </Stack>
    </Paper>
  );
};

export default ValidatePage;
