import { useLazyQuery } from "@apollo/client";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import { ReportsConnection } from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addReports,
  clearReports,
  setReportsUpdate,
} from "../../redux/cache/reducer";
import { checkPermissions, Permissions } from "../../redux/userData/types";
import ReportCell from "./ReportCell";

const ReportsList = () => {
  const permissions = useAppSelector((state) => state.userData.permissions);
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const [after, setAfter] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const reportsUpdate = useAppSelector((state) => state.cache.reportsUpdate);
  const reports = useAppSelector((state) => state.cache.reports);
  const [getReports, { data: reportsData, loading: reportsLoading }] =
    useLazyQuery<{
      reports: ReportsConnection;
    }>(
      gql`
        query reports($after: String) {
          reports(after: $after) {
            nodes {
              reportId
              owner {
                userId
                discordId
                avatar
                nickname
              }
              lastMessage {
                createdAt
                owner {
                  userId
                  discordId
                  nickname
                  avatar
                }
                message
              }
              type
              subtype
              to {
                userId
                discordId
                nickname
              }
              isClosed
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

  React.useEffect(() => {
    if (!reportsUpdate) return;
    getReports();
    dispatch(clearReports());
    dispatch(setReportsUpdate(false));
  }, [getReports, reportsUpdate, dispatch]);

  React.useEffect(() => {
    if (
      reportsLoading ||
      reportsData?.reports.nodes?.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getReports({ variables: { after } });
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, getReports, after]);

  React.useEffect(() => {
    if (!reportsData) return;
    setAfter(reportsData.reports.pageInfo.endCursor ?? null);
    if (reportsData.reports.nodes)
      dispatch(addReports(reportsData.reports.nodes));
  }, [reportsData, setAfter, dispatch]);

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          {checkPermissions(Permissions.ShowReports, permissions)
            ? "Все репорты"
            : "Ваши репорты"}
        </Typography>
        {reports.map((r) => (
          <ReportCell key={r.reportId} report={r} />
        ))}
        {reportsLoading && <LinearProgress />}
        {!reportsLoading && reportsData?.reports.pageInfo.hasNextPage && (
          <div ref={lastElementRef}></div>
        )}
      </Stack>
    </Paper>
  );
};

export default ReportsList;
