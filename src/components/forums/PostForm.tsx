import { gql, useMutation } from "@apollo/client";
import { IconButton, Paper, Stack, TextField } from "@mui/material";
import { Icon28SendOutline } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import IconWrapper from "../ui/IconWrapper";

const PostForm: React.FC<{ threadId: number }> = ({ threadId }) => {
  const [text, setText] = React.useState("");
  const [send, { data, loading, error }] = useMutation(gql`
    mutation send($threadId: Int!, $message: String!, $replyId: Int) {
      createPost(
        input: { threadId: $threadId, message: $message, replyId: $replyId }
      ) {
        postId
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const reload = () => {
    const current = window.location.pathname;
    history.replace(`/reload`);
    setTimeout(() => {
      history.replace(current);
    });
  };

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    reload();
    // eslint-disable-next-line
  }, [data, enqueueSnackbar]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(1) }}>
      <Stack spacing={1} direction="row">
        <TextField
          size="small"
          margin="none"
          multiline
          maxRows={4}
          placeholder="Сообщение"
          sx={{ marginTop: "auto" }}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          fullWidth
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.shiftKey) return;
              e.preventDefault();
              if (text.trim().length >= 1 && text.trim().length <= 2000) {
                send({ variables: { threadId: threadId, message: text } });
              }
            }
          }}
        />
        {text.trim().length >= 1 && text.trim().length <= 2000 && (
          <IconButton
            disabled={loading}
            onClick={() =>
              send({ variables: { threadId: threadId, message: text } })
            }
            size="medium"
            color="primary"
            sx={{ alignSelf: "end" }}
          >
            <IconWrapper>
              <Icon28SendOutline />
            </IconWrapper>
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
};

export default PostForm;
