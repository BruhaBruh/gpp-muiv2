import { useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Icon20BlockOutline,
  Icon20MessageOutline,
  Icon20UserAddOutline,
  Icon20UserSlashOutline,
} from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router";
import { Permissions } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions } from "../../redux/userData/types";

interface props {
  updateProfile: () => void;
}

const ProfileHeaderButtons: React.FC<props> = ({ updateProfile }) => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );
  const status = useAppSelector((state) => state.currentProfile.status);
  const permissions = useAppSelector((state) => state.userData.permissions);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [ban, { data: banSuccess, loading: banLoading, error: banError }] =
    useMutation(
      gql`
        mutation ban($user: ObjectID!, $banned: Boolean!) {
          editUser(id: $user, input: { banned: $banned }) {
            id
          }
        }
      `
    );
  const [
    startChat,
    {
      data: startChatSuccess,
      loading: startChatLoading,
      error: startChatError,
    },
  ] = useMutation(gql`
    mutation ($profile: ObjectID!) {
      createChat(input: { withProfile: $profile, type: DIALOG }) {
        id
        lastMessage {
          id
          message
        }
      }
    }
  `);
  const [
    removeFromBlacklist,
    {
      data: removeBlacklistSuccess,
      loading: removeBlacklistLoading,
      error: removeBlacklistError,
    },
  ] = useMutation(gql`
    mutation removeFromBlacklist($id: ObjectID!) {
      removeFromBlacklist(id: $id) {
        id
      }
    }
  `);
  const [
    addToBlacklist,
    {
      data: addBlacklistSuccess,
      loading: addBlacklistLoading,
      error: addBlacklistError,
    },
  ] = useMutation(gql`
    mutation addToBlacklist($id: ObjectID!) {
      addToBlacklist(id: $id) {
        id
      }
    }
  `);
  const [
    startSub,
    { data: startSuccess, loading: startLoading, error: startError },
  ] = useMutation(gql`
    mutation startSub($id: ObjectID!) {
      startSubscribe(id: $id) {
        id
      }
    }
  `);
  const [endSub, { data: endSuccess, loading: endLoading, error: endError }] =
    useMutation(gql`
      mutation endSub($id: ObjectID!) {
        endSubscribe(id: $id) {
          id
        }
      }
    `);
  const [
    removeFriend,
    { data: removeSuccess, loading: removeLoading, error: removeError },
  ] = useMutation(gql`
    mutation removeFriend($id: ObjectID!) {
      removeFriend(id: $id) {
        id
      }
    }
  `);

  React.useEffect(() => {
    if (!startChatSuccess) return;
    history.push("/chats/" + startChatSuccess.createChat.id);
  }, [startChatSuccess, history]);

  React.useEffect(() => {
    if (
      !startSuccess &&
      !endSuccess &&
      !removeSuccess &&
      !addBlacklistSuccess &&
      !removeBlacklistSuccess &&
      !banSuccess
    )
      return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    updateProfile();
    // eslint-disable-next-line
  }, [
    startSuccess,
    endSuccess,
    banSuccess,
    removeSuccess,
    addBlacklistSuccess,
    removeBlacklistSuccess,
    enqueueSnackbar,
  ]);

  React.useEffect(() => {
    if (
      !startError &&
      !endError &&
      !removeError &&
      !addBlacklistError &&
      !removeBlacklistError &&
      !startChatError &&
      !banError
    )
      return;
    enqueueSnackbar(
      startError?.message ||
        endError?.message ||
        removeError?.message ||
        addBlacklistError?.message ||
        removeBlacklistError?.message ||
        startChatError?.message ||
        banError?.message,
      { variant: "error" }
    );
  }, [
    startError,
    endError,
    removeError,
    banError,
    enqueueSnackbar,
    addBlacklistError,
    removeBlacklistError,
    startChatError,
  ]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "end", overflowX: "scroll" }}
      className="hide-scrollbar"
    >
      <div style={{ display: "flex", width: "max-content" }}>
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          !status.heInBlacklist &&
          !status.inBlacklist && (
            <LoadingButton
              endIcon={<Icon20MessageOutline />}
              loading={startChatLoading}
              disabled={startChatLoading}
              color="primary"
              variant="outlined"
              onClick={() =>
                startChat({
                  variables: { profile: currentProfile.id },
                })
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Написать
            </LoadingButton>
          )}
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          !status.inBlacklist &&
          !status.heInBlacklist &&
          !status.isSubscriber &&
          !status.isFriend && (
            <LoadingButton
              endIcon={<Icon20UserAddOutline />}
              loading={startLoading}
              disabled={startLoading}
              color="inherit"
              variant="outlined"
              onClick={() =>
                startSub({
                  variables: { id: currentProfile.id },
                })
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Добавить в друзья
            </LoadingButton>
          )}
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          status.isSubscriber && (
            <LoadingButton
              endIcon={<Icon20UserSlashOutline />}
              loading={endLoading}
              disabled={endLoading}
              color="inherit"
              variant="outlined"
              onClick={() =>
                endSub({
                  variables: { id: currentProfile.id },
                })
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Отписаться
            </LoadingButton>
          )}
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          status.isFriend && (
            <LoadingButton
              endIcon={<Icon20UserSlashOutline />}
              loading={removeLoading}
              disabled={removeLoading}
              color="warning"
              variant="outlined"
              onClick={() =>
                removeFriend({
                  variables: { id: currentProfile.id },
                })
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Удалить из друзей
            </LoadingButton>
          )}
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          !status.isFriend &&
          !status.isSubscriber &&
          !status.heInBlacklist && (
            <LoadingButton
              endIcon={<Icon20BlockOutline />}
              loading={addBlacklistLoading}
              disabled={addBlacklistLoading}
              color="error"
              variant="outlined"
              onClick={() =>
                addToBlacklist({
                  variables: { id: currentProfile.id },
                })
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              В черный список
            </LoadingButton>
          )}
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          status.heInBlacklist && (
            <LoadingButton
              endIcon={<Icon20BlockOutline />}
              loading={removeBlacklistLoading}
              disabled={removeBlacklistLoading}
              color="error"
              variant="outlined"
              onClick={() =>
                removeFromBlacklist({
                  variables: { id: currentProfile.id },
                })
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Удалить из черного списка
            </LoadingButton>
          )}
        {currentProfile &&
          profileId !== currentProfile.id &&
          status !== undefined &&
          !checkPermissions(
            Permissions.UserPreventBan,
            currentProfile.user.permissions
          ) &&
          checkPermissions(Permissions.UserSetBan, permissions) && (
            <LoadingButton
              endIcon={<Icon20BlockOutline />}
              loading={banLoading}
              disabled={banLoading}
              color="error"
              variant="contained"
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
                        Бан профиля {currentProfile.nickname}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Вы уверены, что хотите забанить этот профиль?
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
                            dispatch(setModal(null));
                            ban({
                              variables: {
                                user: currentProfile.user.id,
                                banned: true,
                              },
                            });
                          }}
                          size="medium"
                        >
                          Забанить
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )
                )
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Забанить
            </LoadingButton>
          )}
        {currentProfile &&
          currentProfile.user.banned &&
          currentProfile.id !== profileId &&
          !checkPermissions(
            Permissions.UserPreventBan,
            currentProfile.user.permissions
          ) &&
          checkPermissions(Permissions.UserRemoveBan, permissions) && (
            <LoadingButton
              endIcon={<Icon20BlockOutline />}
              loading={banLoading}
              disabled={banLoading}
              color="error"
              variant="contained"
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
                        Разбан профиля {currentProfile.nickname}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Вы уверены, что хотите разбанить этот профиль?
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
                            dispatch(setModal(null));
                            ban({
                              variables: {
                                user: currentProfile.user.id,
                                banned: false,
                              },
                            });
                          }}
                          size="medium"
                        >
                          Разбанить
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )
                )
              }
              sx={{
                marginRight: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.text.primary,
                width: "max-content",
              }}
            >
              Разбанить
            </LoadingButton>
          )}
      </div>
    </Box>
  );
};

export default ProfileHeaderButtons;
