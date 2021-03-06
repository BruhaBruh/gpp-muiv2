import { gql, useMutation } from "@apollo/client";
import {
  Button,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUserUpdate } from "../../redux/cache/reducer";
import { checkSettings, Settings } from "../../redux/userData/types";

const NotificationPage = () => {
  const settings = useAppSelector((state) => state.userData.settings);
  const [notifyReport, setNotifyReport] = React.useState(
    checkSettings(Settings.NotifyOnReport, settings)
  );
  const [notifyReportMessage, setNotifyReportMessage] = React.useState(
    checkSettings(Settings.NotifyOnReportMessage, settings)
  );
  const [notifyFriend, setNotifyFriend] = React.useState(
    checkSettings(Settings.NotifyOnNewFriend, settings)
  );
  const [notifySubscriber, setNotifySubscriber] = React.useState(
    checkSettings(Settings.NotifyOnNewSubscriber, settings)
  );
  const [save, { data, error, loading }] = useMutation(gql`
    mutation save(
      $id: Int!
      $r: Boolean
      $rm: Boolean
      $f: Boolean
      $s: Boolean
    ) {
      editUser(
        id: $id
        input: {
          isNotifyOnReport: $r
          isNotifyOnReportMessage: $rm
          isNotifyOnNewFriend: $f
          isNotifyOnNewSubscriber: $s
        }
      ) {
        userId
      }
    }
  `);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userData.userId);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setNotifyFriend(checkSettings(Settings.NotifyOnNewFriend, settings));
    setNotifyReport(checkSettings(Settings.NotifyOnReport, settings));
    setNotifyReportMessage(
      checkSettings(Settings.NotifyOnReportMessage, settings)
    );
    setNotifySubscriber(
      checkSettings(Settings.NotifyOnNewSubscriber, settings)
    );
  }, [
    settings,
    setNotifyFriend,
    setNotifyReport,
    setNotifyReportMessage,
    setNotifySubscriber,
  ]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(setUserUpdate(true));
    enqueueSnackbar("??????????????!", { variant: "success" });
  }, [data, dispatch, enqueueSnackbar]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            ??????????????????????
          </Typography>
          <Button
            variant="text"
            color="inherit"
            size="large"
            onClick={() => setNotifyReport((prev) => !prev)}
          >
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
                  ?????????? ????????????
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
                  ?????? ?????????? ???????????? ???? ??????, ?????? ?????????? ???????????????????????? ??????????????????????
                </Typography>
              }
            />
            <Switch checked={notifyReport} />
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="large"
            onClick={() => setNotifyReportMessage((prev) => !prev)}
          >
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
                  ?????????? ?????????????????? ?? ??????????????
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
                  ?????? ?????????? ?????????????????? ?? ??????????????, ?????? ?????????? ????????????????????????
                  ??????????????????????
                </Typography>
              }
            />
            <Switch checked={notifyReportMessage} />
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="large"
            onClick={() => setNotifyFriend((prev) => !prev)}
          >
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
                  ?????????? ????????
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
                  ?????? ?????????? ??????????, ?????? ?????????? ???????????????????????? ??????????????????????
                </Typography>
              }
            />
            <Switch checked={notifyFriend} />
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="large"
            onClick={() => setNotifySubscriber((prev) => !prev)}
          >
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
                  ?????????? ??????????????????
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
                  ?????? ?????????? ????????????????????, ?????? ?????????? ???????????????????????? ??????????????????????
                </Typography>
              }
            />
            <Switch checked={notifySubscriber} />
          </Button>
          <Button
            disabled={loading}
            onClick={() =>
              save({
                variables: {
                  id: userId,
                  r: notifyReport,
                  rm: notifyReportMessage,
                  s: notifySubscriber,
                  f: notifyFriend,
                },
              })
            }
            fullWidth
            size="medium"
          >
            ??????????????????
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NotificationPage;
