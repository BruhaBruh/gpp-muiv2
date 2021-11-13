import { useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import gql from "graphql-tag";
import React from "react";
import { Profile, TopBy } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSoldTop } from "../../redux/tops/reducer";
import ProfileCell from "../profile/ProfileCell";

const SoldTop = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const soldTop = useAppSelector((state) => state.tops.sold);
  const [getTop, { data, loading }] = useLazyQuery<{ top: Profile[] }>(gql`
    query tops($server: ObjectID!, $top: TopBy!) {
      top(server: $server, top: $top) {
        id
        avatar
        banner
        nickname
        lastOnline
        role
        soldProducts
        user {
          permissions
        }
      }
    }
  `);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!server || soldTop.length !== 0) return;
    getTop({ variables: { server: server, top: TopBy.Soldproducts } });
  }, [server, getTop, soldTop]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(setSoldTop(data.top));
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
        {soldTop.map((p, i) => (
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
            <ProfileCell showSold profile={p} />
          </React.Fragment>
        ))}
      </Box>
    </Stack>
  );
};

export default SoldTop;
