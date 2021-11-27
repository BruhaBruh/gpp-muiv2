import { gql, useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ReportButtons from "../../components/report/ReportButtons";
import ReportChat from "../../components/report/ReportChat";
import ReportHeader from "../../components/report/ReportHeader";
import { ReportsConnection } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import { checkPermissions, Permissions } from "../../redux/userData/types";

const ReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const permissions = useAppSelector((state) => state.userData.permissions);
  const { enqueueSnackbar } = useSnackbar();
  const [
    getReport,
    { data: reportData, loading: reportLoading, error: reportError },
  ] = useLazyQuery<{ reports: ReportsConnection }>(
    gql`
      query reports($where: ReportFilterInput) {
        reports(first: 1, where: $where) {
          nodes {
            reportId
            owner {
              userId
              discordId
              avatar
              nickname
              banreportEndAt
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
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    if (!/^\d*$/.test(id)) history.push("/r");
    getReport({ variables: { where: { reportId: { eq: Number(id) } } } });
  }, [id, history, getReport]);

  React.useEffect(() => {
    if (!reportError) return;
    enqueueSnackbar(reportError.message, { variant: "error" });
  }, [reportError, enqueueSnackbar]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {reportLoading && <LinearProgress />}
      {reportData?.reports.nodes && reportData?.reports.nodes?.length !== 0 && (
        <ReportHeader report={reportData.reports.nodes[0]} />
      )}
      {checkPermissions(Permissions.ShowReports, permissions) &&
        reportData?.reports.nodes &&
        reportData?.reports.nodes?.length !== 0 && (
          <ReportButtons
            report={reportData.reports.nodes[0]}
            update={() =>
              getReport({
                variables: { where: { reportId: { eq: Number(id) } } },
              })
            }
          />
        )}
      {reportData?.reports.nodes && reportData?.reports.nodes?.length !== 0 && (
        <ReportChat report={reportData.reports.nodes[0]} />
      )}
    </Stack>
  );
};

export default ReportPage;
