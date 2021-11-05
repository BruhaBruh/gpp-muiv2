import { Stack } from "@mui/material";
import React from "react";
import Marksy from "../utils/Marksy";

interface props {
  text: string;
}

const ProfileBodyDescription: React.FC<props> = ({ text }) => {
  return (
    <Stack spacing={2}>
      <Marksy text={text} />
    </Stack>
  );
};

export default ProfileBodyDescription;
