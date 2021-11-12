import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { Profile, UserStatus } from "../graphql/graphql";
import { getCookie } from "../libs/cookieService";
import {
  setBlacklist,
  setIsLoading,
  setIsLoggedIn,
  setIsValidated,
  setNickname,
  setOnServer,
  setPermissions,
  setProfileId,
  setRoles,
  setServerId,
  setUserId,
} from "../redux/userData/reducer";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [getProfile, { data: profileData, error: profileError }] =
    useLazyQuery<{
      profile: Profile;
    }>(
      gql`
        query getProfile($id: ObjectID!) {
          profile(id: $id) {
            id
            nickname
            roles {
              id
              color
              hoist
              name
              position
            }
            server
            blacklist {
              id
            }
            user {
              id
              permissions
            }
          }
        }
      `
    );

  const [getStatus, { data: statusData, error: statusError }] = useLazyQuery<{
    status: UserStatus;
  }>(
    gql`
      query getStatus($id: ObjectID!) {
        status(server: $id) {
          isValidated
          onServer
        }
      }
    `
  );
  const [selectServer, { data: selectData, error: selectError }] = useMutation<{
    selectProfile: Profile;
  }>(
    gql`
      mutation selectServer($server: ObjectID!) {
        selectProfile(server: $server) {
          id
          nickname
          roles {
            id
            color
            hoist
            name
            position
          }
          server
          blacklist {
            id
          }
          user {
            id
            permissions
          }
        }
      }
    `,
    { variables: { server: 1 } }
  );

  React.useEffect(() => {
    if (!statusError && !profileError && !selectError) return;
    enqueueSnackbar(
      statusError?.message ||
        profileError?.message === "Unexpected token < in JSON at position 0"
        ? "Ошибка авторизации дискорда. Попробуйте позже"
        : profileError?.message || selectError?.message,
      {
        variant: "error",
      }
    );
  }, [statusError, profileError, enqueueSnackbar, selectError]);

  React.useEffect(() => {
    if (!!getCookie("access_token")) {
      dispatch(setIsLoggedIn(true));
      const selected_profile = getCookie("selected_profile");
      if (!!selected_profile) {
        if (!/^\d*$/.test(selected_profile)) {
          window.location.pathname = "/auth/logout";
          return;
        }
        dispatch(setProfileId(Number(selected_profile)));
        getProfile({
          variables: {
            id: selected_profile,
          },
        });
      } else {
        selectServer();
      }
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, getProfile, selectServer]);

  React.useEffect(() => {
    if (!profileData) return;
    getStatus({ variables: { id: profileData.profile.server } });
    dispatch(setNickname(profileData.profile.nickname));
    dispatch(setServerId(profileData.profile.server));
    dispatch(setPermissions(profileData.profile.user.permissions));
    dispatch(setRoles(profileData.profile.roles));
    dispatch(setUserId(profileData.profile.user.id));
    dispatch(setBlacklist(profileData.profile.blacklist.map((el) => el.id)));
  }, [profileData, dispatch, getStatus]);

  React.useEffect(() => {
    if (!statusData) return;
    dispatch(setOnServer(statusData.status.onServer));
    dispatch(setIsValidated(statusData.status.isValidated));
    dispatch(setIsLoading(false));
  }, [statusData, dispatch]);

  React.useEffect(() => {
    if (!selectData) return;
    getStatus({ variables: { id: selectData.selectProfile.server } });
    dispatch(setProfileId(selectData.selectProfile.id));
    dispatch(setNickname(selectData.selectProfile.nickname));
    dispatch(setServerId(selectData.selectProfile.server));
    dispatch(setPermissions(selectData.selectProfile.user.permissions));
    dispatch(setRoles(selectData.selectProfile.roles));
    dispatch(setUserId(selectData.selectProfile.user.id));
    dispatch(
      setBlacklist(selectData.selectProfile.blacklist.map((el) => el.id))
    );
  }, [selectData, dispatch, getStatus]);

  return <></>;
};

export default AuthLoader;
