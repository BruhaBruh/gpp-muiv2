import { Paper, Typography } from "@mui/material";
import React from "react";
import { User } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import UserCell from "./UserCell";

const UserFriends = () => {
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
      {user.friendUsers.map((fu) => (
        <UserCell key={fu.friendId} user={fu.friendNavigation} />
      ))}
      {user.friendUsers.length === 0 && (
        <Typography variant="subtitle1">Нет друзей</Typography>
      )}
    </Paper>
  );
};

export default UserFriends;
