import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Icon20DeleteOutline,
  Icon24CrownOutline,
  Icon24DoneOutline,
} from "@vkontakte/icons";
import {
  GlobalChatMessage as GlobalChatMessageModel,
  Permissions,
} from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { checkPermissions, getLastOnline } from "../../redux/userData/types";
import LinkR from "../ui/LinkR";

interface props {
  message?: GlobalChatMessageModel;
  isSystem?: boolean;
  setAddText?: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalChatMessage: React.FC<props> = ({
  message,
  isSystem,
  setAddText,
}) => {
  const server = useAppSelector((state) => state.userData.serverId);
  const nickname = useAppSelector((state) => state.userData.nickname);
  const permissions = useAppSelector((state) => state.userData.permissions);
  const [remove] = useMutation(gql`
    mutation remove($id: ID!, $server: ObjectID!) {
      removeGlobalChatMessage(input: { id: $id, server: $server }) {
        id
      }
    }
  `);

  if (isSystem)
    return (
      <Paper
        elevation={1}
        sx={{
          padding: (theme) => theme.spacing(0.75),
          marginTop: (theme) => theme.spacing(1),
        }}
      >
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Будьте адекватным
        </Typography>
      </Paper>
    );
  if (!message) return <></>;

  return (
    <Paper
      elevation={1}
      sx={{
        display: "grid",
        gridTemplateColumns: "min-content 1fr",
        padding: (theme) => theme.spacing(0.75),
        gap: (theme) => theme.spacing(0.5),
        marginTop: (theme) => theme.spacing(1),
        border: message.message
          .toLowerCase()
          .includes("@" + nickname.toLowerCase())
          ? (theme) => `2px solid ${theme.palette.text.disabled}`
          : undefined,
      }}
    >
      <Tooltip title={"Перейти на профиль"} placement="top">
        <LinkR to={"/profile/" + message?.owner.id}>
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            badgeContent={
              getLastOnline(message.owner.lastOnline) === "Онлайн" ? " " : 0
            }
            overlap="circular"
            color={"success"}
          >
            <Avatar
              src={message.owner.avatar}
              sx={{
                width: 32,
                height: 32,
              }}
              children={message.owner.nickname.substr(0, 2)}
            />
          </Badge>
        </LinkR>
      </Tooltip>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
            variant="subtitle1"
          >
            <Box
              component="span"
              sx={{
                cursor: "copy",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() =>
                setAddText && setAddText("@" + message.owner.nickname)
              }
            >
              {message.owner.nickname}
            </Box>
            {checkPermissions(
              Permissions.All,
              message.owner.user.permissions
            ) && (
              <Tooltip title="Администратор сайта" placement="top">
                <Box
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    marginLeft: (theme) => theme.spacing(1),
                  }}
                >
                  <Icon24DoneOutline />
                </Box>
              </Tooltip>
            )}
            {!checkPermissions(
              Permissions.All,
              message.owner.user.permissions
            ) &&
              checkPermissions(
                Permissions.PremiumSubscription,
                message.owner.user.permissions
              ) && (
                <Tooltip title="Premium пользователь" placement="top">
                  <Box
                    sx={{
                      color: process.env.REACT_APP_PREMIUM_COLOR,
                      marginLeft: (theme) => theme.spacing(1),
                    }}
                  >
                    <Icon24CrownOutline />
                  </Box>
                </Tooltip>
              )}
            {!checkPermissions(
              Permissions.All,
              message.owner.user.permissions
            ) &&
              checkPermissions(
                Permissions.LiteSubscription,
                message.owner.user.permissions
              ) && (
                <Tooltip title="Lite пользователь" placement="top">
                  <Box
                    sx={{
                      color: process.env.REACT_APP_LITE_COLOR,
                      marginLeft: (theme) => theme.spacing(1),
                    }}
                  >
                    <Icon24CrownOutline />
                  </Box>
                </Tooltip>
              )}
            {checkPermissions(Permissions.GlobalchatRemove, permissions) && (
              <Tooltip title="Удалить сообщение" placement="top">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() =>
                    remove({
                      variables: { id: message.id, server: server },
                    })
                  }
                  sx={{
                    aspectRatio: "1 / 1",
                    marginLeft: (theme) => theme.spacing(1),
                  }}
                >
                  <Icon20DeleteOutline />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          <Tooltip
            title={new Date(message.createdAt).toLocaleString("ru-RU")}
            placement="top"
          >
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                cursor: "default",
              }}
            >
              {new Date(message.createdAt)
                .toLocaleTimeString("ru-RU")
                .substr(0, 5)}
            </Typography>
          </Tooltip>
        </Box>
        <Box>
          <Typography variant="body2">{message.message}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default GlobalChatMessage;
