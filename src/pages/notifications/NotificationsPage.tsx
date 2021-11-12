import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SubscriberNotification from "../../components/notifications/SubscriberNotification";
import SystemNotification from "../../components/notifications/SystemNotification";
import { useAppSelector } from "../../hooks/redux";

const NotificationsPage = () => {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
        maxHeight: "100%",
      }}
    >
      <Paper
        sx={{
          overflow: "hidden",
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Stack spacing={2}>
          {notifications.length === 0 && (
            <Typography variant="body1" textAlign="center">
              Нет оповещений
            </Typography>
          )}
          {notifications.map((n) => {
            if (n.__typename === "SystemNotification") {
              return <SystemNotification notification={n} />;
            } else if (n.__typename === "SubscriberNotification") {
              return <SubscriberNotification notification={n} />;
            } else {
              return <></>;
            }
          })}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NotificationsPage;
