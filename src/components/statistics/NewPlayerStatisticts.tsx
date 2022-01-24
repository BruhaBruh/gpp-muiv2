import { gql, useLazyQuery } from "@apollo/client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { NewPlayer, OnlineTypes } from "../../graphql/types";
import NewPlayerStats, { ShowNewPlayer } from "./NewPlayerStats";

const NewPlayerStatisticts = () => {
  const [getOnline, { data }] = useLazyQuery<{
    newPlayerLogs: NewPlayer[];
  }>(gql`
    query newPlayerLogs($type: OnlineTypes!) {
      newPlayerLogs(type: $type) {
        total
        inc
        time
      }
    }
  `);

  const [type, setType] = React.useState<OnlineTypes>(OnlineTypes.Hour);
  const [showOnline, setShowOnline] = React.useState<ShowNewPlayer>({
    inc: true,
    total: true,
  });

  React.useEffect(() => {
    // 2021-12-02T00:22:22.016Z
    getOnline({
      variables: {
        type: type,
      },
    });
  }, [getOnline, type]);

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2), userSelect: "none" }}>
      <Stack
        spacing={1}
        sx={{
          ".online path[fill=none]": {
            stroke: (theme) => theme.palette.success.main,
          },
          ".max path[fill=none]": {
            stroke: (theme) => theme.palette.info.main,
          },
          ".min path[fill=none]": {
            stroke: (theme) => theme.palette.error.main,
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Новые пользователи на сервере
        </Typography>
        {data?.newPlayerLogs ? (
          <NewPlayerStats data={data.newPlayerLogs} showOnline={showOnline} />
        ) : (
          <NewPlayerStats showOnline={showOnline} />
        )}
        <ScrollContainer vertical={false} hideScrollbars>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ width: "max-content", minWidth: "100%" }}
          >
            <Stack direction="row" spacing={2}>
              <Box
                onClick={() => setType(OnlineTypes.Hour)}
                sx={{
                  color: (theme) =>
                    type === OnlineTypes.Hour
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Час
              </Box>
              <Box
                onClick={() => setType(OnlineTypes.Day)}
                sx={{
                  color: (theme) =>
                    type === OnlineTypes.Day
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                День
              </Box>
              <Box
                onClick={() => setType(OnlineTypes.Week)}
                sx={{
                  color: (theme) =>
                    type === OnlineTypes.Week
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Неделя
              </Box>
              <Box
                onClick={() => setType(OnlineTypes.Month)}
                sx={{
                  color: (theme) =>
                    type === OnlineTypes.Month
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Месяц
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Box
                onClick={() =>
                  setShowOnline((prev) => ({ ...prev, inc: !prev.inc }))
                }
                sx={{
                  color: (theme) =>
                    showOnline.inc
                      ? theme.palette.success.main
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Динамика
              </Box>
              <Box
                onClick={() =>
                  setShowOnline((prev) => ({ ...prev, total: !prev.total }))
                }
                sx={{
                  color: (theme) =>
                    showOnline.total
                      ? theme.palette.info.main
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Всего
              </Box>
            </Stack>
          </Stack>
        </ScrollContainer>
      </Stack>
    </Paper>
  );
};

export default NewPlayerStatisticts;
