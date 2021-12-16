import { useLazyQuery } from "@apollo/client";
import { Box, LinearProgress, Paper, Stack } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import TopByFriends from "../../components/tops/TopByFriends";
import TopByRatings from "../../components/tops/TopByRatings";
import TopBySocialPoints from "../../components/tops/TopBySocialPoints";
import TopBySubscribers from "../../components/tops/TopBySubscribers";
import TopByViews from "../../components/tops/TopByViews";
import TopByYears from "../../components/tops/TopByYears";
import { User, UserTopEnum } from "../../graphql/types";

const TopsPage = () => {
  const [type, setType] = React.useState<UserTopEnum>(UserTopEnum.Views);
  const [getTop, { data, loading }] = useLazyQuery<{ top: User[] }>(
    gql`
      query top($type: UserTopEnum!) {
        top(type: $type) {
          userId
          discordId
          socialPoints
          nickname
          level
          views
          totalFriends
          totalSubscribers
          rating {
            result
            total
            negative
            positive
          }
          userRole
          avatar
          banner
          lastOnline
          role
          permissions
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    getTop({ variables: { type: type } });
  }, [type, getTop]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
      >
        <ScrollContainer vertical={false} hideScrollbars>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "max-content", userSelect: "none" }}
          >
            <Box
              onClick={() => setType(UserTopEnum.Views)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.Views
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По просмотрам
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.Friends)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.Friends
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По друзьям
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.Subscribers)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.Subscribers
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По подписчикам
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.Years)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.Years
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По годам в городе
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.Rating)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.Rating
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По рейтингу
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.RatingN)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.RatingN
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По негативному рейтингу
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.SocialPoints)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.SocialPoints
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По социальному рейтингу
            </Box>
            <Box
              onClick={() => setType(UserTopEnum.SocialPointsN)}
              sx={{
                color: (theme) =>
                  type === UserTopEnum.SocialPointsN
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              По негативному социальному рейтингу
            </Box>
          </Stack>
        </ScrollContainer>
      </Paper>
      {loading && <LinearProgress />}
      {!loading && data?.top && type === UserTopEnum.Views && (
        <TopByViews users={data.top} />
      )}
      {!loading && data?.top && type === UserTopEnum.Friends && (
        <TopByFriends users={data.top} />
      )}
      {!loading && data?.top && type === UserTopEnum.Subscribers && (
        <TopBySubscribers users={data.top} />
      )}
      {!loading && data?.top && type === UserTopEnum.Years && (
        <TopByYears users={data.top} />
      )}
      {!loading && data?.top && type === UserTopEnum.Rating && (
        <TopByRatings users={data.top} />
      )}
      {!loading && data?.top && type === UserTopEnum.RatingN && (
        <TopByRatings users={data.top} bad />
      )}
      {!loading && data?.top && type === UserTopEnum.SocialPoints && (
        <TopBySocialPoints users={data.top} />
      )}
      {!loading && data?.top && type === UserTopEnum.SocialPointsN && (
        <TopBySocialPoints users={data.top} bad />
      )}
    </Stack>
  );
};

export default TopsPage;
