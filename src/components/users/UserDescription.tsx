import { Paper } from "@mui/material";
import React from "react";
import { User } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import Marksy from "../utils/Marksy";

const UserDescription = () => {
  const user = useAppSelector((state) => state.cache.user) as User;

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
      <Marksy text={user.description} />
    </Paper>
  );
};

export default UserDescription;
