import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import RichText from "../ui/RichText";

const CreateThreadForUser: React.FC<{ forumId: number }> = ({ forumId }) => {
  const dispatch = useAppDispatch();
  const [
    create,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(gql`
    mutation createThread($input: ThreadCreateInput!) {
      createThread(input: $input) {
        threadId
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const history = useHistory();

  const reload = () => {
    const current = window.location.pathname;
    history.replace(`/reload`);
    setTimeout(() => {
      history.replace(current);
    });
  };

  React.useEffect(() => {
    if (!createData) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    setName("");
    setMessage("");
    reload();
    dispatch(setModal(null));
    // eslint-disable-next-line
  }, [createData, enqueueSnackbar, setName, setMessage, dispatch]);

  React.useEffect(() => {
    if (!createError) return;
    enqueueSnackbar(createError.message, { variant: "error" });
  }, [createError, enqueueSnackbar]);

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <DialogTitle>Cоздание темы</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Название
            </Typography>
            <TextField
              margin="none"
              size="small"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              error={name.length < 1 || name.length > 128}
              helperText={
                name.length < 1 || name.length > 128
                  ? "От 1 до 128 символов"
                  : undefined
              }
            />
          </Stack>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Сообщение
            </Typography>
            <RichText value={message} onChange={(v) => setMessage(v)} />
          </Stack>
          <Button
            disabled={
              createLoading ||
              message.length < 1 ||
              message.length > 20000 ||
              name.length < 1 ||
              name.length > 128
            }
            size="medium"
            fullWidth
            onClick={() =>
              create({
                variables: {
                  input: {
                    canChat: true,
                    forumId: forumId,
                    isPinned: false,
                    message: message,
                    name: name,
                  },
                },
              })
            }
          >
            Создать
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadForUser;
