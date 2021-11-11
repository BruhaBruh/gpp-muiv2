import { Paper, Stack } from "@mui/material";
import { Icon24Back } from "@vkontakte/icons";
import React from "react";
import { useParams } from "react-router";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessageForm from "../../components/chat/ChatMessageForm";
import ChatMessages from "../../components/chat/ChatMessages";
import CellR from "../../components/ui/CellR";
import Head from "../../components/ui/Head";
import IconWrapper from "../../components/ui/IconWrapper";
import { Chat, ChatType, Message } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSidebarHeader } from "../../redux/ui/reducer";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const chat: Chat | undefined = useAppSelector(
    (state) =>
      state.chats.chats.filter((c) => c.chat.id === Number(id))[0]?.chat
  );
  const header = useAppSelector((state) => state.ui.header);
  const profileId = useAppSelector((state) => state.userData.profileId);
  const dispatch = useAppDispatch();
  const [messageToEdit, setMessageToEdit] = React.useState<Message>();

  React.useEffect(() => {
    dispatch(
      setSidebarHeader(
        <CellR
          to="/chats"
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
  }, [dispatch, header]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Head
        name={
          chat?.type === ChatType.Chat
            ? chat?.name
            : chat?.profiles.filter((profile) => profile.id !== profileId)[0]
                .nickname + (chat?.type === ChatType.Product ? " [Т]" : "")
        }
      />
      <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
        <Stack spacing={2}>
          <ChatHeader />
          <ChatMessages setMessageToEdit={setMessageToEdit} />
          <ChatMessageForm
            message={messageToEdit}
            resetMessage={setMessageToEdit}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ChatPage;
