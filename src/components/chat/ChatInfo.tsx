import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { Icon28DoorArrowRightOutline } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router";
import { Chat, Profile } from "../../graphql/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import ProfileIcons from "../profile/ProfileIcons";

interface props {
  chat: Chat;
}

const ChatInfo: React.FC<props> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const { data: profilesData, loading } = useQuery<{
    getChatProfiles: Profile[];
  }>(
    gql`
      query getChatProfiles($chat: ObjectID!) {
        getChatProfiles(chat: $chat) {
          id
          avatar
          banner
          nickname
          lastOnline
          user {
            permissions
          }
        }
      }
    `,
    { variables: { chat: chat.id } }
  );
  const [leaveChat, { data, error }] = useMutation(
    gql`
      mutation leaveChat($chat: ObjectID!) {
        leaveChat(chat: $chat)
      }
    `,
    { variables: { chat: chat.id } }
  );
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Удачно! Изменения вступят в силу в ближайшее время", {
      variant: "success",
    });
    history.push("/chats");
  }, [data, enqueueSnackbar, history]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Dialog
      open={true}
      onClose={() => dispatch(setModal(null))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Участники чата</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={1}>
            {loading && <LinearProgress />}
            {profilesData &&
              profilesData.getChatProfiles.map((profile) => (
                <Button
                  color="inherit"
                  href={"/profile/" + profile.id}
                  size="large"
                  startIcon={
                    <Badge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                      badgeContent={
                        getLastOnline(profile.lastOnline) === "Онлайн" ? " " : 0
                      }
                      overlap="circular"
                      color={"success"}
                    >
                      <Avatar
                        src={profile.avatar}
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                        children={profile.nickname.substr(0, 2)}
                      />
                    </Badge>
                  }
                  endIcon={
                    <ProfileIcons
                      permissions={profile.user.permissions}
                      height="40px"
                    />
                  }
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        flex: 1,
                        width: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {profile.nickname}
                    </Typography>
                    {chat.owner === profile.id && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme: Theme) => theme.palette.text.disabled,
                        }}
                      >
                        создатель
                      </Typography>
                    )}
                  </Stack>
                </Button>
              ))}
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="text"
          onClick={() => leaveChat()}
          size="large"
          startIcon={<Icon28DoorArrowRightOutline />}
          fullWidth
        >
          Выйти из чата
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatInfo;
