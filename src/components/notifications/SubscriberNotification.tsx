import { useMutation } from "@apollo/client";
import { Avatar, Badge, IconButton, Stack, Tooltip } from "@mui/material";
import { Icon20Cancel, Icon20UserAddOutline } from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import {
  NotificationType,
  SubscriberNotification as N,
} from "../../graphql/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { readNotification } from "../../redux/notifications/reducer";
import { getLastOnline } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";

const SubscriberNotification: React.FC<{ notification: N }> = ({
  notification,
}) => {
  const size = 32;
  const [read, { error }] = useMutation(
    gql`
      mutation read($id: ObjectID!, $type: NotificationType!) {
        readNotification(id: $id, type: $type)
      }
    `,
    {
      variables: {
        id: Number(notification.id),
        type: NotificationType.Subscriber,
      },
    }
  );
  const [startSub, { error: startError }] = useMutation(gql`
    mutation startSub($id: ObjectID!) {
      startSubscribe(id: $id) {
        id
      }
    }
  `);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!error && !startError) return;
    enqueueSnackbar(error?.message || startError?.message, {
      variant: "error",
    });
  }, [error, startError, enqueueSnackbar]);

  return (
    <Cell
      startIcon={
        <LazyLoadComponent>
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            badgeContent={
              getLastOnline(notification.subscriber.lastOnline) === "Онлайн"
                ? " "
                : 0
            }
            overlap="circular"
            color={"success"}
            sx={{
              marginRight: (theme) => theme.spacing(2),
              ".MuiBadge-dot": {
                border: (theme) =>
                  `2px solid ${theme.palette.background.paper}`,
                minWidth: "auto",
                width: "7px",
                height: "7px",
                borderRadius: "100px",
                boxSizing: "content-box",
              },
            }}
          >
            <Avatar
              src={notification.subscriber.avatar}
              sx={{
                width: size,
                height: size,
              }}
            />
          </Badge>
        </LazyLoadComponent>
      }
      endIcon={
        <Stack spacing={1} direction="row">
          <Tooltip placement="top" title="Добавить в друзья">
            <IconButton
              onClick={() => {
                startSub({ variables: { id: notification.subscriber.id } });
                read();
                dispatch(readNotification(notification));
              }}
            >
              <IconWrapper
                size={size - 8}
                sx={{ color: (theme) => theme.palette.primary.main }}
              >
                <Icon20UserAddOutline />
              </IconWrapper>
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Игнорировать">
            <IconButton
              onClick={() => {
                read();
                dispatch(readNotification(notification));
              }}
            >
              <IconWrapper
                size={size - 8}
                sx={{ color: (theme) => theme.palette.error.main }}
              >
                <Icon20Cancel />
              </IconWrapper>
            </IconButton>
          </Tooltip>
        </Stack>
      }
      sx={{ textTransform: "none", textAlign: "left" }}
    >
      {notification.subscriber.nickname} подписался на вас
    </Cell>
  );
};

export default SubscriberNotification;
