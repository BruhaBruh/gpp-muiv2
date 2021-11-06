import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { Chat, Profile, ProfileSearchResult } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import ProfileIcons from "../profile/ProfileIcons";

interface props {
  chat: Chat;
}

const formValidatiionSchema = Yup.object().shape({
  avatar: Yup.string()
    .matches(
      /https:\/\/i\.(postimg\.cc|imgur.com)\/.*(\.jpg|\.png|\.jpeg)/i,
      "Ссылка должна быть прямой с ресурса imgur или postimg"
    )
    .max(100, "Максимальная длина 100 символов"),
  name: Yup.string()
    .min(1, "Минимальная длина 1 символ")
    .max(64, "Максимальная длина 64 символа"),
});

const ChatEdit: React.FC<props> = ({ chat }) => {
  const form = useFormik<{
    avatar: string;
    name: string;
    remove: string[];
    add: string[];
  }>({
    initialValues: {
      avatar: chat.avatar,
      name: chat.name,
      remove: [],
      add: [],
    },
    validateOnChange: true,
    validationSchema: formValidatiionSchema,
    onSubmit: (values) => {
      edit({
        variables: {
          avatar: values.avatar,
          name: values.name,
          remove: values.remove,
          add: values.add,
        },
      });
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { data: profilesData, loading: profilesLoading } = useQuery<{
    getChatProfiles: Profile[];
  }>(
    gql`
      query getChatProfiles($chat: ObjectID!) {
        getChatProfiles(chat: $chat) {
          id
          avatar
          banner
          nickname
          lastOnline
          user {
            permissions
          }
        }
      }
    `,
    { variables: { chat: chat.id } }
  );
  const serverId = useAppSelector((state) => state.userData.serverId);
  const profileId = useAppSelector((state) => state.userData.profileId);
  const [
    getProfiles,
    { data: profilesSearchData, loading: profilesSearchLoading },
  ] = useLazyQuery<{
    profiles: ProfileSearchResult;
  }>(
    gql`
      query profiles(
        $server: ObjectID!
        $role: ID
        $search: String
        $limit: Int
        $page: Int
      ) {
        profiles(
          limit: $limit
          page: $page
          server: $server
          role: $role
          search: $search
        ) {
          result {
            id
            avatar
            nickname
            lastOnline
            user {
              permissions
            }
          }
          hasMore
        }
      }
    `,
    {
      fetchPolicy: "no-cache",
      variables: { server: serverId, limit: 25, page: 1, role: null },
    }
  );
  const [removeChat, { data: chatData, error: chatError }] = useMutation(gql`
    mutation buy($chat: ObjectID!) {
      removeChat(id: $chat) {
        id
      }
    }
  `);
  const timer = React.useRef<any>();
  const [edit, { data, error }] = useMutation<
    any,
    {
      chat?: string;
      avatar?: string | null;
      name?: string | null;
      add?: string[] | null;
      remove?: string[] | null;
    }
  >(
    gql`
      mutation editChat(
        $chat: ObjectID!
        $avatar: MediaLink
        $name: String
        $add: [ObjectID!]
        $remove: [ObjectID!]
      ) {
        editChat(
          id: $chat
          input: {
            avatar: $avatar
            name: $name
            removeFromChat: $remove
            addToChat: $add
          }
        ) {
          id
        }
      }
    `,
    {
      variables: {
        chat: chat.id,
        avatar: null,
        name: null,
        add: null,
        remove: null,
      },
    }
  );
  const history = useHistory();

  React.useEffect(() => {
    getProfiles({ variables: { search: "" } });
  }, [getProfiles]);

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Удачно! Изменения вступят в силу в ближайшее время.", {
      variant: "success",
    });
  }, [data, enqueueSnackbar]);

  React.useEffect(() => {
    if (!chatData) return;
    enqueueSnackbar("Чат удален, изменения вступят в силу в ближайшее время.", {
      variant: "success",
    });
    history.push("/chats");
  }, [chatData, history, enqueueSnackbar]);

  React.useEffect(() => {
    if (!error && !chatError) return;
    enqueueSnackbar(error?.message || chatError?.message, { variant: "error" });
  }, [error, chatError, enqueueSnackbar]);

  return (
    <Dialog
      open={true}
      onClose={() => dispatch(setModal(null))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Box
        component="form"
        onSubmit={(e: any) => {
          form.handleSubmit(e as React.FormEvent<HTMLFormElement>);
        }}
      >
        <DialogTitle id="alert-dialog-title">Редактирование чата</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack spacing={1}>
              <div style={{ width: "100%" }}>
                <InputLabel id="status">Название</InputLabel>
                <TextField
                  fullWidth
                  error={!!form.errors.name}
                  color={form.errors.name === "error" ? "error" : undefined}
                  id="name"
                  helperText={form.errors.name ? form.errors.name : undefined}
                  variant="outlined"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  size="small"
                />
              </div>
              <div style={{ width: "100%" }}>
                <InputLabel id="avatar">Аватар</InputLabel>
                <div style={{ display: "flex" }}>
                  <Avatar
                    variant="rounded"
                    src={form.values.avatar}
                    sx={{
                      width: 40,
                      height: 40,
                      marginRight: (theme: Theme) => theme.spacing(1),
                      marginTop: "8px",
                    }}
                    children={chat.name
                      .split(" ")
                      .map((r) => r.split("")[0].toUpperCase())
                      .slice(0, 2)
                      .join("")}
                  />
                  <TextField
                    fullWidth
                    error={!!form.errors.avatar}
                    color={form.errors.avatar === "error" ? "error" : undefined}
                    id="avatar"
                    helperText={
                      form.errors.avatar ? form.errors.avatar : undefined
                    }
                    variant="outlined"
                    name="avatar"
                    value={form.values.avatar}
                    onChange={form.handleChange}
                    size="small"
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <InputLabel id="profile">Добавление</InputLabel>
                <div style={{ display: "flex" }}>
                  <Autocomplete
                    id="add"
                    fullWidth
                    options={
                      profilesSearchData
                        ? profilesSearchData.profiles.result
                            .filter(
                              (p) =>
                                !chat.profiles
                                  .map((d) => d.id)
                                  .includes(p.id) &&
                                !form.values.add.includes(p.id)
                            )
                            .map((profile) => ({
                              value: profile.id,
                              label: profile.nickname,
                              avatar: profile.avatar,
                              lastOnline: profile.lastOnline,
                              permissions: profile.user.permissions,
                            }))
                        : []
                    }
                    loading={profilesSearchLoading}
                    loadingText="Загрузка..."
                    noOptionsText="Не найдено"
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    onChange={(e, value) =>
                      form.setFieldValue(
                        "add",
                        value ? value.map((v) => v.value) : form.values.add
                      )
                    }
                    multiple
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
                          <Badge
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                            badgeContent={
                              getLastOnline(option.lastOnline) === "Онлайн"
                                ? " "
                                : 0
                            }
                            overlap="circular"
                            color={"success"}
                          >
                            <Avatar
                              src={option.avatar}
                              sx={{
                                width: 40,
                                height: 40,
                              }}
                              children={option.label.substr(0, 2)}
                            />
                          </Badge>
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
                          <ProfileIcons
                            permissions={option.permissions}
                            height="40px"
                          />
                        </Stack>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => {
                          clearTimeout(timer.current);

                          timer.current = setTimeout(
                            () =>
                              getProfiles({
                                variables: { search: e.target.value },
                              }),
                            500
                          );
                        }}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <InputLabel id="profile">Удаление</InputLabel>
                <div style={{ display: "flex" }}>
                  <Autocomplete
                    id="add"
                    fullWidth
                    options={
                      profilesData
                        ? profilesData.getChatProfiles
                            .filter(
                              (p) =>
                                !form.values.remove.includes(p.id) &&
                                p.id !== profileId
                            )
                            .map((profile) => ({
                              value: profile.id,
                              label: profile.nickname,
                              avatar: profile.avatar,
                              lastOnline: profile.lastOnline,
                              permissions: profile.user.permissions,
                            }))
                        : []
                    }
                    loading={profilesLoading}
                    loadingText="Загрузка..."
                    noOptionsText="Не найдено"
                    autoHighlight
                    multiple
                    getOptionLabel={(option) => option.label}
                    onChange={(e, value) =>
                      form.setFieldValue(
                        "remove",
                        value ? value.map((v) => v.value) : form.values.remove
                      )
                    }
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
                          <Badge
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                            badgeContent={
                              getLastOnline(option.lastOnline) === "Онлайн"
                                ? " "
                                : 0
                            }
                            overlap="circular"
                            color={"success"}
                          >
                            <Avatar
                              src={option.avatar}
                              sx={{
                                width: 40,
                                height: 40,
                              }}
                              children={option.label.substr(0, 2)}
                            />
                          </Badge>
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
                          <ProfileIcons
                            permissions={option.permissions}
                            height="40px"
                          />
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
                </div>
              </div>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
              <Button
                color="error"
                variant="text"
                size="large"
                onClick={() =>
                  dispatch(
                    setModal(
                      <Dialog
                        open={true}
                        onClose={() => dispatch(setModal(null))}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="sm"
                      >
                        <DialogTitle id="alert-dialog-title">
                          Удаление чата
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Вы уверены, что хотите удалить чат?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            color="inherit"
                            onClick={() => dispatch(setModal(null))}
                            autoFocus
                            size="medium"
                          >
                            Отмена
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              removeChat({ variables: { chat: chat.id } });
                              dispatch(setModal(null));
                              window.location.pathname = "/chats";
                            }}
                            size="medium"
                          >
                            Удалить
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )
                  )
                }
                fullWidth
              >
                Удалить
              </Button>
              <Button
                color="inherit"
                variant="text"
                size="large"
                onClick={() => dispatch(setModal(null))}
                fullWidth
              >
                Отмена
              </Button>
            </Stack>
            <Button
              color="success"
              variant="text"
              size="large"
              type="submit"
              disabled={
                !form.isValid ||
                JSON.stringify(form.initialValues) ===
                  JSON.stringify(form.values)
              }
              fullWidth
            >
              Сохранить
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ChatEdit;
