import { useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import { Forum } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const CreateThread = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useQuery<{ forums: Forum[] }>(
    gql`
      query forums {
        forums(where: { link: { eq: null } }) {
          forumId
          name
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );
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
  const [forum, setForum] = React.useState(-1);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isPinned, setIsPinned] = React.useState(false);
  const [canChat, setCanChat] = React.useState(false);
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
    setForum(-1);
    setName("");
    setMessage("");
    setIsPinned(false);
    setCanChat(false);
    reload();
    // eslint-disable-next-line
  }, [
    createData,
    enqueueSnackbar,
    setForum,
    setName,
    setMessage,
    setIsPinned,
    setCanChat,
  ]);

  React.useEffect(() => {
    if (!createError) return;
    enqueueSnackbar(createError.message, { variant: "error" });
  }, [createError, enqueueSnackbar]);

  return (
    <Dialog
      maxWidth="sm"
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
              Форум-родитель
            </Typography>
            <Autocomplete
              id="profile"
              fullWidth
              options={
                data?.forums
                  ? data?.forums.map((f) => ({
                      value: f.forumId,
                      label: f.name,
                    }))
                  : []
              }
              getOptionLabel={(option) => option.label}
              clearText="Очистить"
              openText="Открыть"
              closeText="Закрыть"
              loading={loading}
              loadingText="Загрузка..."
              noOptionsText="Не найдено"
              autoHighlight
              onChange={(e, value) => {
                if (value) setForum(value.value);
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ width: "100%" }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        flex: 1,
                        width: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Stack>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Stack>
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
            <TextField
              margin="none"
              size="small"
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              error={message.length < 1 || message.length > 6000}
              multiline
              maxRows={5}
              helperText={
                message.length < 1 || message.length > 6000
                  ? "От 1 до 6000 символов"
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
            disabled={
              createLoading ||
              message.length < 1 ||
              message.length > 6000 ||
              name.length < 1 ||
              name.length > 128 ||
              forum === -1
            }
            size="medium"
            fullWidth
            onClick={() =>
              create({
                variables: {
                  input: {
                    canChat: canChat,
                    forumId: forum,
                    isPinned: isPinned,
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

export default CreateThread;
