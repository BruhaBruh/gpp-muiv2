import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import {
  Avatar,
  Badge,
  Box,
  LinearProgress,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { ReportChat, ReportMessage } from "../../graphql/graphql";
import { getLastOnline } from "../../redux/userData/types";
import Cell from "../ui/Cell";

interface props {
  report: ReportChat;
}

const ReportMessages: React.FC<props> = ({ report }) => {
  const [messages, setMessages] = React.useState<ReportMessage[]>([]);
  const [getMessages, { data, loading }] = useLazyQuery<{
    reportMessages: ReportMessage[];
  }>(
    gql`
      query getMessages($id: ObjectID!) {
        reportMessages(id: $id) {
          id
          owner {
            id
            avatar
            nickname
            lastOnline
            user {
              permissions
            }
          }
          type
          message
          createdAt
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  const { data: subData } = useSubscription<{
    newReportMessage: ReportMessage;
  }>(
    gql`
      subscription newReportMessage($id: ObjectID!) {
        newReportMessage(id: $id) {
          id
          owner {
            id
            avatar
            nickname
            lastOnline
            user {
              permissions
            }
          }
          type
          message
          createdAt
        }
      }
    `,
    { variables: { id: report.id } }
  );

  React.useEffect(() => {
    if (!report.id) return;
    getMessages({ variables: { id: report.id } });
  }, [getMessages, report.id]);

  React.useEffect(() => {
    if (!subData) return;
    setMessages((prev) => [...prev, subData.newReportMessage]);
  }, [subData]);

  React.useEffect(() => {
    if (!data) return;
    setMessages(data.reportMessages);
  }, [data]);

  return (
    <Stack
      spacing={1}
      sx={{ height: "calc(100vh - 216px)", overflowY: "scroll" }}
      className="hide-scrollbar"
      direction="column-reverse"
    >
      {messages
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((m) => (
          <Cell
            key={m.id}
            disableRipple
            startIcon={
              <LazyLoadComponent>
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                  badgeContent={
                    getLastOnline(m.owner.lastOnline) === "Онлайн" ? " " : 0
                  }
                  overlap="circular"
                  color={"success"}
                  sx={{
                    marginRight: (theme) => theme.spacing(2),
                    ".MuiBadge-dot": {
                      border: (theme) =>
                        `2px solid ${theme.palette.background.paper}`,
                      minWidth: "auto",
                      width: "7px",
                      height: "7px",
                      borderRadius: "100px",
                      boxSizing: "content-box",
                    },
                  }}
                >
                  <Avatar
                    src={m.owner.avatar}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </Badge>
              </LazyLoadComponent>
            }
            endIcon={
              <Tooltip
                placement="top"
                title={dayjs(m.createdAt).format("HH:mm DD.MM.YYYY")}
              >
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {dayjs(m.createdAt).format("HH:mm")}
                </Typography>
              </Tooltip>
            }
          >
            <ListItemText
              primary={
                <Typography variant="body1">
                  {m.owner.nickname}
                  {report.owner.id !== m.owner.id && (
                    <Box
                      component="span"
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        marginLeft: "4px",
                      }}
                    >
                      Админ
                    </Box>
                  )}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {m.message}
                </Typography>
              }
              sx={{ textAlign: "left", textTransform: "none" }}
            />
          </Cell>
        ))}
      {loading && <LinearProgress />}
    </Stack>
  );
};

export default ReportMessages;
