import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import { Paper, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  Report,
  Reportmessage,
  ReportMessagesConnection,
} from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import { checkPermissions, Permissions } from "../../redux/userData/types";
import ReportMessage from "./ReportMessage";
import ReportMessageForm from "./ReportMessageForm";

const ReportChat: React.FC<{ report: Report }> = ({ report }) => {
  const permissions = useAppSelector((state) => state.userData.permissions);
  const observer = React.useRef<IntersectionObserver>();
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const [after, setAfter] = React.useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const userId = useAppSelector((state) => state.userData.userId);
  const [messages, setMessages] = React.useState<Reportmessage[]>([]);
  const [getMessages, { data, error, loading }] = useLazyQuery<{
    reportMessages: ReportMessagesConnection;
  }>(
    gql`
      query reportMessages($id: Int!, $after: String) {
        reportMessages(
          reportId: $id
          first: 50
          order: { createdAt: DESC }
          after: $after
        ) {
          nodes {
            reportmessageId
            message
            ownerId
            owner {
              userId
              discordId
              nickname
              lastOnline
              avatar
              userRole
            }
            createdAt
            replymessageId
            replymessage {
              reportmessageId
              message
              ownerId
              owner {
                userId
                discordId
                nickname
                lastOnline
                avatar
                userRole
              }
              createdAt
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );
  const [repliedMessage, setRepliedMessage] =
    React.useState<Reportmessage | null>(null);
  const { data: newData } = useSubscription<{
    newReportMessage: Reportmessage;
  }>(
    gql`
      subscription newReportMessage($id: Int!) {
        newReportMessage(id: $id) {
          reportmessageId
          message
          ownerId
          owner {
            userId
            discordId
            nickname
            lastOnline
            avatar
          }
          createdAt
          replymessageId
          replymessage {
            reportmessageId
            message
            ownerId
            owner {
              userId
              discordId
              nickname
              avatar
            }
            createdAt
          }
        }
      }
    `,
    { variables: { id: report.reportId } }
  );

  React.useEffect(() => {
    if (!report?.reportId) return;
    getMessages({ variables: { id: report.reportId } });
  }, [report.reportId, getMessages]);

  React.useEffect(() => {
    if (!data) return;
    setAfter(data.reportMessages.pageInfo.endCursor ?? null);
    if (!data.reportMessages.nodes) return;
    setMessages((prev) => [
      ...prev.filter(
        (u) =>
          !(data.reportMessages.nodes as Reportmessage[])
            .map((m) => m.reportmessageId)
            .includes(u.reportmessageId)
      ),
      ...(data.reportMessages.nodes as Reportmessage[]),
    ]);
  }, [data]);

  React.useEffect(() => {
    if (!newData?.newReportMessage) return;
    setMessages((prev) => [
      ...prev.filter(
        (u) => newData.newReportMessage.reportmessageId !== u.reportmessageId
      ),
      newData.newReportMessage,
    ]);
  }, [newData]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  React.useEffect(() => {
    if (
      loading ||
      data?.reportMessages.nodes?.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getMessages({ variables: { id: report.reportId } });
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, getMessages, after]);

  return (
    <Paper
      sx={{
        minHeight: "400px",
        height: "max-content",
        maxHeight: checkPermissions(Permissions.ShowReports, permissions)
          ? "calc(100vh - 166px - 69px - 16px)"
          : "calc(100vh - 166px)",
        padding: (theme) => theme.spacing(1),
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ScrollContainer
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column-reverse",
        }}
        horizontal={false}
        hideScrollbars={false}
        nativeMobileScroll={false}
        className={"hide-scrollbar"}
      >
        <Stack
          spacing={1}
          direction="column-reverse"
          sx={{
            padding: (theme) => theme.spacing(1),
          }}
        >
          {messages
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((m, i, arr) => (
              <ReportMessage
                key={m.reportmessageId}
                isLeft={userId !== m.owner.userId}
                message={m}
                prev={arr[i - 1]}
                next={arr[i + 1]}
                setReplied={setRepliedMessage}
              />
            ))}
          {!loading && data?.reportMessages.pageInfo.hasNextPage && (
            <div ref={lastElementRef}></div>
          )}
        </Stack>
      </ScrollContainer>
      {!report.isClosed && (
        <ReportMessageForm
          reportId={report.reportId}
          replied={repliedMessage}
          setReplied={setRepliedMessage}
        />
      )}
    </Paper>
  );
};

export default ReportChat;
