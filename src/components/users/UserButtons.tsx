import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Button, LinearProgress, MenuItem, Select, Stack } from "@mui/material";
import {
  Icon20UserSlashOutline,
  Icon24BlockOutline,
  Icon24UnblockOutline,
  Icon24UserAddedOutline,
  Icon24UserAddOutline,
  Icon24Users3Outline,
} from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { User, UserRoleEnum, UserStatus } from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUserUpdate } from "../../redux/cache/reducer";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions, Permissions } from "../../redux/userData/types";
import IconWrapper from "../ui/IconWrapper";
import EditSocialPoints from "./EditSocialPoints";

const UserButtons = () => {
  const user = useAppSelector((state) => state.cache.user) as User;
  const userId = useAppSelector((state) => state.userData.userId);
  const permissions = useAppSelector((state) => state.userData.permissions);
  const { enqueueSnackbar } = useSnackbar();
  const [getStatus, { data, error, loading }] = useLazyQuery<{
    status: UserStatus;
  }>(
    gql`
      query status($id: Int!) {
        status(id: $id) {
          heIsSubscriber
          youIsSubscriber
          isFriends
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );
  const dispatch = useAppDispatch();

  const [
    startSubscriber,
    { data: startData, error: startError, loading: startLoading },
  ] = useMutation(gql`
    mutation startSubscribe($id: Int!) {
      startSubscribe(id: $id) {
        userId
      }
    }
  `);

  const [
    endSubscriber,
    { data: endData, error: endError, loading: endLoading },
  ] = useMutation(gql`
    mutation endSubscribe($id: Int!) {
      endSubscribe(id: $id) {
        userId
      }
    }
  `);

  const [
    removeFriend,
    { data: removeData, error: removeError, loading: removeLoading },
  ] = useMutation(gql`
    mutation removeFriend($id: Int!) {
      removeFriend(id: $id) {
        userId
      }
    }
  `);

  const [
    setRating,
    { data: ratingData, error: ratingError, loading: ratingLoading },
  ] = useMutation(gql`
    mutation setRating($id: Int!, $positive: Boolean) {
      setRating(id: $id, positive: $positive) {
        userId
      }
    }
  `);

  const [edit, { data: editData, error: editError, loading: editLoading }] =
    useMutation(gql`
      mutation editUser($id: Int!, $isBanned: Boolean, $role: UserRoleEnum) {
        editUser(id: $id, input: { isBanned: $isBanned, role: $role }) {
          userId
        }
      }
    `);

  React.useEffect(() => {
    if (
      !error &&
      !startError &&
      !endError &&
      !removeError &&
      !ratingError &&
      !editError
    )
      return;
    enqueueSnackbar(
      error?.message ||
        startError?.message ||
        endError?.message ||
        removeError?.message ||
        ratingError?.message ||
        editError?.message,
      {
        variant: "error",
      }
    );
  }, [
    error,
    startError,
    endError,
    removeError,
    ratingError,
    enqueueSnackbar,
    editError,
  ]);

  React.useEffect(() => {
    if (!user) return;
    getStatus({ variables: { id: user.userId } });
  }, [user, getStatus]);

  React.useEffect(() => {
    if (!startData && !endData && !removeData && !ratingData && !editData)
      return;
    dispatch(setUserUpdate(true));
  }, [startData, endData, removeData, ratingData, dispatch, editData]);

  const openEditSocialPoints = () =>
    dispatch(setModal(<EditSocialPoints userId={user.userId} />));

  return loading ? (
    <LinearProgress />
  ) : (
    <Stack spacing={1} direction={"row"} flex={1} justifyContent="end">
      {user.userId !== userId && (
        <Select
          defaultValue={user.rating.your.toString()}
          onChange={(e) => {
            switch (e.target.value) {
              case "0": {
                setRating({
                  variables: {
                    id: user.userId,
                    positive: null,
                  },
                });
                break;
              }
              default: {
                setRating({
                  variables: {
                    id: user.userId,
                    positive: e.target.value === "1",
                  },
                });
              }
            }
          }}
          disabled={ratingLoading}
          size={"small"}
          displayEmpty
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 0,
            },
          }}
        >
          <MenuItem value="1">Положительно</MenuItem>
          <MenuItem value="0">Нейтрально</MenuItem>
          <MenuItem value="-1">Отрицательно</MenuItem>
        </Select>
      )}
      {data?.status.heIsSubscriber && (
        <Button
          color="primary"
          size="medium"
          sx={{ whiteSpace: "nowrap" }}
          disabled={startLoading}
          onClick={() => startSubscriber({ variables: { id: user.userId } })}
          endIcon={
            <IconWrapper size={20}>
              <Icon24UserAddedOutline />
            </IconWrapper>
          }
        >
          Принять в друзья
        </Button>
      )}
      {!data?.status.heIsSubscriber &&
        !data?.status.isFriends &&
        !data?.status.youIsSubscriber && (
          <Button
            color="inherit"
            size="medium"
            sx={{ whiteSpace: "nowrap" }}
            disabled={startLoading}
            onClick={() => startSubscriber({ variables: { id: user.userId } })}
            endIcon={
              <IconWrapper size={20}>
                <Icon24UserAddOutline />
              </IconWrapper>
            }
          >
            Добавить в друзья
          </Button>
        )}
      {data?.status.youIsSubscriber && (
        <Button
          color="error"
          size="medium"
          sx={{ whiteSpace: "nowrap" }}
          disabled={endLoading}
          onClick={() => endSubscriber({ variables: { id: user.userId } })}
          endIcon={
            <IconWrapper size={20}>
              <Icon20UserSlashOutline />
            </IconWrapper>
          }
        >
          Отписаться
        </Button>
      )}
      {data?.status.isFriends && (
        <Button
          color="error"
          size="medium"
          sx={{ whiteSpace: "nowrap" }}
          disabled={removeLoading}
          onClick={() => removeFriend({ variables: { id: user.userId } })}
          endIcon={
            <IconWrapper size={20}>
              <Icon20UserSlashOutline />
            </IconWrapper>
          }
        >
          Удалить из друзей
        </Button>
      )}
      {checkPermissions(Permissions.ModifySocialPoints, permissions) && (
        <Button
          color="info"
          size="medium"
          sx={{ whiteSpace: "nowrap" }}
          onClick={openEditSocialPoints}
          endIcon={
            <IconWrapper size={20}>
              <Icon24Users3Outline />
            </IconWrapper>
          }
        >
          Соц. Рейтинг
        </Button>
      )}
      {checkPermissions(Permissions.ModifyRoles, permissions) && (
        <Select
          defaultValue={user.userRole}
          disabled={editLoading}
          onChange={(e) => {
            edit({ variables: { id: user.userId, role: e.target.value } });
          }}
          size={"small"}
          displayEmpty
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 0,
            },
          }}
        >
          <MenuItem value={UserRoleEnum.None}>Игрок</MenuItem>
          <MenuItem value={UserRoleEnum.JrModerator}>Мл. Модератор</MenuItem>
          <MenuItem value={UserRoleEnum.Moderator}>Модератор</MenuItem>
          <MenuItem value={UserRoleEnum.Admin}>Администратор</MenuItem>
        </Select>
      )}
      {checkPermissions(Permissions.SetBan, permissions) && !user.isBanned && (
        <Button
          color="error"
          size="medium"
          sx={{ whiteSpace: "nowrap" }}
          disabled={editLoading}
          onClick={() =>
            edit({ variables: { id: user.userId, isBanned: true } })
          }
          endIcon={
            <IconWrapper size={20}>
              <Icon24BlockOutline />
            </IconWrapper>
          }
        >
          Забанить
        </Button>
      )}
      {checkPermissions(Permissions.RemoveBan, permissions) && user.isBanned && (
        <Button
          color="error"
          size="medium"
          sx={{ whiteSpace: "nowrap" }}
          disabled={editLoading}
          onClick={() =>
            edit({ variables: { id: user.userId, isBanned: false } })
          }
          endIcon={
            <IconWrapper size={20}>
              <Icon24UnblockOutline />
            </IconWrapper>
          }
        >
          Разбанить
        </Button>
      )}
    </Stack>
  );
};

export default UserButtons;
