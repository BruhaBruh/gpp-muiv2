import { gql, useMutation } from "@apollo/client";
import { IconButton, Stack, TextField } from "@mui/material";
import { Icon28CheckCircleOutline, Icon28Send } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router";
import { Message } from "../../graphql/graphql";

interface props {
  message?: Message;
  resetMessage: (value: React.SetStateAction<Message | undefined>) => void;
}

const ChatMessageForm: React.FC<props> = ({ message, resetMessage }) => {
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [send, { error: sendError }] = useMutation(
    gql`
      mutation sendMessage($chat: ObjectID!, $message: String!) {
        sendMessage(input: { chat: $chat, message: $message }) {
          id
        }
      }
    `
  );
  const [save, { error: saveError }] = useMutation(gql`
    mutation editMessage($id: ObjectID!, $message: String!) {
      editMessage(id: $id, input: { message: $message }) {
        id
      }
    }
  `);
  const [text, setText] = React.useState("");

  const sendMessage = () => {
    send({ variables: { chat: id, message: text } });
    setText("");
  };

  const saveMessage = () => {
    if (message?.message === text) {
      setText("");
      resetMessage(undefined);
      return;
    }
    save({ variables: { id: message?.id, message: text } });
    resetMessage(undefined);
    setText("");
  };

  React.useEffect(() => {
    if (!sendError && !saveError) return;
    enqueueSnackbar(sendError?.message || saveError?.message, {
      variant: "error",
    });
  }, [sendError, saveError, enqueueSnackbar]);

  React.useEffect(() => {
    if (!message) return;
    setText(message.message);
  }, [message]);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ width: "100%", alignItems: "center" }}
    >
      <TextField
        size="small"
        placeholder="Сообщение..."
        fullWidth
        id="message"
        variant="outlined"
        name="message"
        multiline
        value={text}
        error={text.length > 1000}
        helperText={
          text.length > 1000 ? "Максимальная длина 1000 символов" : undefined
        }
        onChange={(e) => setText(e.currentTarget.value)}
        maxRows={10}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (text.length === 0 || text.length > 1000) return;
            if (!id) return;
            message === undefined ? sendMessage() : saveMessage();
          }
        }}
        sx={{ margin: 0, flex: 1 }}
      />
      {message === undefined && text.length !== 0 && text.length <= 1000 && (
        <IconButton onClick={sendMessage}>
          <Icon28Send />
        </IconButton>
      )}
      {message !== undefined && text.length !== 0 && text.length <= 1000 && (
        <IconButton onClick={saveMessage}>
          <Icon28CheckCircleOutline />
        </IconButton>
      )}
    </Stack>
  );
};

export default ChatMessageForm;
