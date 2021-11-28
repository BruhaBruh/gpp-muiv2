import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon24CancelOutline, Icon28SendOutline } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { Reportmessage } from "../../graphql/types";
import { getLastOnline } from "../../redux/userData/types";
import IconWrapper from "../ui/IconWrapper";

const ReportMessageForm: React.FC<{
  reportId: number;
  setReplied: React.Dispatch<React.SetStateAction<Reportmessage | null>>;
  replied: Reportmessage | null;
}> = ({ setReplied, replied, reportId }) => {
  const [text, setText] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [send, { data, error }] = useMutation(gql`
    mutation sendReportMessage($report: Int!, $message: String!, $reply: Int) {
      sendReportMessage(
        input: { reportId: $report, message: $message, replyMessageId: $reply }
      ) {
        reportId
      }
    }
  `);

  React.useEffect(() => {
    if (!data) return;
    setText("");
    setReplied(null);
  }, [data, setText, setReplied]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Stack spacing={0.5}>
      {replied && (
        <Stack
          spacing={0.5}
          direction={"row"}
          sx={{ padding: (theme) => `0 ${theme.spacing(1)}` }}
        >
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            badgeContent={
              getLastOnline(replied.owner.lastOnline) === "Онлайн" ? " " : 0
            }
            overlap="circular"
            color={"success"}
            sx={{
              height: "min-content",
              alignSelf: "center",
              ".MuiBadge-dot": {
                border: (theme) =>
                  `2px solid ${theme.palette.background.paper}`,
                minWidth: "auto",
                width: "4px",
                height: "4px",
                borderRadius: "100px",
                boxSizing: "content-box",
              },
            }}
          >
            <Avatar
              src={replied.owner.avatar}
              children={replied.owner.nickname.substr(0, 1)}
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </Badge>
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              alignSelf: "center",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {replied.message}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton
            color="inherit"
            sx={{
              alignSelf: "end",
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => setReplied(null)}
          >
            <IconWrapper size={16}>
              <Icon24CancelOutline />
            </IconWrapper>
          </IconButton>
        </Stack>
      )}
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
              if (text.trim().length >= 1 && text.trim().length <= 1000) {
                send({
                  variables: {
                    report: reportId,
                    message: text.trim(),
                    reply: replied === null ? null : replied.reportmessageId,
                  },
                });
              }
            }
          }}
        />
        {text.trim().length >= 1 && text.trim().length <= 1000 && (
          <IconButton
            size="medium"
            color="primary"
            sx={{ alignSelf: "end" }}
            onClick={() =>
              send({
                variables: {
                  report: reportId,
                  message: text.trim(),
                  reply: replied === null ? null : replied.reportmessageId,
                },
              })
            }
          >
            <IconWrapper>
              <Icon28SendOutline />
            </IconWrapper>
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default ReportMessageForm;
