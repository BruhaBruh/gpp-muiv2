import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
  IconButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon28CancelOutline, Icon28UserAddOutline } from "@vkontakte/icons";
import React from "react";
import { Subscribernotification } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { removeNotification } from "../../redux/cache/reducer";
import IconWrapper from "../ui/IconWrapper";
import LinkR from "../ui/LinkR";

const SubscriberNotification: React.FC<{
  notification: Subscribernotification;
}> = ({ notification }) => {
  const [sub] = useMutation(gql`
    mutation startSubscribe($id: Int!) {
      startSubscribe(id: $id) {
        userId
      }
    }
  `);
  const [read] = useMutation(gql`
    mutation read($id: Int!, $type: String!) {
      readNotification(id: $id, type: $type)
    }
  `);
  const dispatch = useAppDispatch();

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={1} direction="row">
        <Avatar
          sx={{
            width: 32,
            height: 32,
            alignSelf: "center",
          }}
          src={notification.subscriberRs.subscriberNavigation.avatar}
          children={notification.subscriberRs.subscriberNavigation.nickname.substr(
            0,
            1
          )}
        />
        <ListItemText
          sx={{
            margin: 0,
            alignSelf: "center",
          }}
          primary={
            <Typography
              variant="body2"
              sx={{
                padding: "0 2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                display: "flex",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Новый подписчик
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                padding: "0 2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                display: "flex",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <LinkR
                to={`/u/${notification.subscriberRs.subscriberNavigation.userId}`}
                sx={{ marginRight: "4px" }}
                underline="hover"
              >
                {notification.subscriberRs.subscriberNavigation.nickname}
              </LinkR>
              подписался(ась) на вас
            </Typography>
          }
        />
        <IconButton
          color="primary"
          sx={{ alignSelf: "center", height: "min-content" }}
          onClick={() => {
            sub({
              variables: {
                id: notification.subscriberRs.subscriberNavigation.userId,
              },
            });
            dispatch(removeNotification(notification));
          }}
        >
          <IconWrapper>
            <Icon28UserAddOutline />
          </IconWrapper>
        </IconButton>
        <IconButton
          onClick={() => {
            read({
              variables: {
                id: notification.subscribernotificationId,
                type: notification.__typename,
              },
            });
            dispatch(removeNotification(notification));
          }}
          sx={{ alignSelf: "center", height: "min-content" }}
        >
          <IconWrapper>
            <Icon28CancelOutline />
          </IconWrapper>
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default SubscriberNotification;
