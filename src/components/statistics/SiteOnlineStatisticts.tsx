import { gql, useLazyQuery } from "@apollo/client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Online, OnlineTypes } from "../../graphql/types";
import OnlineStats, { ShowOnline } from "./OnlineStats";

const SiteOnlineStatisticts = () => {
  const [getOnline, { data }] = useLazyQuery<{
    siteOnlineLogs: Online[];
  }>(gql`
    query onlineLogs($type: OnlineTypes!) {
      siteOnlineLogs(type: $type) {
        max
        avg
        min
        time
      }
    }
  `);

  const [type, setType] = React.useState<OnlineTypes>(OnlineTypes.Hour);
  const [showOnline, setShowOnline] = React.useState<ShowOnline>({
    min: false,
    avg: true,
    max: false,
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
          Онлайн на сайте
        </Typography>
        {data?.siteOnlineLogs ? (
          <OnlineStats data={data.siteOnlineLogs} showOnline={showOnline} />
        ) : (
          <OnlineStats showOnline={showOnline} />
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
                  setShowOnline((prev) => ({ ...prev, min: !prev.min }))
                }
                sx={{
                  color: (theme) =>
                    showOnline.min
                      ? theme.palette.error.main
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Минимум
              </Box>
              <Box
                onClick={() =>
                  setShowOnline((prev) => ({ ...prev, avg: !prev.avg }))
                }
                sx={{
                  color: (theme) =>
                    showOnline.avg
                      ? theme.palette.success.main
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Средний
              </Box>
              <Box
                onClick={() =>
                  setShowOnline((prev) => ({ ...prev, max: !prev.max }))
                }
                sx={{
                  color: (theme) =>
                    showOnline.max
                      ? theme.palette.info.main
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Максимум
              </Box>
            </Stack>
          </Stack>
        </ScrollContainer>
      </Stack>
    </Paper>
  );
};

export default SiteOnlineStatisticts;
