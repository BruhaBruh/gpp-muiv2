import { useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import { Forum } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const ForumEdit: React.FC<{ forum: Forum }> = ({ forum }) => {
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
  const { enqueueSnackbar } = useSnackbar();
  const [link, setLink] = React.useState(forum.link ?? "");
  const [name, setName] = React.useState(forum.name);
  const [forumId, setForumId] = React.useState(forum.parentForumId ?? -1);
  const [save, { data: saveData, loading: saveLoading, error: saveError }] =
    useMutation(gql`
      mutation editForum($input: ForumEditInput!) {
        editForum(input: $input) {
          forumId
        }
      }
    `);
  const history = useHistory();

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
      <DialogTitle>Редактирование раздела</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Форум-родитель
            </Typography>
            {data?.forums && (
              <Autocomplete
                id="profile"
                fullWidth
                value={
                  data.forums
                    .filter((f) => f.forumId === forumId)
                    .map((f) => ({ value: f.forumId, label: f.name }))[0]
                }
                options={data?.forums.map((f) => ({
                  value: f.forumId,
                  label: f.name,
                }))}
                getOptionLabel={(option) => option.label}
                clearText="Очистить"
                openText="Открыть"
                closeText="Закрыть"
                loading={loading}
                loadingText="Загрузка..."
                noOptionsText="Не найдено"
                autoHighlight
                onChange={(e, value) => {
                  if (value) setForumId(value.value);
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
            )}
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
          <Button
            size="medium"
            fullWidth
            disabled={
              link.length > 256 ||
              name.length < 1 ||
              name.length > 128 ||
              forumId === -1 ||
              saveLoading
            }
            onClick={() =>
              save({
                variables: {
                  input: {
                    id: forum.forumId,
                    name: name,
                    link: link,
                    parentForumId: forumId,
                  },
                },
              })
            }
          >
            Сохранить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ForumEdit;
