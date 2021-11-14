import { useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import gql from "graphql-tag";
import React from "react";
import { TopBy, TopResult } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFriends } from "../../redux/tops/reducer";
import ProfileCell from "../profile/ProfileCell";

const FriendsTop = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const friendsTop = useAppSelector((state) => state.tops.friends);
  const [getTop, { data, loading }] = useLazyQuery<{ top: TopResult }>(gql`
    query tops($server: ObjectID!, $top: TopBy!) {
      top(server: $server, top: $top) {
        profiles {
          id
          avatar
          banner
          nickname
          lastOnline
          role
          level
          user {
            permissions
          }
        }
      }
    }
  `);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!server || friendsTop.length !== 0) return;
    getTop({ variables: { server: server, top: TopBy.Friends } });
  }, [server, getTop, friendsTop]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(setFriends(data.top.profiles));
  }, [dispatch, data]);

  return (
    <Stack spacing={1}>
      {loading && <LinearProgress />}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "min-content 1fr",
          gap: (theme) => theme.spacing(1),
        }}
      >
        {friendsTop.map((p, i) => (
          <React.Fragment key={p.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {i + 1}
              </Typography>
            </Box>
            <ProfileCell showFriends profile={p} />
          </React.Fragment>
        ))}
      </Box>
    </Stack>
  );
};

export default FriendsTop;
