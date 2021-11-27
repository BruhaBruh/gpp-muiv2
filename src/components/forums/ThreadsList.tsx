import { gql, useLazyQuery } from "@apollo/client";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Thread, ThreadsConnection } from "../../graphql/types";
import ThreadCell from "./ThreadCell";

const ThreadsList: React.FC<{ currentForumId: number }> = ({
  currentForumId,
}) => {
  const [after, setAfter] = React.useState<string | null>(null);
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const [getThreads, { data, loading }] = useLazyQuery<{
    threads: ThreadsConnection;
  }>(
    gql`
      query threads($after: String, $where: ThreadFilterInput) {
        threads(first: 50, where: $where, after: $after) {
          nodes {
            threadId
            name
            isPinned
            canChat
            createdAt
            firstPost {
              owner {
                userId
                discordId
                nickname
                userRole
                permissions
                avatar
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );
  const [threads, setThreads] = React.useState<Thread[]>([]);

  React.useEffect(() => {
    getThreads({ variables: { where: { forumId: { eq: currentForumId } } } });
  }, [currentForumId, getThreads]);

  React.useEffect(() => {
    if (!data) return;
    setAfter(data.threads.pageInfo.endCursor ?? null);
    setThreads((prev) =>
      [
        ...prev.filter(
          (u) =>
            !(data.threads.nodes as Thread[])
              .map((n) => n.threadId)
              .includes(u.threadId)
        ),
        ...(data.threads.nodes as Thread[]),
      ].sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
    );
  }, [data, setAfter]);

  React.useEffect(() => {
    if (
      loading ||
      data?.threads.nodes?.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getThreads({
          variables: {
            where: { forumId: { eq: currentForumId } },
            after: after,
          },
        });
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, getThreads, data, after]);

  if (loading) return <LinearProgress />;

  return (
    <>
      {threads.length !== 0 && (
        <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Темы
            </Typography>
            {threads.map((t) => (
              <ThreadCell key={t.threadId} thread={t} />
            ))}
          </Stack>
        </Paper>
      )}
      {loading && <LinearProgress />}
      {!loading && data?.threads?.pageInfo?.hasNextPage && (
        <div ref={lastElementRef}></div>
      )}
    </>
  );
};

export default ThreadsList;
