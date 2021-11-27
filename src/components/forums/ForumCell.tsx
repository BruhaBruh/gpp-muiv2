import { IconButton, Stack } from "@mui/material";
import {
  Icon24DeleteOutline,
  Icon24Linked,
  Icon24PenOutline,
  Icon28ChatsOutline,
} from "@vkontakte/icons";
import React from "react";
import { useHistory } from "react-router";
import { Forum } from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions, Permissions } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";
import ForumDelete from "./ForumDelete";
import ForumEdit from "./ForumEdit";

const ForumCell: React.FC<{ forum: Forum }> = ({ forum }) => {
  const permissions = useAppSelector((state) => state.userData.permissions);
  const history = useHistory();
  const dispatch = useAppDispatch();

  if (forum.link) {
    return (
      <Cell
        key={forum.forumId}
        color="info"
        onClick={() => {
          if (forum.link) window.location.href = forum.link;
        }}
        size="large"
        startIcon={
          <IconWrapper>
            <Icon24Linked />
          </IconWrapper>
        }
        endIcon={
          checkPermissions(Permissions.ModifyForum, permissions) ? (
            <Stack spacing={0.5} direction="row">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModal(<ForumEdit forum={forum} />));
                }}
              >
                <IconWrapper>
                  <Icon24PenOutline />
                </IconWrapper>
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModal(<ForumDelete forum={forum} />));
                }}
                color="error"
              >
                <IconWrapper>
                  <Icon24DeleteOutline />
                </IconWrapper>
              </IconButton>
            </Stack>
          ) : undefined
        }
        sx={{ textTransform: "none" }}
      >
        {forum.name}
      </Cell>
    );
  } else {
    return (
      <Cell
        key={forum.forumId}
        onClick={() => history.push(`/f/${forum.forumId}`)}
        size="large"
        startIcon={
          <IconWrapper>
            <Icon28ChatsOutline />
          </IconWrapper>
        }
        endIcon={
          checkPermissions(Permissions.ModifyForum, permissions) ? (
            <Stack spacing={0.5} direction="row">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModal(<ForumEdit forum={forum} />));
                }}
              >
                <IconWrapper>
                  <Icon24PenOutline />
                </IconWrapper>
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModal(<ForumDelete forum={forum} />));
                }}
                color="error"
              >
                <IconWrapper>
                  <Icon24DeleteOutline />
                </IconWrapper>
              </IconButton>
            </Stack>
          ) : undefined
        }
        sx={{ textTransform: "none" }}
      >
        {forum.name}
      </Cell>
    );
  }
};

export default ForumCell;
