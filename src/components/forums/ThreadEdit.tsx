import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import { Thread } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const ThreadEdit: React.FC<{ thread: Thread }> = ({ thread }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = React.useState(thread.name);
  const [isPinned, setIsPinned] = React.useState(thread.isPinned ?? false);
  const [canChat, setCanChat] = React.useState(thread.canChat ?? false);
  const history = useHistory();
  const [save, { data: saveData, loading: saveLoading, error: saveError }] =
    useMutation(gql`
      mutation editThread($input: ThreadEditInput!) {
        editThread(input: $input) {
          threadId
        }
      }
    `);

  const reload = () => {
    const current = window.location.pathname;
    history.replace(`/reload`);
    setTimeout(() => {
      history.replace(current);
    });
  };

  React.useEffect(() => {
    if (!saveData) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    reload();
    dispatch(setModal(null));
    // eslint-disable-next-line
  }, [saveData, enqueueSnackbar, dispatch]);

  React.useEffect(() => {
    if (!saveError) return;
    enqueueSnackbar(saveError.message, { variant: "error" });
  }, [saveError, enqueueSnackbar]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <DialogTitle>Редактирование темы</DialogTitle>
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
          <Stack direction="row" spacing={1}>
            <ToggleButton
              value="pin"
              selected={isPinned}
              onClick={() => setIsPinned((prev) => !prev)}
              sx={{ flex: 1 }}
            >
              Закреплено: {isPinned ? "Да" : "Нет"}
            </ToggleButton>
            <ToggleButton
              value="chat"
              selected={!canChat}
              onClick={() => setCanChat((prev) => !prev)}
              sx={{ flex: 1 }}
            >
              Закрыт: {canChat ? "Нет" : "Да"}
            </ToggleButton>
          </Stack>
          <Button
            disabled={saveLoading || name.length < 1 || name.length > 128}
            size="medium"
            fullWidth
            onClick={() =>
              save({
                variables: {
                  input: {
                    canChat: canChat,
                    id: thread.threadId,
                    isPinned: isPinned,
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

export default ThreadEdit;
