import { gql, useLazyQuery } from "@apollo/client";
import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useHistory, useParams } from "react-router";
import ReportMessageForm from "../../components/report/ReportMessageForm";
import ReportMessages from "../../components/report/ReportMessages";
import { ReportChat, ReportType } from "../../graphql/graphql";

const ReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const [
    getReport,
    { data: reportData, loading: reportLoading, error: reportError },
  ] = useLazyQuery<{
    report: ReportChat;
  }>(gql`
    query report($id: ObjectID!) {
      report(id: $id) {
        id
        owner {
          id
        }
        type
      }
    }
  `);
  const history = useHistory();

  React.useEffect(() => {
    if (!id) return;
    getReport({ variables: { id: id } });
  }, [id, getReport]);

  React.useEffect(() => {
    if (!reportError) return;
    history.push("/report");
  }, [history, reportError]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
        maxHeight: "100%",
      }}
    >
      <Paper
        sx={{
          overflow: "hidden",
          padding: (theme) => theme.spacing(2),
          flex: 1,
        }}
      >
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) =>
                reportData?.report.type === ReportType.Bug
                  ? theme.palette.warning.main
                  : reportData?.report.type === ReportType.Report
                  ? theme.palette.error.main
                  : theme.palette.info.main,
              textTransform: "uppercase",
            }}
          >
            {reportData?.report.type === ReportType.Bug
              ? "Баг "
              : reportData?.report.type === ReportType.Report
              ? "Жалоба "
              : "Предложение "}
            <Box
              component="span"
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              {id}
            </Box>
          </Typography>
          {reportLoading && (
            <Box sx={{ flex: 1 }}>
              <LinearProgress />
            </Box>
          )}
          {reportData && <ReportMessages report={reportData.report} />}
          {reportData && <ReportMessageForm report={reportData.report} />}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ReportPage;
