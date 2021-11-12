import { gql, useMutation } from "@apollo/client";
import { IconButton, Tooltip } from "@mui/material";
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

  return (
    <Cell
      startIcon={
        <IconWrapper size={size}>
          <Icon24RobotOutline />
        </IconWrapper>
      }
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
      {notification.message}
    </Cell>
  );
};

export default SystemNotification;
