import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import BillNotification from "../../components/notifications/BillNotification";
import FriendNotification from "../../components/notifications/FriendNotification";
import SubscriberNotification from "../../components/notifications/SubscriberNotification";
import SystemNotification from "../../components/notifications/SystemNotification";
import { useAppSelector } from "../../hooks/redux";

const NotificationsPage = () => {
  const notifications = useAppSelector((state) => state.cache.notifications);
  return (
    <Stack
      spacing={1}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {notifications.length === 0 && (
        <Paper
          sx={{
            padding: (theme) => theme.spacing(2),
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
            textAlign="center"
          >
            Нет оповещений
          </Typography>
        </Paper>
      )}
      {notifications.map((n) => {
        switch (n.__typename) {
          case "Billnotification": {
            return (
              <BillNotification
                key={n.__typename + n.billnotificationId}
                notification={n}
              />
            );
          }
          case "Friendnotification": {
            return (
              <FriendNotification
                key={n.__typename + n.friendnotificationId}
                notification={n}
              />
            );
          }
          case "Subscribernotification": {
            return (
              <SubscriberNotification
                key={n.__typename + n.subscribernotificationId}
                notification={n}
              />
            );
          }
          case "Systemnotification": {
            return (
              <SystemNotification
                key={n.__typename + n.systemnotificationId}
                notification={n}
              />
            );
          }
          default:
            return <></>;
        }
      })}
    </Stack>
  );
};

export default NotificationsPage;
