import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Forum } from "../../graphql/types";
import ForumCell from "./ForumCell";

const ForumsList: React.FC<{ forums: Forum[] }> = ({ forums }) => {
  return forums.length !== 0 ? (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
      <Stack spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Разделы
        </Typography>
        {forums.map((inf) => (
          <ForumCell key={inf.forumId} forum={inf} />
        ))}
      </Stack>
    </Paper>
  ) : (
    <></>
  );
};

export default ForumsList;
