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

const CreateForum = () => {
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
    mutation createForum($input: ForumCreateInput!) {
      createForum(input: $input) {
        forumId
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();
  const [forum, setForum] = React.useState(-1);
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
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
    reload();
    setLink("");
    setForum(-1);
    setName("");
    // eslint-disable-next-line
  }, [createData, enqueueSnackbar, setLink, setForum, setName]);

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
      <DialogTitle>Cоздание раздела</DialogTitle>
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
              Ссылка (можно оставить пустым)
            </Typography>
            <TextField
              margin="none"
              size="small"
              fullWidth
              variant="outlined"
              value={link}
              onChange={(e) => setLink(e.currentTarget.value)}
              error={link.length > 256}
              helperText={link.length > 256 ? "до 256 символов" : undefined}
            />
          </Stack>
          <ToggleButton
            value="pin"
            selected={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            sx={{ flex: 1 }}
          >
            Открытое создание тем: {isOpen ? "Да" : "Нет"}
          </ToggleButton>
          <Button
            size="medium"
            fullWidth
            disabled={
              link.length > 256 ||
              name.length < 1 ||
              name.length > 128 ||
              forum === -1 ||
              createLoading
            }
            onClick={() =>
              create({
                variables: {
                  input: {
                    name: name,
                    link: link,
                    parentForumId: forum,
                    isOpen: isOpen,
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

export default CreateForum;
