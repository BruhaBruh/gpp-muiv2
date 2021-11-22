import { gql, useMutation } from "@apollo/client";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  Icon24MemoryCard,
  Icon24TextTtOutline,
  Icon24UserSquareOutline,
  Icon28ArticleOutline,
  Icon28PhoneOutline,
  Icon28RefreshOutline,
  Icon28UserOutline,
  Icon56GalleryOutline,
} from "@vkontakte/icons";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { User } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setUserUpdate } from "../../redux/cache/reducer";
import IconWrapper from "../ui/IconWrapper";
import { UserTabs } from "./UserBody";

const formValidatiionSchema = Yup.object().shape({
  sex: Yup.number().min(0, "Ошибка").max(2, "Ошибка").required("Обязательно"),
  status: Yup.string().max(128, "Максимум 128 символа"),
  description: Yup.string().max(6000, "Максимум 6000 символов"),
  avatar: Yup.string()
    .matches(
      /^((https:\/\/(i\.postimg\.cc|i\.imgur\.com|c\.tenor\.com)\/.*(\.jpeg|\.jpg|\.gif|\.png|\.webp))|(https:\/\/cdn\.discordapp\.com\/avatars\/.*)|)$/i,
      "Ссылка должна быть прямой на медиафайл сервисов postimg/imgur/tenor. Поддерживаются jpeg/jpg/png/gif/webp"
    )
    .max(128, "Максимальная длина 128 символов"),
  banner: Yup.string()
    .matches(
      /^((https:\/\/(i\.postimg\.cc|i\.imgur\.com|c\.tenor\.com)\/.*(\.jpeg|\.jpg|\.gif|\.png|\.webp))|(https:\/\/cdn\.discordapp\.com\/avatars\/.*)|)$/i,
      "Ссылка должна быть прямой на медиафайл сервисов postimg/imgur/tenor. Поддерживаются jpeg/jpg/png/gif/webp"
    )
    .max(128, "Максимальная длина 128 символов"),
  showPhone: Yup.bool(),
});

