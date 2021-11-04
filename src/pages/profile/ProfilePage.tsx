import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { LinearProgress, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import Head from "../../components/ui/Head";
import { Profile, ProfileStatus } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clearCurrentProfile,
  setProfile,
  setStatus,
} from "../../redux/currentProfile/reducer";

const ProfilePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const serverId = useAppSelector((state) => state.userData.serverId);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [getStatus, { data: statusData }] = useLazyQuery<{
    getMyStatus: ProfileStatus;
  }>(
    gql`
      query status($id: ObjectID!) {
        getMyStatus(id: $id) {
          isFriend
          isSubscriber
          inBlacklist
          heInBlacklist
          heIsSubscriber
        }
      }
    `,
    {
      fetchPolicy: "no-cache",
      variables: { id: id },
    }
  );
  const dispatch = useAppDispatch();
  const [
    getProfile,
    { data: profileData, error: profileError, loading: profileLoading },
  ] = useLazyQuery<{
    profile: Profile;
  }>(
    gql`
      query profile($id: ObjectID!) {
        profile(id: $id) {
          id
          avatar
          banner
          nickname
          ratings {
            user
            positive
          }
          status
          description
          views
          lastOnline
          sex
          server
          role
          work
          level
          roles {
            id
            color
            name
          }
          user {
            id
            permissions
            banned
          }
          friends {
            id
            avatar
            banner
            nickname
            lastOnline
            role
            roles {
              id
              color
              name
              position
            }
            user {
              permissions
            }
          }
          subscribers {
            id
            avatar
            banner
            nickname
            lastOnline
            role
            roles {
              id
              color
              name
              position
            }
            user {
              permissions
            }
          }
        }
      }
    `,
    {
      fetchPolicy: "no-cache",
      variables: {
        v: false,
      },
    }
  );

  const [addView] = useMutation(
    gql`
      mutation addView($profile: ObjectID!) {
        addView(profile: $profile)
      }
    `,
    { variables: { profile: id } }
  );
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );

  React.useEffect(() => {
    if (currentProfile?.id && currentProfile.id !== id)
      dispatch(clearCurrentProfile());
    getProfile({
      variables: {
        id: id,
        v: true,
      },
    });
    getStatus();
    // eslint-disable-next-line
  }, [getProfile, getStatus, id, dispatch]);

  React.useEffect(() => {
    const i = setTimeout(() => {
      addView();
    }, 10000);
    return () => {
      clearTimeout(i);
    };
  }, [addView]);

  React.useEffect(() => {
    if (!profileData || !serverId) return;
    if (profileData?.profile.server !== serverId) {
      return history.push("/");
    }
    dispatch(setProfile(profileData.profile));
  }, [profileData, serverId, dispatch, history]);

  React.useEffect(() => {
    if (!statusData) return;
    dispatch(setStatus(statusData.getMyStatus));
  }, [statusData, dispatch]);

  React.useEffect(() => {
    if (!profileError) return;
    enqueueSnackbar(profileError.message, { variant: "error" });
  }, [profileError, enqueueSnackbar]);

  const updateProfile = () => {
    getProfile({
      variables: {
        id: id,
      },
    });
    getStatus();
  };

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {profileLoading && <LinearProgress />}
      <Head
        name={
          profileData ? "Профиль " + profileData.profile.nickname : "Профиль"
        }
      />
      <ProfileHeader updateProfile={updateProfile} />
    </Stack>
  );
};

export default ProfilePage;
