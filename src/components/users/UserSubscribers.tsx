import { Paper, Typography } from "@mui/material";
import React from "react";
import { User } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import UserCell from "./UserCell";

const UserSubscribers = () => {
  const user = useAppSelector((state) => state.cache.user) as User;

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
        gap: (theme) => theme.spacing(1),
      }}
    >
      {user.subscriberUsers.map((su) => (
        <UserCell
          elevation={1}
          key={su.subscriberId}
          user={su.subscriberNavigation}
        />
      ))}
      {user.subscriberUsers.length === 0 && (
        <Typography variant="subtitle1">Нет подписчиков</Typography>
      )}
    </Paper>
  );
};

export default UserSubscribers;
