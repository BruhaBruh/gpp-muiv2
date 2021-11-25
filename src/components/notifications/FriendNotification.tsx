import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
  IconButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon20UserSlashOutline, Icon28CancelOutline } from "@vkontakte/icons";
import React from "react";
import { Friendnotification } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { removeNotification } from "../../redux/cache/reducer";
import IconWrapper from "../ui/IconWrapper";
import LinkR from "../ui/LinkR";

const FriendNotification: React.FC<{
  notification: Friendnotification;
}> = ({ notification }) => {
  const [remove] = useMutation(gql`
    mutation removeFriend($id: Int!) {
      removeFriend(id: $id) {
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
          src={notification.friendRs.friendNavigation.avatar}
          children={notification.friendRs.friendNavigation.nickname.substr(
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
              Новый друг
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
                to={`/u/${notification.friendRs.friendNavigation.userId}`}
                sx={{ marginRight: "4px" }}
                underline="hover"
              >
                {notification.friendRs.friendNavigation.nickname}
              </LinkR>
              добавил(а) вас в друзья
            </Typography>
          }
        />
        <IconButton
          color="error"
          sx={{ alignSelf: "center", height: "min-content" }}
          onClick={() => {
            remove({
              variables: { id: notification.friendRs.friendNavigation.userId },
            });
            dispatch(removeNotification(notification));
          }}
        >
          <IconWrapper>
            <Icon20UserSlashOutline />
          </IconWrapper>
        </IconButton>
        <IconButton
          onClick={() => {
            read({
              variables: {
                id: notification.friendnotificationId,
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

export default FriendNotification;
