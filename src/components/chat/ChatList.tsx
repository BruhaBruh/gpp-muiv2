import { Avatar, Badge, ListItemText, Stack, Typography } from "@mui/material";
import { Icon28ChevronRightOutline, Icon36Add } from "@vkontakte/icons";
import React from "react";
import { ChatType, MessageType } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import CellR from "../ui/CellR";
import IconWrapper from "../ui/IconWrapper";
import ChatCreate from "./ChatCreate";

const ChatList = () => {
  const chats = useAppSelector((state) => state.chats.chats.map((c) => c.chat));
  const profileId = useAppSelector((state) => state.userData.profileId);
  const dispatch = useAppDispatch();
  const createChat = () => dispatch(setModal(<ChatCreate />));

  return (
    <Stack spacing={1}>
      <Cell
        onClick={createChat}
        color="primary"
        startIcon={
          <IconWrapper size={32}>
            <Icon36Add />
          </IconWrapper>
        }
      >
        Создать чат
      </Cell>
      {chats.map((chat) => (
        <CellR
          to={"/chat/" + chat.id}
          color={
            chat.type === ChatType.Product
              ? !chat.lastMessage.readed.includes(profileId)
                ? "primary"
                : "inherit"
              : "inherit"
          }
          startIcon={
            chat.type === ChatType.Chat ? (
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
            ) : (
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
                badgeContent={
                  getLastOnline(
                    chat.profiles.filter((p) => p.id !== profileId)[0]
                      .lastOnline
                  ) === "Онлайн"
                    ? " "
                    : 0
                }
                overlap="circular"
                color={"success"}
              >
                <Avatar
                  src={
                    chat.profiles.filter(
                      (profile) => profile.id !== profileId
                    )[0].avatar
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
            )
          }
          endIcon={
            <IconWrapper size={32}>
              <Icon28ChevronRightOutline />
            </IconWrapper>
          }
          sx={{
            background: (theme) =>
              !chat.lastMessage.readed.includes(profileId)
                ? theme.palette.action.hover
                : undefined,
          }}
        >
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color:
                    chat.type === ChatType.Product &&
                    !chat.lastMessage.readed.includes(profileId)
                      ? (theme) => theme.palette.primary.main
                      : undefined,
                }}
              >
                {chat.type === ChatType.Chat
                  ? chat.name
                  : chat.profiles.filter(
                      (profile) => profile.id !== profileId
                    )[0].nickname +
                    (chat.type === ChatType.Product ? " [Т]" : "")}
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
                {chat.lastMessage.type === MessageType.System ? (
                  <span style={{ fontWeight: "bold" }}>
                    {chat.lastMessage.message}
                  </span>
                ) : chat.lastMessage.owner?.id === profileId ? (
                  `Вы: ${chat.lastMessage.message}`
                ) : chat.type === ChatType.Chat ? (
                  `${chat.lastMessage.owner?.nickname}: ${chat.lastMessage.message}`
                ) : (
                  chat.lastMessage.message
                )}
              </Typography>
            }
            sx={{
              textAlign: "left",
              textTransform: "none",
              width: "1px",
              flex: 1,
            }}
          />
        </CellR>
      ))}
    </Stack>
  );
};

export default ChatList;
