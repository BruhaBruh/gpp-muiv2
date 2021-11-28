import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import BugCreateForm from "../../components/report/BugCreateForm";
import ComplaintCreateForm from "../../components/report/ComplaintCreateForm";
import FeatureCreateForm from "../../components/report/FeatureCreateForm";
import { ReportSubType, ReportType } from "../../graphql/types";

const CreateReportPage: React.FC<{ type: ReportType; subtype: ReportSubType }> =
  ({ type, subtype }) => {
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
