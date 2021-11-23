import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { User } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import UserButtons from "./UserButtons";
import UserDescription from "./UserDescription";
import UserFriends from "./UserFriends";
import UserInfo from "./UserInfo";
import UserSettings from "./UserSettings";
import UserSubscribers from "./UserSubscribers";

export enum UserTabs {
  Info,
  Description,
  Settings,
  Friends,
  Subscribers,
}

const UserBody = () => {
  const user = useAppSelector((state) => state.cache.user) as User;
  const userId = useAppSelector((state) => state.userData.userId);
  const [currentTab, setCurrentTab] = React.useState<UserTabs>(UserTabs.Info);

  return (
    <>
      <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
        <ScrollContainer vertical={false} hideScrollbars>
          <Stack direction="row" spacing={2}>
            <Box
              onClick={() => setCurrentTab(UserTabs.Info)}
              sx={{
                color: (theme) =>
                  currentTab === UserTabs.Info
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
              alignSelf="center"
            >
              Информация
            </Box>
            {user.description && (
              <Box
                onClick={() => setCurrentTab(UserTabs.Description)}
                sx={{
                  color: (theme) =>
                    currentTab === UserTabs.Description
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
                alignSelf="center"
              >
                Описание
              </Box>
            )}
            {!!user.friendUsers.length && (
              <Box
                onClick={() => setCurrentTab(UserTabs.Friends)}
                sx={{
                  color: (theme) =>
                    currentTab === UserTabs.Friends
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
                alignSelf="center"
              >
                Друзья
              </Box>
            )}
            {!!user.subscriberUsers.length && (
              <Box
                onClick={() => setCurrentTab(UserTabs.Subscribers)}
                sx={{
                  color: (theme) =>
                    currentTab === UserTabs.Subscribers
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
                alignSelf="center"
              >
                Подписчики
              </Box>
            )}
            {userId === user.userId && (
              <Box
                onClick={() => setCurrentTab(UserTabs.Settings)}
                sx={{
                  color: (theme) =>
                    currentTab === UserTabs.Settings
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  cursor: "pointer",
                }}
                alignSelf="center"
              >
                Настройки
              </Box>
            )}

            {userId !== user.userId && <UserButtons />}
          </Stack>
        </ScrollContainer>
      </Paper>
      {currentTab === UserTabs.Info && <UserInfo />}
      {currentTab === UserTabs.Description && <UserDescription />}
      {currentTab === UserTabs.Friends && !!user.friendUsers.length && (
        <UserFriends />
      )}
      {currentTab === UserTabs.Subscribers && !!user.subscriberUsers.length && (
        <UserSubscribers />
      )}
      {currentTab === UserTabs.Settings && (
        <UserSettings user={user} setTab={setCurrentTab} />
      )}
    </>
  );
};

export default UserBody;
