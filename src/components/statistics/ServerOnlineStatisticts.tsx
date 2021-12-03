import { gql, useLazyQuery } from "@apollo/client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Serveronlinelog } from "../../graphql/types";
import OnlineStats, { Online, OnlineStatType, ShowOnline } from "./OnlineStats";

const ServerOnlineStatisticts = () => {
  const [getOnline, { data }] = useLazyQuery<{
    serverOnlineLogs: Serveronlinelog[];
  }>(gql`
    query onlineLogs($where: ServeronlinelogFilterInput) {
      serverOnlineLogs(order: { createdAt: ASC }, where: $where) {
        online
        createdAt
      }
    }
  `);

  const [type, setType] = React.useState<OnlineStatType>(OnlineStatType.Hour);
  const [showOnline, setShowOnline] = React.useState<ShowOnline>({
    min: false,
    avg: true,
    max: false,
  });

  React.useEffect(() => {
    // 2021-12-02T00:22:22.016Z
    switch (type) {
      case OnlineStatType.Hour: {
        return getOnline({
          variables: {
            where: {
              createdAt: {
                gte: new Date(new Date().getTime() - 1000 * 60 * 60)
                  .toISOString()
                  .replace(/\d\d\.\d*Z/i, "00.000Z"),
              },
            },
          },
        });
      }
      case OnlineStatType.Day: {
        return getOnline({
          variables: {
            where: {
              createdAt: {
                gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
                  .toISOString()
                  .replace(/\d\d:\d\d:\d\d\.\d*Z/i, "00:00:00.000Z"),
              },
            },
          },
        });
      }
      case OnlineStatType.Week: {
        return getOnline({
          variables: {
            where: {
              createdAt: {
                gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
                  .toISOString()
                  .replace(/\d\d:\d\d:\d\d\.\d*Z/i, "00:00:00.000Z"),
              },
            },
          },
        });
      }
      case OnlineStatType.Month: {
        return getOnline({
          variables: {
            where: {
              createdAt: {
                gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
                  .toISOString()
                  .replace(/\d\d:\d\d:\d\d\.\d*Z/i, "00:00:00.000Z"),
              },
            },
          },
        });
      }
    }
  }, [getOnline, type]);

  const getData = (): Online[] => {
    if (!data?.serverOnlineLogs) return [];
    const init: Online[] = [];
    data.serverOnlineLogs.forEach((c) => {
      let date = "";
      switch (type) {
        case OnlineStatType.Hour: {
          date = c.createdAt.replace(/\d\d\.\d*Z/i, "00.000Z");
          break;
        }
        case OnlineStatType.Day: {
          date = c.createdAt.replace(/\d\d:\d\d\.\d*Z/i, "00:00.000Z");
          break;
        }
        case OnlineStatType.Week:
        case OnlineStatType.Month: {
          date = c.createdAt.replace(/\d\d:\d\d:\d\d\.\d*Z/i, "00:00:00.000Z");
          break;
        }
      }
      if (init.filter((o) => o.date === date).length !== 0) return;
      const online = data.serverOnlineLogs
        .filter((d) => {
          switch (type) {
            case OnlineStatType.Hour: {
              return d.createdAt.replace(/\d\d\.\d*Z/i, "00.000Z") === date;
            }
            case OnlineStatType.Day: {
              return (
                d.createdAt.replace(/\d\d:\d\d\.\d*Z/i, "00:00.000Z") === date
              );
            }
            case OnlineStatType.Week:
            case OnlineStatType.Month: {
              return (
                d.createdAt.replace(
                  /\d\d:\d\d:\d\d\.\d*Z/i,
                  "00:00:00.000Z"
                ) === date
              );
            }
          }
          return false;
        })
        .map((d) => d.online);

      const sum = online.reduce((a, b) => a + b, 0);
      const avg = Math.floor(sum / online.length) || 0;
      const max = Math.max(...online);
      const min = Math.min(...online);

      init.push({
        date,
        value: avg,
        max,
        min,
      });
    });
    return init;
  };

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
          Онлайн на сервере
        </Typography>
        {data?.serverOnlineLogs && (
          <OnlineStats data={getData()} showOnline={showOnline} />
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
                onClick={() => setType(OnlineStatType.Hour)}
                sx={{
                  color: (theme) =>
                    type === OnlineStatType.Hour
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Час
              </Box>
              <Box
                onClick={() => setType(OnlineStatType.Day)}
                sx={{
                  color: (theme) =>
                    type === OnlineStatType.Day
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                День
              </Box>
              <Box
                onClick={() => setType(OnlineStatType.Week)}
                sx={{
                  color: (theme) =>
                    type === OnlineStatType.Week
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                Неделя
              </Box>
              <Box
                onClick={() => setType(OnlineStatType.Month)}
                sx={{
                  color: (theme) =>
                    type === OnlineStatType.Month
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

export default ServerOnlineStatisticts;
