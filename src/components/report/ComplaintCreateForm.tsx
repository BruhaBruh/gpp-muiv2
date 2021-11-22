import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  ReportSubType,
  ReportType,
  UserRoleEnum,
  UsersConnection,
} from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useDebounce from "../../hooks/useDebounce";
import { setReportsUpdate } from "../../redux/cache/reducer";
import { getLastOnline } from "../../redux/userData/types";

const ComplaintCreateForm: React.FC<{ subtype: ReportSubType }> = ({
  subtype,
}) => {
  const userId = useAppSelector((state) => state.userData.userId);
  const [text, setText] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [create, { data, error, loading }] = useMutation(gql`
    mutation createReport(
      $type: ReportType!
      $subtype: ReportSubType!
      $message: String!
      $reportTo: Int
    ) {
      createReport(
        input: {
          type: $type
          subtype: $subtype
          message: $message
          reportTo: $reportTo
        }
      ) {
        reportId
      }
    }
  `);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 750);
  const [profile, setProfile] = React.useState(-1);
  const [getUsers, { data: usersData, loading: usersLoading }] = useLazyQuery<{
    users: UsersConnection;
  }>(
    gql`
      query users($search: String, $where: UserFilterInput) {
        users(
          search: $search
          first: 10
          where: $where
          order: { userId: ASC }
        ) {
          nodes {
            userId
            discordId
            avatar
            nickname
            lastOnline
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    {
      fetchPolicy: "no-cache",
    }
  );

  React.useEffect(() => {
    if (!userId) return;
    if (subtype === ReportSubType.Admin) {
      getUsers({
        variables: {
          search: debouncedSearch,
          where: {
            userRole: { neq: UserRoleEnum.None },
            userId: { neq: userId },
          },
        },
      });
    } else if (subtype === ReportSubType.User) {
      getUsers({
        variables: {
          search: debouncedSearch,
          where: {
            userRole: { eq: UserRoleEnum.None },
            userId: { neq: userId },
          },
        },
      });
    }
  }, [subtype, getUsers, userId, debouncedSearch]);
  const history = useHistory();

  React.useEffect(() => {
    if (!data) return;
    setText("");
    dispatch(setReportsUpdate(true));
    history.push("/r");
  }, [data, setText, dispatch, history]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  React.useEffect(() => console.log(profile), [profile]);

  return (
    <>
      <Autocomplete
        id="profile"
        fullWidth
        options={
          usersData && usersData.users.nodes
            ? usersData.users.nodes?.map((u) => ({
                value: u.userId,
                label: u.nickname,
                avatar: u.avatar,
                lastOnline: u.lastOnline,
                permissions: u.permissions,
              }))
            : []
        }
        clearText="Очистить"
        openText="Открыть"
        closeText="Закрыть"
        loading={usersLoading}
        loadingText="Загрузка..."
        noOptionsText="Не найдено"
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e, value) => {
          if (value) setProfile(value.value);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props} sx={{ width: "100%" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                flex: 1,
              }}
            >
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
                badgeContent={
                  getLastOnline(option.lastOnline) === "Онлайн" ? " " : 0
                }
                overlap="circular"
                color={"success"}
              >
                <Avatar
                  src={option.avatar}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                  children={option.label.substr(0, 2)}
                />
              </Badge>
              <Typography
                variant="body1"
                sx={{
                  flex: 1,
                  width: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {option.label}
              </Typography>
            </Stack>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
      {profile !== -1 && (
        <>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Напишите что произошло и предъявите доказательства
          </Typography>
          <TextField
            margin="none"
            size="small"
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            maxRows={5}
            multiline
          />
          <Button
            size="medium"
            disabled={loading || text.length < 1 || text.length > 1000}
            onClick={() =>
              create({
                variables: {
                  type: ReportType.Report,
                  subtype: subtype,
                  message: text,
                  reportTo: profile,
                },
              })
            }
          >
            Отправить
          </Button>
        </>
      )}
    </>
  );
};

export default ComplaintCreateForm;
