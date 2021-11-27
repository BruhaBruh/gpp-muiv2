import { gql, useQuery } from "@apollo/client";
import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import ForumHeader from "../../components/forums/ForumHeader";
import ForumsList from "../../components/forums/ForumsList";
import { Forum } from "../../graphql/types";

const IndexPage = () => {
  const { data, loading } = useQuery<{ forums: Forum[] }>(
    gql`
      query ForumsList {
        forums(where: { parentForumId: { eq: null } }) {
          inverseParentForum {
            forumId
            name
            link
            parentForumId
            parentForum {
              name
            }
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <ForumHeader />
      {loading && <LinearProgress />}
      {data?.forums && !!data.forums.length && (
        <ForumsList forums={data.forums[0].inverseParentForum} />
      )}
    </Stack>
  );
};

export default IndexPage;
