import { Paper, Stack, Typography } from "@mui/material";
import { Icon24Back } from "@vkontakte/icons";
import React from "react";
import BugCreateForm from "../../components/report/BugCreateForm";
import ComplaintCreateForm from "../../components/report/ComplaintCreateForm";
import FeatureCreateForm from "../../components/report/FeatureCreateForm";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";
import { ReportSubType, ReportType } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setSidebarHeader } from "../../redux/ui/reducer";

const CreateReportPage: React.FC<{ type: ReportType; subtype: ReportSubType }> =
  ({ type, subtype }) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
      if (!type) return;
      dispatch(
        setSidebarHeader(
          <CellR
            to={`/r/${
              type === ReportType.Bug
                ? "b"
                : type === ReportType.Feature
                ? "f"
                : "c"
            }`}
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
    }, [dispatch, type]);

    return (
      <Stack
        spacing={2}
        sx={{
          margin: "auto",
          width: "100%",
          maxWidth: (theme) => theme.breakpoints.values.lg,
        }}
      >
        <Paper
          sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}
        >
          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              {type === ReportType.Report && "Выберите профиль"}
              {type === ReportType.Bug && "Напишите что произошло"}
              {type === ReportType.Feature && "Напишите что вы бы добавили"}
            </Typography>
            {type === ReportType.Bug && <BugCreateForm subtype={subtype} />}
            {type === ReportType.Feature && (
              <FeatureCreateForm subtype={subtype} />
            )}
            {type === ReportType.Report && (
              <ComplaintCreateForm subtype={subtype} />
            )}
          </Stack>
        </Paper>
      </Stack>
    );
  };

export default CreateReportPage;
