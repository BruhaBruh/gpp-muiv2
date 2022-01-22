import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { NewPlayer } from "../../graphql/types";

export type ShowNewPlayer = {
  inc: boolean;
  total: boolean;
};

const CustomTooltip: React.FC<{
  active?: any;
  payload?: any[];
  label?: any;
  showOnline: ShowNewPlayer;
}> = ({ active, payload, label, showOnline }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ padding: (theme) => theme.spacing(1) }} elevation={1}>
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          {dayjs(payload[0].payload.time).format("HH:mm DD.MM.YYYY")}
        </Typography>
        {showOnline.total && (
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.info.main }}
          >
            Всего: {payload[0].payload.total}
          </Typography>
        )}
        {showOnline.inc && (
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.success.main }}
          >
            Игроков +{payload[0].payload.inc}
          </Typography>
        )}
      </Paper>
    );
  }

  return null;
};

const OnlineStats: React.FC<{
  data?: NewPlayer[];
  showOnline: ShowNewPlayer;
}> = ({ data, showOnline }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={
          data
            ? data
                .map((d) => d)
                .sort(
                  (a, b) =>
                    new Date(a.time).getTime() - new Date(b.time).getTime()
                )
            : []
        }
      >
        <defs>
          <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#44B462" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#44B462" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#42A5F5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#42A5F5" stopOpacity={0} />
          </linearGradient>
        </defs>
        {showOnline.inc && (
          <Area
            className="online"
            activeDot={{
              fill: "#44B462",
              stroke: "rgba(233, 233, 233, 0.54)",
            }}
            fill="url(#colorOnline)"
            type="monotone"
            dataKey="inc"
          />
        )}
        {showOnline.total && (
          <Area
            className="max"
            activeDot={{
              fill: "#42A5F5",
              stroke: "rgba(233, 233, 233, 0.54)",
            }}
            fill="url(#colorMax)"
            type="monotone"
            dataKey="total"
          />
        )}

        <Tooltip content={<CustomTooltip showOnline={showOnline} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OnlineStats;
