import { useLazyQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon36SmileOutline, Icon56ServicesOutline } from "@vkontakte/icons";
import gql from "graphql-tag";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import IconWrapper from "../../components/ui/IconWrapper";
import { Server } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";

const ServerPage = () => {
  const serverId = useAppSelector((state) => state.userData.serverId);
  const [getServer, { data: serverData }] = useLazyQuery<{
    server: Server;
  }>(gql`
    query server($id: ObjectID!) {
      server(id: $id) {
        icon
        name
      }
    }
  `);

  React.useEffect(() => {
    if (!serverId) return;
    getServer({
      variables: {
        id: serverId,
      },
    });
  }, [serverId, getServer]);

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
          <Icon56ServicesOutline />
        </IconWrapper>
        <ListItemText
          primary={
            <Typography variant="h5" color="primary">
              Вас нет на Discord сервере
            </Typography>
          }
          secondary={
            <Typography variant="h6">
              Вы можете зайти через телефон в игре
            </Typography>
          }
        />
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            padding: (theme) => theme.spacing(2),
            alignItems: "center",
          }}
        >
          <LazyLoadComponent>
            <Avatar
              alt={serverData?.server.name}
              src={serverData?.server.icon}
              sx={{
                width: "48px",
                height: "48px",
                marginRight: (theme) => theme.spacing(2),
              }}
              variant="rounded"
            />
          </LazyLoadComponent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginRight: "auto" }}
          >
            {serverData?.server.name}
          </Typography>
          <Icon36SmileOutline />
        </Paper>
        <Button onClick={() => window.location.reload()} size="large">
          Я на сервере
        </Button>
      </Stack>
    </Paper>
  );
};

export default ServerPage;
