import { ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Icon56ErrorTriangleOutline } from "@vkontakte/icons";
import React from "react";
import ButtonR from "../components/ui/ButtonR";
import IconWrapper from "../components/ui/IconWrapper";

const Page404 = () => {
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
            color: (theme) => theme.palette.error.main,
          }}
        >
          <Icon56ErrorTriangleOutline />
        </IconWrapper>
        <ListItemText
          primary={
            <Typography variant="h5" color="primary">
              Ошибка 404
            </Typography>
          }
          secondary={<Typography variant="h6">Страница не найдена</Typography>}
        />
        <ButtonR
          to="/"
          size="large"
          sx={{ alignSelf: "end", maxWidth: "max-content" }}
        >
          Перейти на главную
        </ButtonR>
      </Stack>
    </Paper>
  );
};

export default Page404;
