import { useLazyQuery } from "@apollo/client";
import { Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Box, Theme } from "@mui/system";
import dayjs from "dayjs";
import gql from "graphql-tag";
import React from "react";
import { useHistory } from "react-router";
import { NewsResult } from "../../graphql/graphql";

const NewsList = () => {
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const [page, setPage] = React.useState(2);
  const history = useHistory();
  const [getNews, { data: news, fetchMore, loading }] = useLazyQuery<{
    news: NewsResult;
  }>(
    gql`
      query news($page: Int!, $limit: Int!) {
        news(page: $page, limit: $limit) {
          result {
            id
            title
            createdAt
            tags {
              color
              label
            }
          }
          hasMore
        }
      }
    `,
    { variables: { page: 1, limit: 25 } }
  );

  React.useEffect(() => {
    getNews();
    setPage(2);
  }, [getNews]);

  React.useEffect(() => {
    if (
      loading ||
      news?.news.result.length === 0 ||
      lastElementRef.current === null ||
      !fetchMore
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        fetchMore({
          variables: {
            page: page,
          },
        });
        setPage((prev) => prev + 1);
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, page, loading, fetchMore]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: (theme: Theme) => theme.spacing(2),
        cursor: "pointer",
      }}
    >
      {news?.news.result.map((n) => (
        <Box key={n.id} onClick={() => history.push("/news/" + n.id)}>
          <Paper sx={{ padding: (theme: Theme) => theme.spacing(1) }}>
            <Stack spacing={1}>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                variant="h6"
              >
                {n.title}
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{ overflowX: "scroll", flex: "1" }}
                  className="hide-scrollbar"
                >
                  <div style={{ display: "flex", width: "max-content" }}>
                    {n.tags.map((t) => (
                      <Chip
                        key={t.label}
                        label={t.label}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: t.color,
                          textTransform: "uppercase",
                          marginRight: (theme: Theme) => theme.spacing(1),
                        }}
                      />
                    ))}
                  </div>
                </Box>
                <Tooltip
                  placement="top"
                  title={dayjs(n.createdAt).format("HH:mm DD.MM.YYYY")}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      marginLeft: "auto",
                      paddingLeft: (theme: Theme) => theme.spacing(0.5),
                      width: "max-content",
                      color: (theme: Theme) => theme.palette.text.secondary,
                    }}
                  >
                    {dayjs(n.createdAt).format("HH:mm")}
                  </Typography>
                </Tooltip>
              </div>
            </Stack>
          </Paper>
        </Box>
      ))}
      {news?.news.hasMore && !loading && (
        <div style={{ minHeight: "10px" }} ref={lastElementRef}></div>
      )}
    </Box>
  );
};

export default NewsList;
