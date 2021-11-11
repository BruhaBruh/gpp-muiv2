import { gql, useLazyQuery } from "@apollo/client";
import {
  Avatar,
  Badge,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon28ChevronRightOutline } from "@vkontakte/icons";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { ReportChat, ReportType } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { getLastOnline } from "../../redux/userData/types";
import CellR from "../ui/CellR";
import IconWrapper from "../ui/IconWrapper";

const ReportList = () => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const [getMyReports, { data, loading }] = useLazyQuery<{
    myReports: ReportChat[];
  }>(
    gql`
      query myReports($profile: ObjectID!) {
        myReports(profile: $profile) {
          id
          owner {
            id
            avatar
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
    { fetchPolicy: "no-cache", pollInterval: 15000 }
  );

  React.useEffect(() => {
    if (!profileId) return;
    getMyReports({ variables: { profile: profileId } });
  }, [getMyReports, profileId]);

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
          Ваши репорты
        </Typography>
        {loading && <LinearProgress />}
        {data &&
          (data?.myReports.length === 0 ? (
            <Typography variant="body1" textAlign="center">
              Пусто
            </Typography>
          ) : (
            <Stack spacing={1}>
              {data?.myReports.map((r) => (
                <CellR
                  to={"/report/" + r.id}
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
                    <IconWrapper size={32}>
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
              ))}
            </Stack>
          ))}
      </Stack>
    </Paper>
  );
};

export default ReportList;
