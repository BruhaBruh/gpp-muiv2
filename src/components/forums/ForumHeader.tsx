import { Button, Paper, Stack } from "@mui/material";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions, Permissions } from "../../redux/userData/types";
import CreateForum from "./CreateForum";
import CreateThread from "./CreateThread";

const ForumHeader = () => {
  const permissions = useAppSelector((state) => state.userData.permissions);
  const dispatch = useAppDispatch();

  const openCreateForum = () => dispatch(setModal(<CreateForum />));
  const openCreateThread = () => dispatch(setModal(<CreateThread />));

  return checkPermissions(Permissions.ModifyForum, permissions) ||
    checkPermissions(Permissions.ModifyThread, permissions) ? (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <ScrollContainer vertical={false}>
        <Stack spacing={1} direction="row" sx={{ width: "max-content" }}>
          {checkPermissions(Permissions.ModifyForum, permissions) && (
            <Button
              onClick={openCreateForum}
              color="inherit"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
            >
              Создать раздел
            </Button>
          )}
          {checkPermissions(Permissions.ModifyThread, permissions) && (
            <Button
              onClick={openCreateThread}
              color="inherit"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
            >
              Создать тему
            </Button>
          )}
        </Stack>
      </ScrollContainer>
    </Paper>
  ) : (
    <></>
  );
};

export default ForumHeader;
