import { useQuery, useSubscription } from "@apollo/client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import {
  GlobalChatMessage as GlobalChatMessageModel,
  GlobalChatRemove,
} from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addGCMessages, removeGCMessage } from "../../redux/globalchat/reducer";
import GlobalChatForm from "./GlobalChatForm";
import GlobalChatMessage from "./GlobalChatMessage";

const GlobalChat = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const blacklist = useAppSelector((state) => state.userData.blacklist);
  const hideUsers = useAppSelector(
    (state) => state.settings.hideBlacklistedProfiles
  );
  const dispatch = useAppDispatch();
  const [addText, setAddText] = React.useState("");
  const messages = useAppSelector((state) => state.globalChat.messages);
  const { data: messagesData } = useQuery<{
    globalChatMessages: GlobalChatMessageModel[];
  }>(gql`
    query globalChat {
      globalChatMessages {
        id
        message
        owner {
          id
          nickname
          avatar
          lastOnline
          user {
            permissions
          }
        }
        server
        createdAt
      }
    }
  `);
  const { data: createData } = useSubscription<{
    globalChatMessageCreated: GlobalChatMessageModel;
  }>(
    gql`
      subscription globalChat {
        globalChatMessageCreated {
          id
          message
          owner {
            id
            nickname
            avatar
            lastOnline
            user {
              permissions
            }
          }
          server
          createdAt
        }
      }
    `
  );

  const { data: removeData } = useSubscription<{
    globalChatMessageRemoved: GlobalChatRemove;
  }>(
    gql`
      subscription globalChat {
        globalChatMessageRemoved {
          id
          server
        }
      }
    `
  );
  React.useEffect(() => {
    if (!messagesData) return;
    dispatch(
      addGCMessages(
        messagesData.globalChatMessages.filter((m) => {
          if (hideUsers) {
            return blacklist.includes(m.owner.id);
          } else {
            return true;
          }
        })
      )
    );
  }, [messagesData, dispatch, hideUsers, blacklist]);

  React.useEffect(() => {
    if (!createData?.globalChatMessageCreated) return;
    if (createData.globalChatMessageCreated.server !== server) return;
    if (
      hideUsers &&
      blacklist.includes(createData.globalChatMessageCreated.owner.id)
    )
      return;
    dispatch(addGCMessages([createData.globalChatMessageCreated]));
  }, [createData, server, blacklist, hideUsers, dispatch]);

  React.useEffect(() => {
    if (!removeData?.globalChatMessageRemoved) return;
    dispatch(removeGCMessage(removeData.globalChatMessageRemoved.id));
  }, [removeData, dispatch]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "320px",
        height: "max-content",
        minHeight: "320px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        gap: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
      }}
    >
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textTransform: "uppercase",
          }}
        >
          Глобальный чат
        </Typography>
        <Box
          sx={{
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
            flex: 1,
          }}
          className="hide-scrollbar"
        >
          {messages.map((msg) => (
            <GlobalChatMessage
              key={msg.id}
              message={msg}
              setAddText={setAddText}
            />
          ))}
          <GlobalChatMessage isSystem />
        </Box>
        <GlobalChatForm addText={addText} setAddText={setAddText} />
      </Stack>
    </Paper>
  );
};

export default GlobalChat;
