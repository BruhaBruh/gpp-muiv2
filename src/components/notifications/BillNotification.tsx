import { gql, useMutation } from "@apollo/client";
import {
  Box,
  IconButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Icon24RoubleBadgeOutline,
  Icon28CancelOutline,
} from "@vkontakte/icons";
import dayjs from "dayjs";
import React from "react";
import { Billnotification } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { removeNotification } from "../../redux/cache/reducer";
import IconWrapper from "../ui/IconWrapper";

const BillNotification: React.FC<{ notification: Billnotification }> = ({
  notification,
}) => {
  const [read] = useMutation(gql`
    mutation read($id: Int!, $type: String!) {
      readNotification(id: $id, type: $type)
    }
  `);
  const dispatch = useAppDispatch();

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={1} direction="row">
        <Box
          sx={{
            width: 32,
            height: 32,
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconWrapper>
            <Icon24RoubleBadgeOutline />
          </IconWrapper>
        </Box>
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
              Оповещение о пополнении баланса
            </Typography>
          }
          secondary={
            <Stack spacing={0.5} direction="row" justifyContent="space-between">
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
                {`Счет #${notification.bill.billId}. Вы успешно пополнили баланс на ${notification.bill.amount} монет`}
              </Typography>
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
                {dayjs(notification.bill.completedAt).format(
                  "HH:mm DD.MM.YYYY"
                )}
              </Typography>
            </Stack>
          }
        />
        <IconButton
          onClick={() => {
            read({
              variables: {
                id: notification.billnotificationId,
                type: notification.__typename,
              },
            });
            dispatch(removeNotification(notification));
          }}
          sx={{ alignSelf: "center", height: "min-content" }}
        >
          <IconWrapper>
            <Icon28CancelOutline />
          </IconWrapper>
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default BillNotification;
