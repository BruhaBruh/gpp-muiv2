import { gql, useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import { Post, PostsConnection } from "../../graphql/types";
import PostCard from "./PostCard";

const PostsList: React.FC<{ threadId: number }> = ({ threadId }) => {
  const [after, setAfter] = React.useState<string | null>();
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [getPosts, { data, loading }] = useLazyQuery<{
    posts: PostsConnection;
  }>(
    gql`
      query posts($where: PostFilterInput, $after: String) {
        posts(
          first: 25
          where: $where
          order: { createdAt: ASC }
          after: $after
        ) {
          nodes {
            postId
            message
            createdAt
            updatedAt
            replyId
            reply {
              postId
              message
              createdAt
              updatedAt
              owner {
                userId
                discordId
                nickname
                userRole
                role
                permissions
                avatar
              }
            }
            ownerId
            owner {
              userId
              discordId
              nickname
              userRole
              role
              permissions
              avatar
              lastOnline
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
  ); // { threadId: { eq: 9 } }

  React.useEffect(() => {
    if (!data?.posts.nodes) return;
    setAfter(data.posts.pageInfo.endCursor);
    if (!data.posts.nodes) return;
    setPosts((prev) =>
      [
        ...prev.filter(
          (u) =>
            !(data.posts.nodes as Post[])
              .map((n) => n.postId)
              .includes(u.postId)
        ),
        ...(data.posts.nodes as Post[]),
      ].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  }, [data, setAfter, setPosts]);

  React.useEffect(() => {
    getPosts({ variables: { where: { threadId: { eq: threadId } } } });
  }, [threadId, getPosts]);

  React.useEffect(() => {
    if (
      loading ||
      data?.posts.nodes?.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        console.log("new");
        getPosts({
          variables: { after: after, where: { threadId: { eq: threadId } } },
        });
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, getPosts, data, after]);

  return (
    <Stack spacing={1}>
      {posts.map((p) => (
        <PostCard key={p.postId} post={p} />
      ))}
      {loading && <LinearProgress />}
      {!loading && data?.posts.pageInfo.hasNextPage && (
        <div ref={lastElementRef}></div>
      )}
    </Stack>
  );
};

export default PostsList;
