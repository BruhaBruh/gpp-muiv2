import { useMutation } from "@apollo/client";
import { Button, Paper, Stack } from "@mui/material";
import {
  Icon24BlockOutline,
  Icon24LockOpenOutline,
  Icon24LockOutline,
  Icon24UnblockOutline,
} from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Report } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setReportsUpdate } from "../../redux/cache/reducer";
import IconWrapper from "../ui/IconWrapper";

const ReportButtons: React.FC<{ report: Report; update: () => void }> = ({
  report,
  update,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [set, { data, error, loading }] = useMutation(gql`
    mutation setReportIsClosed($report: Int!, $isClosed: Boolean!) {
      setReportIsClosed(reportId: $report, isClosed: $isClosed)
    }
  `);
  const [ban, { data: banData, error: banError, loading: banLoading }] =
    useMutation(gql`
      mutation setReportBan($id: Int!, $isBanned: Boolean!) {
        banReport(id: $id, isBanned: $isBanned) {
          userId
        }
      }
    `);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!data && !banData) return;
    update();
    dispatch(setReportsUpdate(true));
  }, [data, banData, update, dispatch]);

  React.useEffect(() => {
    if (!error && !banError) return;
    enqueueSnackbar(error?.message || banError?.message, { variant: "error" });
  }, [error, banError, enqueueSnackbar]);

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <ScrollContainer vertical={false}>
        <Stack spacing={1} direction="row" sx={{ width: "max-content" }}>
          {!report.isClosed && (
            <Button
              color="inherit"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
              disabled={loading}
              onClick={() =>
                set({ variables: { report: report.reportId, isClosed: true } })
              }
              endIcon={
                <IconWrapper size={20}>
                  <Icon24LockOutline />
                </IconWrapper>
              }
            >
              Закрыть
            </Button>
          )}
          {report.isClosed && (
            <Button
              color="inherit"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
              disabled={loading}
              onClick={() =>
                set({ variables: { report: report.reportId, isClosed: false } })
              }
              endIcon={
                <IconWrapper size={20}>
                  <Icon24LockOpenOutline />
                </IconWrapper>
              }
            >
              Открыть
            </Button>
          )}
          {(!report.owner.banreportEndAt ||
            (report.owner.banreportEndAt &&
              new Date(report.owner.banreportEndAt).getTime() <=
                new Date().getTime())) && (
            <Button
              color="error"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
              disabled={banLoading}
              onClick={() =>
                ban({ variables: { id: report.owner.userId, isBanned: true } })
              }
              endIcon={
                <IconWrapper size={20}>
                  <Icon24BlockOutline />
                </IconWrapper>
              }
            >
              Выдать бан репорта
            </Button>
          )}
          {!(
            !report.owner.banreportEndAt ||
            (report.owner.banreportEndAt &&
              new Date(report.owner.banreportEndAt).getTime() <=
                new Date().getTime())
          ) && (
            <Button
              color="error"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
              disabled={banLoading}
              onClick={() =>
                ban({ variables: { id: report.owner.userId, isBanned: false } })
              }
              endIcon={
                <IconWrapper size={20}>
                  <Icon24UnblockOutline />
                </IconWrapper>
              }
            >
              Cнять бан репорта
            </Button>
          )}
        </Stack>
      </ScrollContainer>
    </Paper>
  );
};

export default ReportButtons;
