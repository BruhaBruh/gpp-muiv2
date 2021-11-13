import { gql, useMutation } from "@apollo/client";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Icon20Check, Icon24RobotOutline } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import {
  NotificationType,
  SystemNotification as N,
} from "../../graphql/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { readNotification } from "../../redux/notifications/reducer";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";

const SystemNotification: React.FC<{ notification: N }> = ({
  notification,
}) => {
  const size = 32;
  const [read, { error }] = useMutation(
    gql`
      mutation read($id: ObjectID!, $type: NotificationType!) {
        readNotification(id: $id, type: $type)
      }
    `,
    {
      variables: { id: Number(notification.id), type: NotificationType.System },
    }
  );
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  const getStart = () => {
    if (/^\[\d*\] (Жалоба|Баг|Предложение):/i.test(notification.message)) {
      return (
        <Avatar
          variant={"circular"}
          sx={{
            width: size,
            height: size,
            color: (theme) =>
              notification.message.split(" ")[1].substr(0, 1) === "Б"
                ? theme.palette.warning.main
                : notification.message.split(" ")[1].substr(0, 1) === "Ж"
                ? theme.palette.error.main
                : theme.palette.info.main,
          }}
          children={notification.message
            .split(" ")[0]
            .replaceAll("[", "")
            .replaceAll("]", "")}
        />
      );
    } else if (
      /^Репорт типа "(Жалоба|Баг|Предложение)" с ID/i.test(notification.message)
    ) {
      return (
        <Avatar
          variant={"circular"}
          sx={{
            width: size,
            height: size,
            color: (theme) =>
              notification.message.split('"')[1].substr(0, 1) === "Б"
                ? theme.palette.warning.main
                : notification.message.split('"')[1].substr(0, 1) === "Ж"
                ? theme.palette.error.main
                : theme.palette.info.main,
          }}
          children={notification.message.split('"')[1].substr(0, 1)}
        />
      );
    } else {
      return (
        <IconWrapper size={size}>
          <Icon24RobotOutline />
        </IconWrapper>
      );
    }
  };

  const getMessage = () => {
    if (/^\[\d*\] (Жалоба|Баг|Предложение):/i.test(notification.message)) {
      return notification.message.split(": ").slice(1);
    } else {
      return notification.message;
    }
  };

  return (
    <Cell
      startIcon={getStart()}
      endIcon={
        <Tooltip placement="top" title="Прочесть">
          <IconButton
            onClick={() => {
              read();
              dispatch(readNotification(notification));
            }}
          >
            <IconWrapper
              size={size - 8}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon20Check />
            </IconWrapper>
          </IconButton>
        </Tooltip>
      }
      sx={{ textTransform: "none", textAlign: "left" }}
    >
      {getMessage()}
    </Cell>
  );
};

export default SystemNotification;
