import {
  Avatar,
  Box,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Report, ReportSubType, ReportType } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import CellR from "../ui/CellR";

const ReportCell: React.FC<{ report: Report }> = ({ report }) => {
  const userId = useAppSelector((state) => state.userData.userId);
  const lowerSM = useMediaQuery("(max-width: 600px)");

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
        return `${report.to?.nickname}`;
      case ReportSubType.User:
        return `${report.to?.nickname}`;
      case ReportSubType.Server:
        return "Сервера";
      case ReportSubType.Site:
        return "Сайта";
      default:
        return "";
    }
  };

  return (
    <CellR
      size="large"
      to={"/r/" + report.reportId}
      startIcon={
        !lowerSM ? (
          <Avatar
            src={report.owner.avatar}
            children={report.owner.nickname.substr(0, 1)}
            sx={{ width: 48, height: 48 }}
          />
        ) : undefined
      }
    >
      <ListItemText
        sx={{
          margin: 0,
          alignSelf: "center",
          width: "1px",
        }}
        primary={
          <Stack spacing={1} direction="row">
            <Typography
              variant="body2"
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
        }
        secondary={
          <Stack spacing={1} direction="row">
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                alignSelf: "center",
                flex: 1,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {userId === report.lastMessage?.owner.userId
                ? "Вы"
                : `От ${report.lastMessage?.owner.nickname}`}
              : {report.lastMessage?.message}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "none",
                alignSelf: "center",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              {dayjs(report.lastMessage?.createdAt).format("HH:mm")}
            </Typography>
          </Stack>
        }
      />
    </CellR>
  );
};

export default ReportCell;