const UserSettings: React.FC<{
  user: User;
  setTab: React.Dispatch<React.SetStateAction<UserTabs>>;
}> = ({ user, setTab }) => {
  const form = useFormik({
    initialValues: {
      sex: user.sex,
      status: user.status,
      description: user.description,
      avatar: user.avatar.includes("cdn.discordapp.com") ? "" : user.avatar,
      banner: user.banner,
      showPhone: user.isShowPhone,
    },
    validateOnMount: true,
    validationSchema: formValidatiionSchema,
    onSubmit: (values) => {
      if (!form.isValid) return;
      save({
        variables: {
          id: user.userId,
          avatar: values.avatar,
          banner: values.banner,
          description: values.description,
          status: values.status,
          sex: values.sex,
          isShowPhone: values.showPhone,
        },
      });
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [save, { data, error, loading }] = useMutation(gql`
    mutation editUser(
      $id: Int!
      $avatar: MediaLink
      $banner: MediaLink
      $description: String
      $status: String
      $sex: Int
      $isShowPhone: Boolean
    ) {
      editUser(
        id: $id
        input: {
          avatar: $avatar
          banner: $banner
          description: $description
          status: $status
          sex: $sex
          isShowPhone: $isShowPhone
        }
      ) {
        userId
      }
    }
  `);
  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    dispatch(setUserUpdate(true));
    setTab(UserTabs.Info);
    // TODO: fix bug with lag on save
  }, [data, enqueueSnackbar, dispatch, setTab]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
      <Stack spacing={1}>
        <Stack>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Аватар
          </Typography>
          <Stack spacing={1} direction="row">
            <TextField
              margin="none"
              size="small"
              fullWidth
              error={!!form.errors.avatar}
              color={form.errors.avatar === "error" ? "error" : undefined}
              id="avatar"
              helperText={form.errors.avatar ? form.errors.avatar : undefined}
              variant="outlined"
              name="avatar"
              value={form.values.avatar}
              onChange={form.handleChange}
            />
            <IconWrapper
              size={32}
              alignSelf="center"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              <Icon24UserSquareOutline />
            </IconWrapper>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Баннер
          </Typography>
          <Stack spacing={1} direction="row">
            <TextField
              margin="none"
              size="small"
              fullWidth
              error={!!form.errors.banner}
              color={form.errors.banner === "error" ? "error" : undefined}
              id="banner"
              helperText={form.errors.banner ? form.errors.banner : undefined}
              variant="outlined"
              name="banner"
              value={form.values.banner}
              onChange={form.handleChange}
            />
            <IconWrapper
              size={32}
              alignSelf="center"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              <Icon56GalleryOutline />
            </IconWrapper>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Статус
          </Typography>
          <Stack spacing={1} direction="row">
            <TextField
              margin="none"
              size="small"
              fullWidth
              error={!!form.errors.status}
              color={form.errors.status === "error" ? "error" : undefined}
              id="status"
              helperText={form.errors.status ? form.errors.status : undefined}
              variant="outlined"
              name="status"
              value={form.values.status}
              onChange={form.handleChange}
            />
            <IconWrapper
              size={32}
              alignSelf="center"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              <Icon24TextTtOutline />
            </IconWrapper>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Пол
          </Typography>
          <Stack spacing={1} direction="row">
            <Select
              id="sex"
              name="sex"
              fullWidth
              value={form.values.sex}
              onChange={form.handleChange}
              size="small"
            >
              <MenuItem value={0}>Не указан</MenuItem>
              <MenuItem value={1}>Мужчина</MenuItem>
              <MenuItem value={2}>Женщина</MenuItem>
            </Select>
            <IconWrapper
              size={32}
              alignSelf="center"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              <Icon28UserOutline />
            </IconWrapper>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Показывать номер телефона?
          </Typography>
          <Stack spacing={1} direction="row">
            <ToggleButtonGroup
              value={form.values.showPhone}
              exclusive
              sx={{ width: "100%" }}
              onChange={(_, v) =>
                form.setFieldValue(
                  "showPhone",
                  v !== null ? v : form.values.showPhone
                )
              }
            >
              <ToggleButton size="small" value={true} sx={{ width: "100%" }}>
                Да
              </ToggleButton>
              <ToggleButton size="small" value={false} sx={{ width: "100%" }}>
                Нет
              </ToggleButton>
            </ToggleButtonGroup>
            <IconWrapper
              size={32}
              alignSelf="center"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              <Icon28PhoneOutline />
            </IconWrapper>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Описание
          </Typography>
          <Stack spacing={1} direction="row">
            <TextField
              margin="none"
              size="small"
              fullWidth
              error={!!form.errors.description}
              color={form.errors.description === "error" ? "error" : undefined}
              id="description"
              helperText={
                form.errors.description ? form.errors.description : undefined
              }
              variant="outlined"
              name="description"
              value={form.values.description}
              multiline
              maxRows={5}
              onChange={form.handleChange}
            />
            <IconWrapper
              size={32}
              alignSelf="center"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              <Icon28ArticleOutline />
            </IconWrapper>
          </Stack>
        </Stack>
        <Stack spacing={1} direction={"row"}>
          <Button
            fullWidth
            size="medium"
            onClick={() => form.submitForm()}
            disabled={!form.isValid || loading}
            endIcon={
              <IconWrapper size={20} sx={{ marginLeft: "4px" }}>
                <Icon24MemoryCard />
              </IconWrapper>
            }
          >
            Сохранить
          </Button>
          <Button
            fullWidth
            size="medium"
            onClick={() => form.resetForm()}
            endIcon={
              <IconWrapper size={20} sx={{ marginLeft: "4px" }}>
                <Icon28RefreshOutline />
              </IconWrapper>
            }
          >
            Сбросить
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserSettings;
