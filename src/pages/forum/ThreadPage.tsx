import { gql, useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useParams } from "react-router-dom";
import PostForm from "../../components/forums/PostForm";
import PostsList from "../../components/forums/PostsList";
import ThreadCell from "../../components/forums/ThreadCell";
import Head from "../../components/ui/Head";
import { ThreadsConnection } from "../../graphql/types";

const ThreadPage = () => {
  const { id } = useParams<{ id: string }>();
  const [getThread, { data, loading }] = useLazyQuery<{
    threads: ThreadsConnection;
  }>(
    gql`
      query threads($where: ThreadFilterInput) {
        threads(first: 1, where: $where) {
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
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    if (!/^\d*$/.test(id)) return;
    getThread({ variables: { where: { threadId: { eq: Number(id) } } } });
  }, [id, getThread]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {loading && <LinearProgress />}

      {data?.threads.nodes && data.threads.nodes[0] && (
        <>
          <Head name={data.threads.nodes[0].name} showBack />
          <ThreadCell thread={data.threads.nodes[0]} />
          <ScrollContainer
            className="hide-scrollbar"
            hideScrollbars={false}
            horizontal={false}
            style={{
              maxHeight: "calc(100vh - 305px)",
            }}
          >
            <PostsList threadId={data.threads.nodes[0].threadId} />
          </ScrollContainer>
          {data.threads.nodes[0].canChat && (
            <PostForm threadId={data.threads.nodes[0].threadId} />
          )}
        </>
      )}
    </Stack>
  );
};

export default ThreadPage;
