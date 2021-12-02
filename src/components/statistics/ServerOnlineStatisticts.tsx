import { gql, useLazyQuery } from "@apollo/client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { Serveronlinelog } from "../../graphql/types";

type Online = { date: string; value: number; min: number; max: number };

enum StatType {
  Hour,
  Day,
  Week,
  Month,
}

const CustomTooltip: React.FC<{ active?: any; payload?: any[]; label?: any }> =
  ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ padding: (theme) => theme.spacing(1) }} elevation={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            {dayjs(payload[0].payload.date).format("HH:mm DD.MM.YYYY")}
          </Typography>
          <Typography variant="subtitle1">
            Максимум: {payload[0].payload.max}
          </Typography>
          <Typography variant="subtitle1">
            Средний: {payload[0].payload.value}
          </Typography>
          <Typography variant="subtitle1">
            Минимум: {payload[0].payload.min}
          </Typography>
        </Paper>
      );
    }

    return null;
  };

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

  const [type, setType] = React.useState<StatType>(StatType.Hour);

  React.useEffect(() => {
    // 2021-12-02T00:22:22.016Z
    switch (type) {
      case StatType.Hour: {
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
      case StatType.Day: {
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
      case StatType.Week: {
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
      case StatType.Month: {
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
        case StatType.Hour: {
          date = c.createdAt.replace(/\d\d\.\d*Z/i, "00.000Z");
          break;
        }
        case StatType.Day: {
          date = c.createdAt.replace(/\d\d:\d\d\.\d*Z/i, "00:00.000Z");
          break;
        }
        case StatType.Week:
        case StatType.Month: {
          date = c.createdAt.replace(/\d\d:\d\d:\d\d\.\d*Z/i, "00:00:00.000Z");
          break;
        }
      }
      if (init.filter((o) => o.date === date).length !== 0) return;
      const online = data.serverOnlineLogs
        .filter((d) => {
          switch (type) {
            case StatType.Hour: {
              return d.createdAt.replace(/\d\d\.\d*Z/i, "00.000Z") === date;
            }
            case StatType.Day: {
              return (
                d.createdAt.replace(/\d\d:\d\d\.\d*Z/i, "00:00.000Z") === date
              );
            }
            case StatType.Week:
            case StatType.Month: {
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
    <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
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
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={getData()}>
              <defs>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#44B462" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#44B462" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#42A5F5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#42A5F5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6C6D" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF6C6D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                className="online"
                activeDot={{
                  fill: "#44B462",
                  stroke: "rgba(233, 233, 233, 0.54)",
                }}
                fill="url(#colorOnline)"
                type="monotone"
                dataKey="value"
              />
              <Area
                className="max"
                activeDot={{
                  fill: "#42A5F5",
                  stroke: "rgba(233, 233, 233, 0.54)",
                }}
                fill="url(#colorMax)"
                type="monotone"
                dataKey="max"
              />
              <Area
                className="min"
                activeDot={{
                  fill: "#FF6C6D",
                  stroke: "rgba(233, 233, 233, 0.54)",
                }}
                fill="url(#colorMin)"
                type="monotone"
                dataKey="min"
              />
              <Tooltip content={<CustomTooltip />} />
            </AreaChart>
          </ResponsiveContainer>
        )}
        <ScrollContainer vertical={false} hideScrollbars>
          <Stack direction="row" spacing={2} sx={{ width: "max-content" }}>
            <Box
              onClick={() => setType(StatType.Hour)}
              sx={{
                color: (theme) =>
                  type === StatType.Hour
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Час
            </Box>
            <Box
              onClick={() => setType(StatType.Day)}
              sx={{
                color: (theme) =>
                  type === StatType.Day
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              День
            </Box>
            <Box
              onClick={() => setType(StatType.Week)}
              sx={{
                color: (theme) =>
                  type === StatType.Week
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Неделя
            </Box>
            <Box
              onClick={() => setType(StatType.Month)}
              sx={{
                color: (theme) =>
                  type === StatType.Month
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Месяц
            </Box>
          </Stack>
        </ScrollContainer>
      </Stack>
    </Paper>
  );
};

export default ServerOnlineStatisticts;
