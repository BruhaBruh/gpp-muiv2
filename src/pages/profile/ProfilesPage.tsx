import { gql, useLazyQuery } from "@apollo/client";
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import ProfileCell from "../../components/profile/ProfileCell";
import { Profile, ProfileSearchResult, Server } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { getLastOnline } from "../../redux/userData/types";

const ProfilesPage = () => {
  const [roles, setRoles] = React.useState<
    {
      value: string;
      label: string;
      color?: string;
    }[]
  >([{ value: "", label: "Все" }]);
  const serverId = useAppSelector((state) => state.userData.serverId);
  const blacklist = useAppSelector((state) => state.userData.blacklist);
  const [page, setPage] = React.useState(1);
  const hideUsers = useAppSelector(
    (state) => state.settings.hideBlacklistedProfiles
  );
  const [getRoles, { data: rolesData }] = useLazyQuery<{
    server: Server;
  }>(gql`
    query server($id: ObjectID!) {
      server(id: $id) {
        roles {
          id
          name
          color
        }
      }
    }
  `);
  const [getProfiles, { data: profilesData, loading: profilesLoading }] =
    useLazyQuery<{
      profiles: ProfileSearchResult;
    }>(
      gql`
        query profiles(
          $server: ObjectID!
          $role: ID
          $search: String
          $limit: Int
          $page: Int
        ) {
          profiles(
            limit: $limit
            page: $page
            server: $server
            role: $role
            search: $search
          ) {
            result {
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
            hasMore
          }
        }
      `,
      {
        fetchPolicy: "no-cache",
        variables: { server: serverId, limit: 25, page: 1 },
      }
    );
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [filterIsOnline, setFilterIsOnline] = React.useState(false);
  const timer = React.useRef<any>();
  const form = useFormik({
    initialValues: {
      role: "",
      search: "",
    },
    onSubmit: (values) => {
      setProfiles([]);
      getProfiles({
        variables: {
          search: form.values.search,
          role: form.values.role,
        },
      });
      setPage(2);
    },
  });
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const lowerLG = useMediaQuery("(max-width: 1200px)");
  const lowerSM = useMediaQuery("(max-width: 600px)");

  React.useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  React.useEffect(() => {
    if (!serverId) return;
    getRoles({ variables: { id: serverId } });
  }, [getRoles, serverId]);

  React.useEffect(() => {
    if (!rolesData) return;
    setRoles((prev) => [
      ...prev,
      ...rolesData.server.roles.map((role) => ({
        value: role.id,
        label: role.name,
        color: role.color,
      })),
    ]);
  }, [rolesData]);

  React.useEffect(() => {
    if (!serverId) return;
    setProfiles([]);
    getProfiles({
      variables: {
        search: form.values.search,
        role: form.values.role,
      },
    });
    setPage(2);
    // eslint-disable-next-line
  }, [form.values.role, serverId, getProfiles, setProfiles, setPage]);

  React.useEffect(() => {
    if (!profilesData) return;
    setProfiles((prev) => [
      ...prev,
      ...profilesData.profiles.result.filter(
        (p) => !prev.map((t) => t.id).includes(p.id)
      ),
    ]);
  }, [profilesData]);

  React.useEffect(() => {
    if (
      profilesLoading ||
      profiles.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getProfiles({
          variables: {
            id: serverId,
            search: form.values.search,
            role: form.values.role,
            page: page,
          },
        });
        setPage((prev) => prev + 1);
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, getProfiles, profilesLoading, profiles, serverId, page]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: lowerLG
            ? lowerSM
              ? "1fr"
              : "1fr 1fr 1fr"
            : "2fr 2fr 1fr",
          gap: (theme) => theme.spacing(2),
        }}
      >
        <TextField
          fullWidth
          error={!!form.errors.search}
          color={form.errors.search === "error" ? "error" : undefined}
          id="search"
          helperText={form.errors.search ? form.errors.search : undefined}
          variant="outlined"
          name="search"
          value={form.values.search}
          onChange={(e) => {
            form.handleChange(e);
            if (!!timer.current) clearTimeout(timer.current);
            setTimeout(() => {
              form.submitForm();
            }, 500);
          }}
          size="small"
          placeholder="Поиск"
          sx={{ margin: 0 }}
        />
        <Select
          id="role"
          value={form.values.role}
          name="role"
          onChange={form.handleChange}
          fullWidth
          size="small"
          placeholder="Роль"
          displayEmpty
        >
          {roles.map((role) => (
            <MenuItem
              key={role.value}
              value={role.value}
              sx={{
                color: (theme) =>
                  role.color ? role.color : theme.palette.text.primary,
              }}
            >
              {role.label}
            </MenuItem>
          ))}
        </Select>
        <Button
          onClick={() => setFilterIsOnline((prev) => !prev)}
          size="medium"
          variant={filterIsOnline ? "contained" : "outlined"}
        >
          Онлайн на сайте
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))",
          gap: (theme) => theme.spacing(2),
        }}
      >
        {profiles &&
          profiles
            .filter((p) => {
              if (filterIsOnline) {
                return (
                  getLastOnline(p.lastOnline) === "Онлайн" &&
                  (!blacklist.includes(p.id) || !hideUsers)
                );
              } else {
                return !blacklist.includes(p.id) || !hideUsers;
              }
            })
            .map((profile) => {
              return <ProfileCell key={profile.id} profile={profile} />;
            })}
        {profilesLoading && <LinearProgress style={{ gridColumn: "1/-1" }} />}
        {!profilesLoading && profilesData?.profiles.hasMore && (
          <div ref={lastElementRef}></div>
        )}
      </Box>
    </Stack>
  );
};

export default ProfilesPage;
