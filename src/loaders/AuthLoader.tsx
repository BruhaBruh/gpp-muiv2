import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import React from "react";
import { User } from "../graphql/types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setAuthenticated,
  setAvatar,
  setBanreportEndAt,
  setLoading,
  setLoggedIn,
  setNickname,
  setPermissions,
  setSettings,
  setSubscriptionEndAt,
  setUpdateUser,
  setUserId,
  setUserRole,
} from "../redux/userData/reducer";

const AuthLoader = () => {
  const [login, { data, error }] = useMutation<{ login: boolean }>(gql`
    mutation login {
      login
    }
  `);

  const [getMe, { data: meData, error: meError }] = useLazyQuery<{
    me: User;
  }>(
    gql`
      query getMe {
        me {
          userId
          permissions
          nickname
          userRole
          avatar
          settings
          banreportEndAt
          subscriptionEndAt
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useAppSelector((state) => state.userData.isLoggedIn);
  const dispatch = useAppDispatch();
  const update = useAppSelector((state) => state.userData.updateUser);

  React.useEffect(() => {
    login();
  }, [login]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(setLoggedIn(data.login));
    dispatch(setAuthenticated(true));
    dispatch(setLoading(false));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!error && !meError) return;
    dispatch(setLoading(false));
    dispatch(setLoggedIn(false));
    dispatch(setAuthenticated(false));
    const t = setTimeout(login, 15000);
    enqueueSnackbar(
      error?.message.includes(
        "The current user is not authorized to access this resource."
      )
        ? "Вы не авторизованы"
        : error?.message || meError?.message,
      { variant: "error" }
    );
    return () => clearTimeout(t);
  }, [error, meError, enqueueSnackbar, dispatch, login]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    getMe();
    const t = setInterval(getMe, 10000);
    return () => clearInterval(t);
  }, [isLoggedIn, getMe]);

  React.useEffect(() => {
    if (!isLoggedIn || !update) return;
    getMe();
    dispatch(setUpdateUser(false));
  }, [getMe, isLoggedIn, dispatch, update]);

  React.useEffect(() => {
    if (!meData) return;
    dispatch(setNickname(meData.me.nickname));
    dispatch(setPermissions(meData.me.permissions));
    dispatch(setUserId(meData.me.userId));
    dispatch(setUserRole(meData.me.userRole));
    dispatch(setAvatar(meData.me.avatar));
    dispatch(setBanreportEndAt(meData.me.banreportEndAt));
    dispatch(setSubscriptionEndAt(meData.me.subscriptionEndAt));
    dispatch(setSettings(meData.me.settings));
  }, [meData, dispatch]);

  return <></>;
};

export default AuthLoader;
