import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon24Back, Icon28DeleteOutline } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import ProfileCell from "../../components/profile/ProfileCell";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";
import { Profile } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSidebarHeader } from "../../redux/ui/reducer";
import { setBlacklist } from "../../redux/userData/reducer";

const BlacklistPage = () => {
  const dispatch = useAppDispatch();
  const profileId = useAppSelector((state) => state.userData.profileId);
  const [getBlacklist, { data, loading }] = useLazyQuery<{ profile: Profile }>(
    gql`
      query blacklist($profile: ObjectID!) {
        profile(id: $profile) {
          blacklist {
            id
            avatar
            banner
            nickname
            lastOnline
            role
            roles {
              id
              name
              color
              position
            }
            user {
              permissions
            }
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  const { enqueueSnackbar } = useSnackbar();
  const [removed, setRemoved] = React.useState<string[]>([]);

  const [
    removeFromBlacklist,
    {
      data: removeBlacklistSuccess,
      loading: removeBlacklistLoading,
      error: removeBlacklistError,
    },
  ] = useMutation(gql`
    mutation removeFromBlacklist($id: ObjectID!) {
      removeFromBlacklist(id: $id) {
        id
      }
    }
  `);
  const blacklist = useAppSelector((state) => state.userData.blacklist);

  React.useEffect(() => {
    if (!removeBlacklistSuccess) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    // eslint-disable-next-line
  }, [removeBlacklistSuccess, enqueueSnackbar, setRemoved]);

  React.useEffect(() => {
    if (!removeBlacklistError) return;
    enqueueSnackbar(removeBlacklistError?.message, { variant: "error" });
  }, [enqueueSnackbar, removeBlacklistError]);

  React.useEffect(() => {
    if (!profileId) return;
    getBlacklist({ variables: { profile: profileId } });
  }, [profileId, getBlacklist]);

  React.useEffect(() => {
    dispatch(setBlacklist(blacklist.filter((b) => !removed.includes(b))));
  }, [removed, dispatch, blacklist]);

  React.useEffect(() => {
    dispatch(
      setSidebarHeader(
        <CellR
          to="/settings"
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
  }, [dispatch]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textTransform: "uppercase",
            }}
          >
            Чёрный список
          </Typography>
          <Stack spacing={1}>
            {data?.profile.blacklist.filter((p) => !removed.includes(p.id))
              .length === 0 && (
              <Typography variant="body1" textAlign="center">
                Пусто
              </Typography>
            )}
            {data?.profile.blacklist
              .filter((p) => !removed.includes(p.id))
              .map((profile) => {
                return (
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center" }}
                    key={profile.id}
                  >
                    <ProfileCell minWidth profile={profile} />
                    <IconButton
                      onClick={() => {
                        removeFromBlacklist({ variables: { id: profile.id } });
                        setRemoved((prev) => [...prev, profile.id]);
                      }}
                      color="error"
                      disabled={removeBlacklistLoading}
                    >
                      <IconWrapper size={28}>
                        <Icon28DeleteOutline />
                      </IconWrapper>
                    </IconButton>
                  </Stack>
                );
              })}
            {loading && <LinearProgress />}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default BlacklistPage;
