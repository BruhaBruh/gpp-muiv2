import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Avatar,
  Badge,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Icon28ChevronRightOutline,
  Icon28DeleteOutline,
} from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { ReportChat, ReportType } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { getLastOnline } from "../../redux/userData/types";
import CellR from "../ui/CellR";
import IconWrapper from "../ui/IconWrapper";

const ReportAdminList = () => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const [getReports, { data, loading }] = useLazyQuery<{
    reports: ReportChat[];
  }>(
    gql`
      query reports {
        reports {
          id
          owner {
            id
            avatar
            banner
            nickname
            lastOnline
            user {
              permissions
            }
          }
          type
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );
  const { enqueueSnackbar } = useSnackbar();
  const [removeReport, { data: removeData, error }] = useMutation(gql`
    mutation removeReport($id: ObjectID!) {
      removeReport(id: $id) {
        id
      }
    }
  `);

  React.useEffect(() => {
    if (!profileId) return;
    getReports({ variables: { profile: profileId } });
  }, [getReports, profileId]);

  React.useEffect(() => {
    if (!removeData) return;
    enqueueSnackbar("Удачно", { variant: "success" });
    getReports({ variables: { profile: profileId } });
  }, [removeData, enqueueSnackbar, getReports, profileId]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
      <Stack spacing={2}>
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textTransform: "uppercase",
          }}
        >
          Все репорты
        </Typography>
        {loading && <LinearProgress />}
        {data &&
          (data?.reports.length === 0 ? (
            <Typography variant="body1" textAlign="center">
              Пусто
            </Typography>
          ) : (
            <Stack spacing={1}>
              {data?.reports.map((r) => (
                <Stack
                  spacing={1}
                  direction={"row"}
                  alignItems="center"
                  key={r.id}
                >
                  <CellR
                    to={"/report/" + r.id}
                    sx={{ flex: 1 }}
                    startIcon={
                      <LazyLoadComponent>
                        <Badge
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                          badgeContent={
                            getLastOnline(r.owner.lastOnline) === "Онлайн"
                              ? " "
                              : 0
                          }
                          overlap="circular"
                          color={"success"}
                          sx={{
                            marginRight: (theme) => theme.spacing(2),
                            ".MuiBadge-dot": {
                              border: (theme) =>
                                `2px solid ${theme.palette.background.paper}`,
                              minWidth: "auto",
                              width: "7px",
                              height: "7px",
                              borderRadius: "100px",
                              boxSizing: "content-box",
                            },
                          }}
                        >
                          <Avatar
                            src={r.owner.avatar}
                            sx={{
                              width: 40,
                              height: 40,
                            }}
                          />
                        </Badge>
                      </LazyLoadComponent>
                    }
                    endIcon={
                      <IconWrapper size={34}>
                        <Icon28ChevronRightOutline />
                      </IconWrapper>
                    }
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) =>
                          r.type === ReportType.Bug
                            ? theme.palette.warning.main
                            : r.type === ReportType.Report
                            ? theme.palette.error.main
                            : theme.palette.info.main,
                        alignSelf: "center",
                        marginRight: "4px",
                      }}
                    >
                      {r.type === ReportType.Bug
                        ? "Баг "
                        : r.type === ReportType.Report
                        ? "Жалоба "
                        : "Предложение "}
                    </Typography>
                    <Typography variant="body2">{r.owner.nickname}</Typography>
                  </CellR>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeReport({ variables: { id: r.id } });
                    }}
                    color="error"
                  >
                    <IconWrapper size={24}>
                      <Icon28DeleteOutline />
                    </IconWrapper>
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          ))}
      </Stack>
    </Paper>
  );
};

export default ReportAdminList;
