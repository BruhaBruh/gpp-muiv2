import { gql, useMutation } from "@apollo/client";
import { IconButton, Stack, TextField } from "@mui/material";
import { Icon28Send } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { ReportChat } from "../../graphql/graphql";
import IconWrapper from "../ui/IconWrapper";

interface props {
  report: ReportChat;
}

const ReportMessageForm: React.FC<props> = ({ report }) => {
  const [text, setText] = React.useState("");
  const [send, { data, error, loading }] = useMutation(gql`
    mutation sendReportMessage($message: String!, $id: ObjectID!) {
      sendReportMessage(id: $id, input: { message: $message }) {
        id
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  React.useEffect(() => {
    if (!data) setText("");
  }, [data, setText]);

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <TextField
        placeholder={"Сообщение..."}
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        name="reporttext"
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey &&
            !(text.length > 2048 || text.length < 1 || loading)
          ) {
            e.preventDefault();
            send({ variables: { id: report.id, message: text } });
            setText("");
          }
        }}
      />
      <IconButton
        disabled={text.length > 2048 || text.length < 1 || loading}
        sx={{ aspectRatio: "1 / 1", height: "min-content" }}
        onClick={() => send({ variables: { id: report.id, message: text } })}
      >
        <IconWrapper size={28}>
          <Icon28Send />
        </IconWrapper>
      </IconButton>
    </Stack>
  );
};

export default ReportMessageForm;
