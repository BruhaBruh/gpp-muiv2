import { gql, useMutation } from "@apollo/client";
import { Avatar, Box, IconButton, Stack, Tooltip } from "@mui/material";
import { Icon20Cancel, Icon20Check } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import {
  NotificationType,
  OrderNotification as N,
} from "../../graphql/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { readNotification } from "../../redux/notifications/reducer";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";

const OrderNotification: React.FC<{ notification: N }> = ({ notification }) => {
  const size = 32;
  const [read, { error }] = useMutation(
    gql`
      mutation read($id: ObjectID!, $type: NotificationType!) {
        readNotification(id: $id, type: $type)
      }
    `,
    {
      variables: { id: Number(notification.id), type: NotificationType.Order },
    }
  );
  const [complete, { error: cError }] = useMutation(
    gql`
      mutation completeOrder($id: ObjectID!) {
        completeOrder(id: $id)
      }
    `,
    { variables: { id: Number(notification.id) } }
  );
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!error && !cError) return;
    enqueueSnackbar(error?.message || cError?.message, { variant: "error" });
  }, [error, cError, enqueueSnackbar]);

  return (
    <Cell
      startIcon={
        <LazyLoadComponent>
          <Avatar
            src={notification.product.icon.image}
            sx={{
              width: size,
              height: size,
              imageRendering: "pixelated",
            }}
            variant="rounded"
          />
        </LazyLoadComponent>
      }
      endIcon={
        <Stack spacing={1} direction="row">
          <Tooltip placement="top" title="Да">
            <IconButton
              onClick={() => {
                complete();
                dispatch(readNotification(notification));
              }}
              color="success"
            >
              <IconWrapper size={size - 8}>
                <Icon20Check />
              </IconWrapper>
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Нет">
            <IconButton
              onClick={() => {
                read();
                dispatch(readNotification(notification));
              }}
              color="error"
            >
              <IconWrapper size={size - 8}>
                <Icon20Cancel />
              </IconWrapper>
            </IconButton>
          </Tooltip>
        </Stack>
      }
      sx={{ textTransform: "none", textAlign: "left" }}
    >
      {notification.product.owner.nickname} продал(а) вам{" "}
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "baseline",
          margin: "0 4px",
          color: notification.product.icon.category.color,
        }}
      >
        {notification.product.icon.name}
      </Box>{" "}
      в кол-ве {notification.amount} шт по итоговой цене {notification.cost} $?
    </Cell>
  );
};

export default OrderNotification;
