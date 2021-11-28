import { gql, useMutation } from "@apollo/client";
import {
  Box,
  IconButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon28CancelOutline, Icon28ComputerOutline } from "@vkontakte/icons";
import React from "react";
import { Systemnotification } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { removeNotification } from "../../redux/cache/reducer";
import IconWrapper from "../ui/IconWrapper";

const SystemNotification: React.FC<{ notification: Systemnotification }> = ({
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
            <Icon28ComputerOutline />
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
              Системное оповещение
            </Typography>
          }
          secondary={
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
              {notification.message}
            </Typography>
          }
        />
        <IconButton
          onClick={() => {
            read({
              variables: {
                id: notification.systemnotificationId,
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

export default SystemNotification;
