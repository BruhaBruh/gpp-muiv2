import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export type Online = { date: string; value: number; min: number; max: number };
export enum OnlineStatType {
  Hour,
  Day,
  Week,
  Month,
}
export type ShowOnline = { max: boolean; avg: boolean; min: boolean };

const CustomTooltip: React.FC<{
  active?: any;
  payload?: any[];
  label?: any;
  showOnline: ShowOnline;
}> = ({ active, payload, label, showOnline }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ padding: (theme) => theme.spacing(1) }} elevation={1}>
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          {dayjs(payload[0].payload.date).format("HH:mm DD.MM.YYYY")}
        </Typography>
        {showOnline.max && (
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            Максимум: {payload[0].payload.max}
          </Typography>
        )}
        {showOnline.avg && (
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.success.main }}
          >
            Средний: {payload[0].payload.value}
          </Typography>
        )}
        {showOnline.min && (
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.info.main }}
          >
            Минимум: {payload[0].payload.min}
          </Typography>
        )}
      </Paper>
    );
  }

  return null;
};

const OnlineStats: React.FC<{ data: Online[]; showOnline: ShowOnline }> = ({
  data,
  showOnline,
}) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
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
        {showOnline.avg && (
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
        )}
        {showOnline.max && (
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
        )}
        {showOnline.min && (
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
        )}

        <Tooltip content={<CustomTooltip showOnline={showOnline} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OnlineStats;
