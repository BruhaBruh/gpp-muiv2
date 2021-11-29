import { gql, useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack } from "@mui/material";
import { Icon24Add } from "@vkontakte/icons";
import React from "react";
import { useParams } from "react-router";
import CreateThreadForUser from "../../components/forums/CreateThreadForUser";
import ForumHeader from "../../components/forums/ForumHeader";
import ForumsList from "../../components/forums/ForumsList";
import TheardsList from "../../components/forums/ThreadsList";
import Cell from "../../components/ui/Cell";
import Head from "../../components/ui/Head";
import IconWrapper from "../../components/ui/IconWrapper";
import { Forum } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const ForumPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [getForum, { data, loading }] = useLazyQuery<{ forums: Forum[] }>(
    gql`
      query forums($where: ForumFilterInput) {
        forums(where: $where) {
          forumId
          name
          link
          parentForumId
          parentForum {
            parentForumId
            name
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );
  const [getParentForum, { data: parentData }] = useLazyQuery<{
    forums: Forum[];
  }>(
    gql`
      query forums($where: ForumFilterInput) {
        forums(where: $where) {
          forumId
          name
          link
          isOpen
          parentForumId
          parentForum {
            name
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    if (!/^\d*$/i.test(id)) return;
    getForum({ variables: { where: { parentForumId: { eq: Number(id) } } } });
    getParentForum({ variables: { where: { forumId: { eq: Number(id) } } } });
  }, [id, getForum, getParentForum]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <ForumHeader />
      {parentData?.forums[0] && (
        <Head
          showBack
          name={`${parentData.forums[0].parentForum?.name} › ${parentData.forums[0].name}`}
        />
      )}
      {loading && <LinearProgress />}
      {data?.forums && !!data.forums.length && (
        <ForumsList forums={data.forums} />
      )}
      {parentData?.forums[0] && parentData?.forums[0].isOpen && (
        <Cell
          onClick={() =>
            dispatch(
              setModal(
                <CreateThreadForUser forumId={parentData.forums[0].forumId} />
              )
            )
          }
          startIcon={
            <IconWrapper>
              <Icon24Add />
            </IconWrapper>
          }
        >
          Создать тему
        </Cell>
      )}
      {parentData?.forums[0] && (
        <TheardsList currentForumId={parentData?.forums[0].forumId} />
      )}
    </Stack>
  );
};

export default ForumPage;
