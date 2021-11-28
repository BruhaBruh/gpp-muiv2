import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router-dom";
import Head from "../../components/ui/Head";
import UserBody from "../../components/users/UserBody";
import UserHeader from "../../components/users/UserHeader";
import { UsersConnection } from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser, setUserUpdate } from "../../redux/cache/reducer";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const userUpdate = useAppSelector((state) => state.cache.userUpdate);
  const user = useAppSelector((state) => state.cache.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [inc] = useMutation(gql`
    mutation inc($id: Int!) {
      incView(id: $id)
    }
  `);
  const [getUser, { data, error, loading }] = useLazyQuery<{
    users: UsersConnection;
  }>(
    gql`
      query user($userId: Int) {
        users(first: 1, where: { userId: { eq: $userId } }) {
          nodes {
            userId
            discordId
            nickname
            userRole
            status
            description
            avatar
            banner
            lastOnline
            tag
            level
            views
            sex
            role
            settings
            phone
            isBanned
            permissions
            subscriberUsers {
              subscriberId
              subscriberNavigation {
                userId
                discordId
                nickname
                userRole
                avatar
                banner
                permissions
                lastOnline
                role
                discordRoles {
                  id
                  position
                  name
                }
              }
            }
            friendUsers {
              friendId
              friendNavigation {
                userId
                discordId
                nickname
                userRole
                avatar
                banner
                permissions
                lastOnline
                role
                discordRoles {
                  id
                  position
                  name
                }
              }
            }
            rating {
              result
              total
              positive
              negative
              your
            }
            discordRoles {
              id
              position
              name
              color
            }
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    if (!/^\d*$/.test(id)) return;
    if (user && user.userId === Number(id)) return;
    getUser({ variables: { userId: Number(id) } });
  }, [id, getUser, user]);

  React.useEffect(() => {
    if (!/^\d*$/.test(id)) return;
    const t = setTimeout(
      () => inc({ variables: { id: Number(id) } }),
      1000 * 10
    );
    return () => clearTimeout(t);
  }, [id, inc]);

  React.useEffect(() => {
    if (!/^\d*$/.test(id)) return;
    if (!userUpdate) return;
    getUser({ variables: { userId: Number(id) } });
    dispatch(setUserUpdate(false));
  }, [id, getUser, user, userUpdate, dispatch]);

  React.useEffect(() => {
    if (!data) return;
    if (!data?.users?.nodes) return;
    if (data.users.nodes.length === 0) return;
    dispatch(setUser(data.users.nodes[0]));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {/^\d*$/.test(id) ? (
        loading && user === undefined ? (
          <LinearProgress />
        ) : user ? (
          <>
            <Head name={`Профиль ${user.nickname}`} />
            <UserHeader />
            <UserBody />
            {loading && <LinearProgress />}
          </>
        ) : (
          <Typography variant="subtitle1">Профиль не найден</Typography>
        )
      ) : (
        <Typography variant="subtitle1">Профиль не найден</Typography>
      )}
    </Stack>
  );
};

export default UserPage;
