import { useMutation } from "@apollo/client";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  Icon28DeleteOutline,
  Icon28EditOutline,
  Icon28InfoCircleOutline,
} from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory, useParams } from "react-router";
import { Chat, ChatType } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";
import ChatEdit from "./ChatEdit";
import ChatInfo from "./ChatInfo";

const ChatHeader = () => {
  const { id } = useParams<{ id: string }>();
  const chat: Chat | undefined = useAppSelector(
    (state) => state.chats.chats.filter((c) => c.chat.id === id)[0]?.chat
  );
  const profileId = useAppSelector((state) => state.userData.profileId);
  const history = useHistory();
  const getCountPeoples = (i: number): string => {
    if (i % 10 === 1) return `${i} участник`;
    if (i > 10 && i < 20) return `${i} участников`;
    if ([2, 3, 4].includes(i % 10)) return `${i} участника`;
    return `${i} участников`;
  };
  const [removeChatM, { data: chatData, error: chatError }] = useMutation(gql`
    mutation buy($chat: ObjectID!) {
      removeChat(id: $chat) {
        id
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!chatData) return;
    enqueueSnackbar("Чат удален, изменения вступят в силу в ближайшее время.", {
      variant: "success",
    });
    history.push("/chats");
  }, [chatData, history, enqueueSnackbar]);

  React.useEffect(() => {
    if (!chatError) return;
    enqueueSnackbar(chatError?.message, { variant: "error" });
  }, [chatError, enqueueSnackbar]);

  const dispatch = useAppDispatch();

  const editChat = () => dispatch(setModal(<ChatEdit chat={chat} />));

  const infoChat = () => dispatch(setModal(<ChatInfo chat={chat} />));

  const removeChat = () =>
    dispatch(
      setModal(
        <Dialog
          open={true}
          onClose={() => dispatch(setModal(null))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Удаление чата</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы уверены, что хотите удалить чат?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={() => dispatch(setModal(null))}
              autoFocus
              size="medium"
            >
              Отмена
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                removeChatM({ variables: { chat: id } });
                dispatch(setModal(null));
              }}
              size="medium"
            >
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      )
    );

  return chat ? (
    chat.type === ChatType.Chat ? (
      <Cell
        size="large"
        disableRipple
        disableFocusRipple
        startIcon={
          <Avatar
            src={chat.avatar}
            alt=""
            sx={{
              width: 40,
              height: 40,
            }}
            children={chat.name
              .split(" ")
              .map((r) => r.split("")[0].toUpperCase())
              .slice(0, 2)
              .join("")}
          />
        }
        endIcon={
          <Stack spacing={1} direction={"row"}>
            {chat.owner === profileId && (
              <IconButton onClick={editChat}>
                <IconWrapper size={28}>
                  <Icon28EditOutline />
                </IconWrapper>
              </IconButton>
            )}
            <IconButton onClick={infoChat} color="primary">
              <IconWrapper size={28}>
                <Icon28InfoCircleOutline />
              </IconWrapper>
            </IconButton>
          </Stack>
        }
      >
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {chat.name}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {getCountPeoples(chat.profiles.length)}
            </Typography>
          }
          sx={{
            textAlign: "left",
            textTransform: "none",
            width: "1px",
            flex: 1,
          }}
        />
      </Cell>
    ) : (
      <Cell
        size="large"
        onClick={() =>
          history.push(
            "/profile/" +
              chat.profiles.filter((profile) => profile.id !== profileId)[0].id
          )
        }
        startIcon={
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            badgeContent={
              getLastOnline(
                chat.profiles.filter((p) => p.id !== profileId)[0].lastOnline
              ) === "Онлайн"
                ? " "
                : 0
            }
            overlap="circular"
            color={"success"}
          >
            <Avatar
              src={
                chat.profiles.filter((profile) => profile.id !== profileId)[0]
                  .avatar
              }
              sx={{
                width: 40,
                height: 40,
              }}
              children={chat.profiles
                .filter((profile) => profile.id !== profileId)[0]
                .nickname.substr(0, 2)}
            />
          </Badge>
        }
        endIcon={
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              removeChat();
            }}
          >
            <IconWrapper size={28}>
              <Icon28DeleteOutline />
            </IconWrapper>
          </IconButton>
        }
      >
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textTransform: "none",
          }}
        >
          {chat.profiles.filter((profile) => profile.id !== profileId)[0]
            .nickname + (chat.type === ChatType.Product ? " [Т]" : "")}
        </Typography>
      </Cell>
    )
  ) : (
    <></>
  );
};

export default ChatHeader;
