import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import { Avatar, Badge, ListItemText, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import useSound from "use-sound";
import { Chat, Message } from "../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setChats, setLastMessage } from "../redux/chats/reducer";
import { getLastOnline } from "../redux/userData/types";

const ChatsLoader = () => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const server = useAppSelector((state) => state.userData.serverId);
  const dispatch = useAppDispatch();
  const [playNewMessageSound] = useSound(
    "https://freesound.org/data/previews/231/231945_2378802-lq.mp3"
  );
  const { enqueueSnackbar } = useSnackbar();
  const [getChats, { data: chatsData }] = useLazyQuery<{ chats: Chat[] }>(
    gql`
      query chats($server: ObjectID!) {
        chats(server: $server) {
          id
          name
          type
          updatedAt
          avatar
          owner
          profiles {
            id
            avatar
            nickname
            lastOnline
          }
          lastMessage {
            id
            type
            chat
            owner {
              id
              nickname
              lastOnline
              avatar
              roles {
                color
              }
            }
            message
            createdAt
            edited
            updatedAt
            readed
          }
        }
      }
    `,
    { pollInterval: 15000 }
  );
  const { data: newMessage } = useSubscription<{ newMessage: Message }>(
    gql`
      subscription ($profile: ObjectID!) {
        newMessage(profile: $profile) {
          id
          type
          chat
          owner {
            id
            nickname
            lastOnline
            avatar
            roles {
              color
            }
          }
          message
          createdAt
          edited
          updatedAt
          readed
        }
      }
    `,
    { variables: { profile: profileId } }
  );
  const { data: editedMessage } = useSubscription<{ editedMessage: Message }>(
    gql`
      subscription ($profile: ObjectID!) {
        editedMessage(profile: $profile) {
          id
          type
          chat
          owner {
            id
            nickname
            lastOnline
            avatar
            roles {
              color
            }
          }
          message
          createdAt
          edited
          updatedAt
          readed
        }
      }
    `,
    { variables: { profile: profileId } }
  );

  const { data: deletedMessage } = useSubscription<{ deletedMessage: Message }>(
    gql`
      subscription ($profile: ObjectID!) {
        deletedMessage(profile: $profile) {
          chat
        }
      }
    `,
    { variables: { profile: profileId } }
  );
  const [getLastMessage, { data: lastMessageData }] = useLazyQuery<{
    getLastMessage: Message;
  }>(gql`
    query ($chat: ObjectID!) {
      getLastMessage(chat: $chat) {
        id
        type
        chat
        owner {
          id
          nickname
          lastOnline
          avatar
          roles {
            color
          }
        }
        message
        createdAt
        edited
        updatedAt
        readed
      }
    }
  `);

  React.useEffect(() => {
    if (!deletedMessage) return;
    getLastMessage({ variables: { chat: deletedMessage.deletedMessage.chat } });
  }, [deletedMessage, getLastMessage]);

  React.useEffect(() => {
    if (!lastMessageData) return;
    dispatch(setLastMessage(lastMessageData.getLastMessage));
  }, [lastMessageData, dispatch]);

  React.useEffect(() => {
    if (!editedMessage) return;
    dispatch(setLastMessage(editedMessage.editedMessage));
  }, [editedMessage, dispatch]);

  React.useEffect(() => {
    if (!server) return;
    getChats({
      variables: {
        server: server,
      },
    });
  }, [server, getChats]);

  React.useEffect(() => {
    if (!chatsData) return;
    dispatch(setChats(chatsData.chats));
  }, [chatsData, dispatch]);

  React.useEffect(() => {
    if (!newMessage) return;
    dispatch(setLastMessage(newMessage.newMessage));
    if (profileId === newMessage.newMessage.owner?.id) return;
    playNewMessageSound();
    enqueueSnackbar(
      <Stack spacing={1}>
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
          badgeContent={
            getLastOnline(newMessage.newMessage.owner?.lastOnline) === "Онлайн"
              ? " "
              : 0
          }
          overlap="circular"
          color={"success"}
        >
          <Avatar
            src={newMessage.newMessage.owner?.avatar}
            sx={{
              width: 40,
              height: 40,
            }}
            children={newMessage.newMessage.owner?.nickname.substr(0, 2)}
          />
        </Badge>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {newMessage.newMessage.owner?.nickname}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {newMessage.newMessage.message}
            </Typography>
          }
          sx={{
            textAlign: "left",
            textTransform: "none",
            width: "1px",
            flex: 1,
          }}
        />
      </Stack>
    );
  }, [newMessage, dispatch, playNewMessageSound, profileId, enqueueSnackbar]);

  return <></>;
};

export default ChatsLoader;
