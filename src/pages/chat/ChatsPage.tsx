import { Paper, Stack } from "@mui/material";
import React from "react";
import ChatList from "../../components/chat/ChatList";

const ChatsPage = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
        <Stack spacing={2}>
          <ChatList />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ChatsPage;
