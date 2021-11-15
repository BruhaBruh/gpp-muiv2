import { gql, useLazyQuery } from "@apollo/client";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { TopBy, TopResult } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setBadRatingTop, setRatingTop } from "../../redux/tops/reducer";
import ProfileCell from "../profile/ProfileCell";

const RatingTop = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const ratingTop = useAppSelector((state) => state.tops.rating);
  const badTop = useAppSelector((state) => state.tops.badrating);
  const [getTop, { data, loading }] = useLazyQuery<{
    top: TopResult;
    badtop: TopResult;
  }>(gql`
    query tops($server: ObjectID!, $top: TopBy!, $badtop: TopBy!) {
      top(server: $server, top: $top) {
        profiles {
          id
          avatar
          banner
          nickname
          lastOnline
          role
          ratings {
            total
            negative
            positive
          }
          user {
            permissions
          }
        }
      }
      badtop: top(server: $server, top: $badtop) {
        profiles {
          id
          avatar
          banner
          nickname
          lastOnline
          role
          ratings {
            total
            negative
            positive
          }
          user {
            permissions
          }
        }
        totalProfiles
      }
    }
  `);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!server || ratingTop.length !== 0) return;
    getTop({
      variables: { server: server, top: TopBy.Rating, badtop: TopBy.Badrating },
    });
  }, [server, getTop, ratingTop]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(setRatingTop(data.top.profiles));
    dispatch(
      setBadRatingTop({
        profiles: data.badtop.profiles,
        total: data.badtop.totalProfiles as number,
      })
    );
  }, [dispatch, data]);

  return (
    <Stack spacing={1}>
      {loading && <LinearProgress />}
      {!loading && (
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gridColumn: "1 / -1",
            }}
          >
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              По отрицательной
            </Typography>
          </Box>
          {badTop.profiles.map((p, i) => (
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
      )}
    </Stack>
  );
};

export default RatingTop;
