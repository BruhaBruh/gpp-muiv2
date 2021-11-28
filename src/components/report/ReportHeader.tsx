import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Report, ReportSubType, ReportType } from "../../graphql/types";

const ReportHeader: React.FC<{ report: Report }> = ({ report }) => {
  const getReportType = (): any => {
    switch (report.type) {
      case ReportType.Report:
        return (
          <span>
            <Box
              component="span"
              sx={{ color: (theme) => theme.palette.error.main }}
            >
              Жалоба
            </Box>{" "}
            от {report.owner.nickname} на
          </span>
        );
      case ReportType.Bug:
        return (
          <Box
            component="span"
            sx={{ color: (theme) => theme.palette.warning.main }}
          >
            Баг
          </Box>
        );
      case ReportType.Feature:
        return (
          <span>
            <Box
              component="span"
              sx={{ color: (theme) => theme.palette.info.main }}
            >
              Предложение
            </Box>{" "}
            для
          </span>
        );
      default:
        return "";
    }
  };

  const getReportSubType = (): string => {
    switch (report.subtype) {
      case ReportSubType.Admin:
        return `${report.to?.nickname} (Персонал)`;
      case ReportSubType.User:
        return `${report.to?.nickname} (Игрок)`;
      case ReportSubType.Server:
        return "Сервера";
      case ReportSubType.Site:
        return "Сайта";
      default:
        return "";
    }
  };

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Stack spacing={1} direction="row">
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textTransform: "none",
            flex: 1,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          [{report.reportId}] {getReportType()} {getReportSubType()}{" "}
        </Typography>
        {report.isClosed && (
          <Typography
            variant="subtitle2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "none",
              alignSelf: "center",
              color: (theme) => theme.palette.warning.main,
            }}
          >
            Закрыт
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default ReportHeader;
