import { Stack } from "@mui/material";
import React from "react";
import ReportAdminList from "../../components/report/ReportAdminList";
import ReportForm from "../../components/report/ReportForm";
import ReportList from "../../components/report/ReportList";
import { Permissions } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { checkPermissions } from "../../redux/userData/types";

const ReportsPage = () => {
  const permissions = useAppSelector((state) => state.userData.permissions);
  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <ReportForm />
      {checkPermissions(Permissions.UserReport, permissions) ? (
        <ReportAdminList />
      ) : (
        <ReportList />
      )}
    </Stack>
  );
};

export default ReportsPage;
