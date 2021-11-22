import { gql, useLazyQuery } from "@apollo/client";
import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import UserCell from "../../components/users/UserCell";
import { User, UserFilterInput, UsersConnection } from "../../graphql/types";
import { useAppSelector } from "../../hooks/redux";
import useDebounce from "../../hooks/useDebounce";

const UsersPage = () => {
  const [afsFilter, setAFSFilter] = React.useState<0 | 1 | 2>(0);
  const [after, setAfter] = React.useState<string | null>();
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 750);
  const [where, setWhere] = React.useState<UserFilterInput | null>();
  const userId = useAppSelector((state) => state.userData.userId);

  const lowerSM = useMediaQuery("(max-width: 600px)");

  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const [users, setUsers] = React.useState<User[]>([]);

  const [getUsers, { data: usersData, loading: usersLoading }] = useLazyQuery<{
    users: UsersConnection;
  }>(
    gql`
      query users($search: String, $after: String, $where: UserFilterInput) {
        users(
          search: $search
          first: 50
          after: $after
          where: $where
          order: { userId: ASC }
        ) {
          nodes {
            userId
            discordId
            nickname
            userRole
            avatar
            banner
            lastOnline
            role
            discordRoles {
              id
              position
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    switch (afsFilter) {
      case 0:
        return setWhere(null);
      case 1:
        return setWhere({
          friendUsers: { some: { friendId: { eq: userId } } },
        });
      case 2:
        return setWhere({
          subscriberSubscriberNavigations: { some: { userId: { eq: userId } } },
        });
    }
  }, [afsFilter, userId]);

  React.useEffect(() => {
    setUsers([]);
    getUsers({ variables: { after: null, where, search: debouncedSearch } });
    // eslint-disable-next-line
  }, [where, getUsers, debouncedSearch]);

  React.useEffect(() => {
    if (!usersData?.users.nodes) return;
    setAfter(usersData.users.pageInfo.endCursor);
    setUsers([
      ...users.filter(
        (u) => !usersData.users.nodes?.map((n) => n.userId).includes(u.userId)
      ),
      ...usersData.users.nodes,
    ]);
    // eslint-disable-next-line
  }, [usersData, setUsers]);

  React.useEffect(() => {
    if (
      usersLoading ||
      usersData?.users.nodes?.length === 0 ||
      lastElementRef.current === null
    )
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getUsers({ variables: { after, where, search: debouncedSearch } });
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, getUsers, usersData, after, where, debouncedSearch]);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Paper
        sx={{ padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}` }}
      >
        <Stack
          direction={lowerSM ? "column" : "row"}
          spacing={2}
          justifyContent="space-between"
          alignItems={lowerSM ? "stretch" : "center"}
        >
          <Stack direction="row" spacing={2}>
            <Box
              onClick={() => setAFSFilter(0)}
              sx={{
                color: (theme) =>
                  afsFilter === 0
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Все
            </Box>
            <Box
              onClick={() => setAFSFilter(1)}
              sx={{
                color: (theme) =>
                  afsFilter === 1
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Друзья
            </Box>
            <Box
              onClick={() => setAFSFilter(2)}
              sx={{
                color: (theme) =>
                  afsFilter === 2
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Подписчики
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              size="small"
              placeholder="Поиск"
              margin="none"
              fullWidth={lowerSM}
            />
          </Stack>
        </Stack>
      </Paper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
          gap: (theme) => theme.spacing(1),
        }}
      >
        {users.map((u) => (
          <UserCell key={u.userId} user={u} />
        ))}
      </Box>
      {usersLoading && <LinearProgress />}
      {!usersLoading && usersData?.users.pageInfo.hasNextPage && (
        <div ref={lastElementRef}></div>
      )}
    </Stack>
  );
};

export default UsersPage;
