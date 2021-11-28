import {
  Avatar,
  IconButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Icon24CrownOutline,
  Icon24DeleteOutline,
  Icon24LockOutline,
  Icon24PenOutline,
  Icon24PinOutline,
  Icon28UserStarBadgeOutline,
} from "@vkontakte/icons";
import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router";
import { Thread, UserRoleEnum } from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import {
  checkPermissions,
  checkPermissionsWA,
  getUserRoleString,
  Permissions,
} from "../../redux/userData/types";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";
import ThreadDelete from "./ThreadDelete";
import ThreadEdit from "./ThreadEdit";

const ThreadCell: React.FC<{ thread: Thread }> = ({ thread }) => {
  const permissions = useAppSelector((state) => state.userData.permissions);
  const history = useHistory();
  const dispatch = useAppDispatch();

  return (
    <Cell
      onClick={() => history.push(`/th/${thread.threadId}`)}
      startIcon={
        <Avatar
          src={thread.firstPost?.owner?.avatar}
          children={thread.firstPost?.owner?.nickname.substr(0, 1)}
          sx={{ width: 40, height: 40 }}
        />
      }
      endIcon={
        (thread.isPinned ||
          !thread.canChat ||
          checkPermissions(Permissions.ModifyThread, permissions)) && (
          <Stack spacing={0.5} direction="row">
            {!thread.canChat && (
              <Tooltip title="Закрыто" placement="top">
                <Box>
                  <IconWrapper
                    size={20}
                    sx={{
                      color: (theme) => theme.palette.warning.main,
                    }}
                  >
                    <Icon24LockOutline />
                  </IconWrapper>
                </Box>
              </Tooltip>
            )}

            {thread.isPinned && (
              <Tooltip title="Закреплено" placement="top">
                <Box>
                  <IconWrapper size={20}>
                    <Icon24PinOutline />
                  </IconWrapper>
                </Box>
              </Tooltip>
            )}

            {checkPermissions(Permissions.ModifyThread, permissions) && (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setModal(<ThreadEdit thread={thread} />));
                  }}
                >
                  <IconWrapper>
                    <Icon24PenOutline />
                  </IconWrapper>
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setModal(<ThreadDelete thread={thread} />));
                  }}
                  color="error"
                >
                  <IconWrapper>
                    <Icon24DeleteOutline />
                  </IconWrapper>
                </IconButton>
              </>
            )}
          </Stack>
        )
      }
      color="primary"
    >
      <ListItemText
        sx={{
          margin: 0,
          alignSelf: "center",
        }}
        primary={
          <Typography
            variant="body2"
            sx={{
              padding: "0 2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              display: "flex",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {thread.name}
          </Typography>
        }
        secondary={
          thread.firstPost?.owner ? (
            <Typography
              variant="body2"
              sx={{
                padding: "0 2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                display: "flex",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {thread.firstPost.owner.nickname}
              {thread.firstPost.owner.userRole !== UserRoleEnum.None && (
                <Tooltip
                  title={`Персонал (${getUserRoleString(
                    thread.firstPost.owner.userRole
                  )})`}
                  placement="top"
                >
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: (theme) => theme.palette.info.main,
                        alignSelf: "center",
                        marginRight: "2px",
                        marginLeft: "2px",
                      }}
                      size={16}
                    >
                      <Icon28UserStarBadgeOutline />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {checkPermissionsWA(
                Permissions.Premium,
                thread.firstPost.owner.permissions
              ) && (
                <Tooltip title={`Premium`} placement="top">
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: process.env.REACT_APP_PREMIUM_COLOR,
                        alignSelf: "center",
                        marginRight: "2px",
                        marginLeft: "2px",
                      }}
                      size={16}
                    >
                      <Icon24CrownOutline />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {checkPermissionsWA(
                Permissions.Lite,
                thread.firstPost.owner.permissions
              ) && (
                <Tooltip title={`Lite`} placement="top">
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: process.env.REACT_APP_LITE_COLOR,
                        alignSelf: "center",
                        marginRight: "2px",
                        marginLeft: "2px",
                      }}
                      size={16}
                    >
                      <Icon24CrownOutline />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {" · "}
              {dayjs(thread.createdAt).format("HH:mm DD.MM.YYYY")}
            </Typography>
          ) : undefined
        }
      />
    </Cell>
  );
};

export default ThreadCell;
