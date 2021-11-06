import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { ProfileSearchResult } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import ProfileIcons from "../profile/ProfileIcons";

const ChatCreate = () => {
  const dispatch = useAppDispatch();
  const [
    startChat,
    {
      data: startChatSuccess,
      loading: startChatLoading,
      error: startChatError,
    },
  ] = useMutation(gql`
    mutation ($profile: ObjectID!) {
      createChat(input: { withProfile: $profile, type: CHAT }) {
        id
        lastMessage {
          id
          message
        }
      }
    }
  `);
  const serverId = useAppSelector((state) => state.userData.serverId);
  const timer = React.useRef<any>();
  const [getProfiles, { data: profilesData, loading: profilesLoading }] =
    useLazyQuery<{
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
  const form = useFormik({
    initialValues: {
      profile: "",
    },
    onSubmit: (values) => {
      startChat({ variables: { profile: values.profile } });
    },
  });
  const profileId = useAppSelector((state) => state.userData.profileId);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    getProfiles({ variables: { search: "" } });
  }, [getProfiles]);

  React.useEffect(() => {
    if (!startChatSuccess) return;
    window.location.pathname = "/chats/" + startChatSuccess.createChat.id;
  }, [startChatSuccess]);

  React.useEffect(() => {
    if (!startChatError) return;
    enqueueSnackbar(startChatError.message, { variant: "error" });
  }, [startChatError, enqueueSnackbar]);

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
        <DialogTitle id="alert-dialog-title">Создание чата</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ width: "100%" }}>
              <InputLabel id="profile">Профиль для начала беседы</InputLabel>
              <div style={{ display: "flex" }}>
                <Autocomplete
                  id="profile"
                  fullWidth
                  options={
                    profilesData
                      ? profilesData.profiles.result
                          .filter((p) => p.id !== profileId)
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
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) =>
                    form.setFieldValue("profile", value ? value.value : "")
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="text"
            size="large"
            type="submit"
            disabled={
              !form.isValid ||
              startChatLoading ||
              JSON.stringify(form.initialValues) === JSON.stringify(form.values)
            }
            fullWidth
          >
            Создать
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ChatCreate;
