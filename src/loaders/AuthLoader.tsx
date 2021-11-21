import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import React from "react";
import { User } from "../graphql/types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setAuthenticated,
  setAvatar,
  setLoading,
  setLoggedIn,
  setNickname,
  setPermissions,
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
  }>(gql`
    query getMe {
      me {
        userId
        permissions
        nickname
        userRole
        avatar
      }
    }
  `);

  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useAppSelector((state) => state.userData.isLoggedIn);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    login();
    const t = setInterval(login, 10000);
    return () => clearInterval(t);
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
    enqueueSnackbar(error?.message || meError?.message, { variant: "error" });
  }, [error, meError, enqueueSnackbar, dispatch]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    getMe();
  }, [isLoggedIn, getMe]);

  React.useEffect(() => {
    if (!meData) return;
    dispatch(setNickname(meData.me.nickname));
    dispatch(setPermissions(meData.me.permissions));
    dispatch(setUserId(meData.me.userId));
    dispatch(setUserRole(meData.me.userRole));
    dispatch(setAvatar(meData.me.avatar));
  }, [meData, dispatch]);

  return <></>;
};

export default AuthLoader;
