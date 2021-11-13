import { gql, useLazyQuery } from "@apollo/client";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { Profile, TopBy } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setRatingTop } from "../../redux/tops/reducer";
import ProfileCell from "../profile/ProfileCell";

const RatingTop = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const ratingTop = useAppSelector((state) => state.tops.rating);
  const [getTop, { data, loading }] = useLazyQuery<{ top: Profile[] }>(gql`
    query tops($server: ObjectID!, $top: TopBy!) {
      top(server: $server, top: $top) {
        id
        avatar
        banner
        nickname
        lastOnline
        role
        ratings
        user {
          permissions
        }
      }
    }
  `);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!server || ratingTop.length !== 0) return;
    getTop({ variables: { server: server, top: TopBy.Rating } });
  }, [server, getTop, ratingTop]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(setRatingTop(data.top));
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
        {ratingTop.map((p, i) => (
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
            <ProfileCell showRatings profile={p} />
          </React.Fragment>
        ))}
      </Box>
    </Stack>
  );
};

export default RatingTop;
