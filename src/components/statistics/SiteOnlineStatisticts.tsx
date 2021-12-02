import { gql, useLazyQuery } from "@apollo/client";
import { alpha, Box, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { Siteonlinelog } from "../../graphql/types";

type Online = { date: string; value: number };

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
          <Typography variant="subtitle1">
            Онлайн: {payload[0].value}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Дата: {dayjs(payload[0].payload.date).format("HH:mm DD.MM.YYYY")}
          </Typography>
        </Paper>
      );
    }

    return null;
  };

const SiteOnlineStatisticts = () => {
  const [getOnline, { data }] = useLazyQuery<{
    siteOnlineLogs: Siteonlinelog[];
  }>(gql`
    query onlineLogs($where: SiteonlinelogFilterInput) {
      siteOnlineLogs(order: { createdAt: ASC }, where: $where) {
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
    if (!data?.siteOnlineLogs) return [];
    const init: Online[] = [];
    data.siteOnlineLogs.forEach((c) => {
      let date = "";
      switch (type) {
        case StatType.Hour: {
          date = c.createdAt.replace(/\d\d\.\d*Z/i, "00.000Z");
          break;
        }
        case StatType.Day:
        case StatType.Week:
        case StatType.Month: {
          date = c.createdAt.replace(/\d\d:\d\d:\d\d\.\d*Z/i, "00:00:00.000Z");
          break;
        }
      }
      if (init.filter((o) => o.date === date).length !== 0) return;
      const online = data.siteOnlineLogs
        .filter((d) => {
          switch (type) {
            case StatType.Hour: {
              return d.createdAt.replace(/\d\d\.\d*Z/i, "00.000Z") === date;
            }
            case StatType.Day:
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

      init.push({
        date,
        value: avg,
      });
    });
    return init;
  };

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
      <Stack
        spacing={1}
        sx={{
          "path[stroke=none]": {
            fill: (theme) => alpha(theme.palette.success.main, 0.5),
          },
          "path[fill=none]": {
            stroke: (theme) => theme.palette.success.main,
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Онлайн на сайте
        </Typography>
        {data?.siteOnlineLogs && (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={getData()}>
              <Area
                activeDot={{
                  fill: "#44B462",
                  stroke: "rgba(233, 233, 233, 0.54)",
                }}
                type="monotone"
                dataKey="value"
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

export default SiteOnlineStatisticts;
