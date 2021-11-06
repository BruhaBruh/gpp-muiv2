import { useLazyQuery } from "@apollo/client";
import { Box, Paper, Stack } from "@mui/material";
import { Icon24Back } from "@vkontakte/icons";
import gql from "graphql-tag";
import React from "react";
import { BlockMapType, NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import { useHistory, useParams } from "react-router";
import CellR from "../../components/ui/CellR";
import Head from "../../components/ui/Head";
import IconWrapper from "../../components/ui/IconWrapper";
import Marksy from "../../components/utils/Marksy";
import { News } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSidebarHeader } from "../../redux/ui/reducer";

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [getNews, { data, error }] = useLazyQuery<{ newsByID: News }>(gql`
    query newsById($id: ObjectID!) {
      newsByID(id: $id) {
        id
        title
        text
        createdAt
        tags {
          color
          label
        }
      }
    }
  `);
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => state.ui.header);
  const history = useHistory();
  const [blocks, setBlocks] = React.useState<BlockMapType>();

  React.useEffect(() => {
    if (!error) return;
    history.push("/info");
  }, [error, history]);

  React.useEffect(() => {
    if (!id) return;
    getNews({ variables: { id: id } });
  }, [getNews, id]);

  React.useEffect(() => {
    if (!data) return;
    console.log(data.newsByID.text);
    if (/^.*-[a-f0-9]*$/i.test(data.newsByID.text)) {
      fetch("https://notion-api.splitbee.io/v1/page/" + data.newsByID.text)
        .then((res) => res.json())
        .then((b) => setBlocks(b));
    }
  }, [data]);

  React.useEffect(() => {
    dispatch(
      setSidebarHeader(
        <CellR
          to="/info"
          onClick={() => dispatch(setSidebarHeader(null))}
          sx={{ height: "100%" }}
          startIcon={
            <IconWrapper
              component="span"
              size={20}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24Back />
            </IconWrapper>
          }
        >
          Назад
        </CellR>
      )
    );
  }, [dispatch, header]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        height: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Head name={data ? data.newsByID.title : "Новость"} />
      {data && (
        <Paper
          sx={{
            overflow: "hidden",
            padding: (theme) => theme.spacing(2),
          }}
        >
          {/^.*-[a-f0-9]*$/i.test(data.newsByID.text) && blocks ? (
            <Box
              sx={{
                "& *": {
                  color: (theme) => `${theme.palette.text.primary} !important`,
                },
              }}
            >
              <NotionRenderer blockMap={blocks} />
            </Box>
          ) : (
            <Marksy text={data.newsByID.text} />
          )}
        </Paper>
      )}
    </Stack>
  );
};

export default NewsPage;
