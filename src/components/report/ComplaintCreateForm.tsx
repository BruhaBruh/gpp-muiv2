import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon24ChevronDown } from "@vkontakte/icons";
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
import IconWrapper from "../ui/IconWrapper";

const ComplaintCreateForm: React.FC<{ subtype: ReportSubType }> = ({
  subtype,
}) => {
  const userId = useAppSelector((state) => state.userData.userId);
  const initialForm = `* Ваш Mojang ник: \n* Дата нарушения ДД.ММ.ГГГГ по МСК: \n* Скриншоты или видеозапись с нарушением: \n* Готов нести ответственность в случае обмана[Да/Нет]: \nПричина жалобы: \nДругая информация: `;
  const initialFormAdmin = `* Ваш Mojang ник: \n* Дата вашего азкабана/бана ДД.ММ.ГГГГ по МСК: \n* Скриншоты или видеозапись с нарушением: \n* Какую ошибку совершил Модератор или Хелпер в своих действиях: \n* Готов нести ответственность в случае обмана[Да/Нет]: \nДругая информация: `;
  const [text, setText] = React.useState(
    subtype === ReportSubType.User ? initialForm : initialFormAdmin
  );
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
  const [openInfo, setOpenInfo] = React.useState(false);

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

  return (
    <>
      <div>
        <Accordion
          expanded={openInfo}
          onChange={() => setOpenInfo((prev) => !prev)}
          elevation={1}
        >
          <AccordionSummary
            expandIcon={
              <IconWrapper>
                <Icon24ChevronDown />
              </IconWrapper>
            }
            aria-controls="infopanel"
            id="infopanel-header"
          >
            <Typography>Правила подачи жалобы</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {subtype === ReportSubType.User && (
              <Stack spacing={0.25}>
                <Typography variant="subtitle1">
                  При подаче жалобы, вы соглашаетесь с правилами.
                </Typography>
                <Typography variant="subtitle1">
                  При неуважительном отношении к персоналу - жалоба не будет
                  рассмотрена.
                </Typography>
                <Typography variant="subtitle1">
                  При неправильном заполнение формы жалобы, она будет закрыта
                  без рассмотрения.
                </Typography>
                <Typography variant="subtitle1">
                  Принимаются только прямые доказательства. Без прямых
                  доказательств, жалоба будет закрыта без рассмотрения.
                </Typography>
                <Typography variant="subtitle1">
                  В случае намеренного спама одной и той же заявки жалобами, вы
                  будете замучены или забанены на сайте.
                </Typography>
                <Typography variant="subtitle1">
                  Скриншот или видеозапись должны быть не обрезаны и полными.
                  Если доказательства будут обрезанными или отредактированы, то
                  жалоба будет отклонена.
                </Typography>
                <Typography variant="subtitle1">
                  Источник получения прямых доказательств в качестве отпечатков
                  пальцев происходит через детектива, только после данного
                  действия разрешено подавать жалобу по определенным правилам.
                  Возможны исключения.
                </Typography>
                <Typography variant="subtitle1">
                  Логи не будут проверяться, даже если по вашему мнению игрок
                  нарушил больше, но у вас нет на это доказательств.
                </Typography>
              </Stack>
            )}
            {subtype === ReportSubType.Admin && (
              <Stack spacing={0.25}>
                <Typography variant="subtitle1">
                  При подаче жалобы, вы соглашаетесь с правилами.
                </Typography>
                <Typography variant="subtitle1">
                  При неуважительном отношении к персоналу - жалоба не будет
                  рассмотрена.
                </Typography>
                <Typography variant="subtitle1">
                  При неправильном заполнение формы жалобы, она будет закрыта
                  без рассмотрения.
                </Typography>
                <Typography variant="subtitle1">
                  Принимаются только прямые доказательства. Без прямых
                  доказательств, жалоба будет закрыта без рассмотрения.
                </Typography>
                <Typography variant="subtitle1">
                  В случае намеренного спама одной и той же заявки жалобами, вы
                  будете замучены или забанены на сайте.
                </Typography>
                <Typography variant="subtitle1">
                  Скриншот или видеозапись должны быть не обрезаны и полными.
                  Если доказательства будут обрезанными или отредактированы, то
                  жалоба будет отклонена.
                </Typography>
                <Typography variant="subtitle1">
                  Раздел служит только для жалоб на Модератора или Хелпера.
                  Относится к неверной выдачи наказания, нарушения правил для
                  Модератора или Хелпера. Если правила были нарушены по другим
                  остальным пунктам правила сервера, то отправлять жалобу
                  требуется в раздел жалоб на игроков.
                </Typography>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
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
            Заполните по форме
          </Typography>
          <TextField
            margin="none"
            size="small"
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            helperText={"* - обязательно"}
            maxRows={6}
            multiline
          />
          <Button
            size="medium"
            disabled={
              loading ||
              text === initialForm ||
              text.trim().length < 1 ||
              text.trim().length > 1000
            }
            onClick={() =>
              create({
                variables: {
                  type: ReportType.Report,
                  subtype: subtype,
                  message: text.trim(),
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
