import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon24DeleteOutline, Icon24PenOutline } from "@vkontakte/icons";
import dayjs from "dayjs";
import React from "react";
import { Message, MessageType } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { readMessage as readMessageR } from "../../redux/chats/reducer";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import LinkR from "../ui/LinkR";
import ProductChat from "./ProductChat";

interface props {
  message: Message;
  onRemove: () => void;
  setMessageToEdit: (value: React.SetStateAction<Message | undefined>) => void;
  prevMessage?: Message;
}

const ChatMessage: React.FC<props> = ({
  message,
  onRemove,
  setMessageToEdit,
  prevMessage,
}) => {
  const hideButtons = useMediaQuery("(max-width: 1200px)");
  const profileId = useAppSelector((state) => state.userData.profileId);
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const dispatch = useAppDispatch();
  const [onHover, setOnHover] = React.useState(false);
  const [readMessage] = useMutation(
    gql`
      mutation read($msg: ObjectID!) {
        readMessage(id: $msg) {
          id
        }
      }
    `,
    { variables: { msg: message.id } }
  );

  React.useEffect(() => {
    if (!message.readed) return;
    if (elementRef.current === null || message.readed.includes(profileId))
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        readMessage();
        dispatch(readMessageR({ message: message, profile: profileId }));
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(elementRef.current);
  }, [elementRef, profileId, readMessage, message, dispatch]);

  return (
    <Stack
      spacing={0.75}
      direction="row"
      ref={elementRef}
      sx={{ alignItems: "start" }}
      onMouseEnter={(e) => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={() => {
        if (!hideButtons) return;
        if (
          !(
            (message.owner?.id === profileId &&
              new Date().getTime() - new Date(message.createdAt).getTime() <
                1000 * 60 * 15) ||
            new Date().getTime() - new Date(message.createdAt).getTime() <
              1000 * 60 * 30
          )
        )
          return;
        dispatch(
          setModal(
            <Dialog
              open={true}
              onClose={() => dispatch(setModal(null))}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Stack spacing={1}>
                    {new Date().getTime() -
                      new Date(message.createdAt).getTime() <
                      1000 * 60 * 15 && (
                      <Button
                        color="primary"
                        variant="text"
                        onClick={() => {
                          setMessageToEdit(message);
                          dispatch(setModal(null));
                        }}
                        fullWidth
                        startIcon={<Icon24PenOutline />}
                        size="medium"
                      >
                        Редактировать
                      </Button>
                    )}
                    <Button
                      color="error"
                      variant="text"
                      onClick={onRemove}
                      fullWidth
                      startIcon={<Icon24DeleteOutline />}
                      size="medium"
                    >
                      Удалить
                    </Button>
                  </Stack>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          )
        );
      }}
    >
      {message.type === MessageType.System ? null : prevMessage?.owner?.id !==
        message.owner?.id ? (
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
          badgeContent={
            getLastOnline(message.owner?.lastOnline) === "Онлайн" ? " " : 0
          }
          overlap="circular"
          color={"success"}
        >
          <Avatar
            src={message.owner?.avatar}
            sx={{
              width: 40,
              height: 40,
            }}
            children={message.owner?.nickname.substr(0, 2)}
          />
        </Badge>
      ) : (
        <div style={{ width: "40px", height: "2px" }} />
      )}
      <Stack
        spacing={0}
        sx={{
          flex: 1,
          width: "1px",
          minHeight: hideButtons ? undefined : "24px",
        }}
      >
        {message.type === MessageType.User &&
          prevMessage?.owner?.id !== message.owner?.id && (
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <LinkR
                to={"/profile/" + message.owner?.id}
                color="inherit"
                underline="hover"
              >
                {message.owner?.nickname}
              </LinkR>{" "}
              <Tooltip
                title={dayjs(message.createdAt).format("HH:mm DD.MM.YYYY")}
                placement="top"
              >
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    cursor: "default",
                  }}
                >
                  {dayjs(message.createdAt).format("HH:mm")}
                </Typography>
              </Tooltip>
            </Typography>
          )}
        {/^!\[[a-f0-9]{24}\]$/gi.test(message.message) ? (
          <ProductChat
            id={message.message
              .replaceAll("[", "")
              .replaceAll("!", "")
              .replaceAll("]", "")}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textAlign:
                message.type === MessageType.System ? "center" : undefined,
            }}
          >
            {message.message}{" "}
            {message.edited && (
              <Tooltip
                title={dayjs(message.updatedAt).format("HH:mm DD.MM.YYYY")}
                placement="top"
              >
                <span style={{ fontSize: "0.7rem", cursor: "default" }}>
                  (ред.)
                </span>
              </Tooltip>
            )}
          </Typography>
        )}
      </Stack>
      {onHover &&
        !hideButtons &&
        message.owner?.id === profileId &&
        new Date().getTime() - new Date(message.createdAt).getTime() <
          1000 * 60 * 15 && (
          <IconButton
            onClick={() => setMessageToEdit(message)}
            color="primary"
            size="small"
            sx={{ padding: 0 }}
          >
            <Icon24PenOutline />
          </IconButton>
        )}
      {onHover &&
        !hideButtons &&
        message.owner?.id === profileId &&
        new Date().getTime() - new Date(message.createdAt).getTime() <
          1000 * 60 * 30 && (
          <IconButton
            onClick={onRemove}
            color="error"
            size="small"
            sx={{ padding: 0 }}
          >
            <Icon24DeleteOutline />
          </IconButton>
        )}
    </Stack>
  );
};

export default ChatMessage;
