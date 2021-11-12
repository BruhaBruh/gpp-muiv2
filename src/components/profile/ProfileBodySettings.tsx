import { gql, useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import * as Yup from "yup";
import { Permissions, Sex } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import { checkPermissions } from "../../redux/userData/types";
import Cell from "../ui/Cell";

interface props {
  updateProfile: () => void;
}

interface values {
  sex?: Sex;
  status?: string;
  description?: string;
  avatar?: string;
  banner?: string;
  showPhone?: boolean;
}

const formValidatiionSchema = Yup.object().shape({
  sex: Yup.string()
    .matches(new RegExp("(UNDEFINED|MALE|FEMALE)"), "Неверный формат")
    .required("Обязательно"),
  status: Yup.string().max(64, "Максимум 64 символа"),
  description: Yup.string().max(6000, "Максимум 6000 символов"),
  avatar: Yup.string()
    .matches(
      /https:\/\/i\.(postimg\.cc|imgur.com)\/.*(\.jpg|\.png|\.jpeg)/i,
      "Ссылка должна быть прямой с ресурса imgur или postimg"
    )
    .max(100, "Максимальная длина 100 символов"),
  banner: Yup.string()
    .matches(
      /https:\/\/i\.(postimg\.cc|imgur.com)\/.*(\.jpg|\.png|\.jpeg)/i,
      "Ссылка должна быть прямой с ресурса imgur или postimg"
    )
    .max(100, "Максимальная длина 100 символов"),
  showPhone: Yup.bool(),
});

const ProfileBodySettings: React.FC<props> = ({ updateProfile }) => {
  const { enqueueSnackbar } = useSnackbar();
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );
  const form = useFormik({
    initialValues: {
      sex: currentProfile?.sex,
      status: currentProfile?.status,
      description: currentProfile?.description,
      avatar: currentProfile?.avatar.includes("cdn.discordapp.com")
        ? ""
        : currentProfile?.avatar,
      banner: currentProfile?.banner,
      showPhone: currentProfile?.showPhone,
    },
    validationSchema: formValidatiionSchema,
    onSubmit: (values: values) =>
      editProfile({
        variables: {
          id: currentProfile?.id,
          sex: values.sex,
          status: values.status,
          description: values.description,
          avatar: values.avatar,
          banner:
            values.banner && values.banner.length !== 0 ? values.banner : null,
          showPhone: values.showPhone,
        },
      }),
  });

  const [
    editProfile,
    { loading: editProfileLoading, data: isSuccess, error: isError },
  ] = useMutation(gql`
    mutation editProfile(
      $id: ObjectID!
      $sex: Sex
      $status: String
      $description: String
      $avatar: MediaLink
      $banner: MediaLink
      $showPhone: Boolean
    ) {
      editProfile(
        id: $id
        input: {
          description: $description
          sex: $sex
          status: $status
          avatar: $avatar
          banner: $banner
          showPhone: $showPhone
        }
      ) {
        id
      }
    }
  `);

  React.useEffect(() => {
    if (!isSuccess) return;
    updateProfile();
    // eslint-disable-next-line
  }, [isSuccess]);

  React.useEffect(() => {
    if (!isError) return;
    enqueueSnackbar(isError.message, { variant: "error" });
  }, [isError, enqueueSnackbar]);

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="body1">Показывать номер телефона?</Typography>
        <ToggleButtonGroup
          color="primary"
          value={form.values.showPhone}
          exclusive
          onChange={(_, v) =>
            form.setFieldValue(
              "showPhone",
              v !== null ? v : form.values.showPhone
            )
          }
          sx={{ width: "100%" }}
        >
          <ToggleButton size="small" value={true} sx={{ width: "100%" }}>
            Да
          </ToggleButton>
          <ToggleButton size="small" value={false} sx={{ width: "100%" }}>
            Нет
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Аватар</Typography>
        <Cell
          disableRipple
          startIcon={
            <LazyLoadComponent>
              <Avatar
                variant="rounded"
                src={form.values.avatar}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </LazyLoadComponent>
          }
        >
          <TextField
            margin="none"
            fullWidth
            error={!!form.errors.avatar}
            color={form.errors.avatar === "error" ? "error" : undefined}
            id="avatar"
            helperText={form.errors.avatar ? form.errors.avatar : undefined}
            variant="outlined"
            name="avatar"
            value={form.values.avatar}
            onChange={form.handleChange}
            size="small"
          />
        </Cell>
      </Stack>
      {checkPermissions(
        Permissions.PremiumSubscription,
        currentProfile?.user.permissions
      ) && (
        <Stack spacing={1}>
          <Typography variant="body1">Баннер</Typography>
          <Cell disableRipple>
            <TextField
              margin="none"
              fullWidth
              error={!!form.errors.banner}
              color={form.errors.banner === "error" ? "error" : undefined}
              id="banner"
              helperText={form.errors.banner ? form.errors.banner : undefined}
              variant="outlined"
              name="banner"
              value={form.values.banner}
              onChange={form.handleChange}
              size="small"
            />
          </Cell>
          <Box
            sx={{
              borderRadius: (theme) => theme.spacing(1.5),
              overflow: "hidden",
            }}
          >
            <LazyLoadComponent
              style={{
                width: "100%",
                height: "min-content",
                aspectRatio: "722 / 185",
              }}
            >
              <Avatar
                variant="rounded"
                src={form.values.banner}
                children={"Баннер"}
                sx={{
                  width: "100%",
                  height: "min-content",
                  aspectRatio: "722 / 185",
                }}
              />
            </LazyLoadComponent>
          </Box>
        </Stack>
      )}
      <Stack spacing={1}>
        <Typography variant="body1">Пол</Typography>
        <Cell disableRipple>
          <Select
            id="sex"
            value={form.values.sex}
            name="sex"
            onChange={form.handleChange}
            fullWidth
            size="small"
          >
            <MenuItem value="UNDEFINED">Не указан</MenuItem>
            <MenuItem value="MALE">Мужчина</MenuItem>
            <MenuItem value="FEMALE">Женщина</MenuItem>
          </Select>
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Статус</Typography>
        <Cell disableRipple>
          <TextField
            margin="none"
            fullWidth
            error={!!form.errors.status}
            color={form.errors.status === "error" ? "error" : undefined}
            id="status"
            helperText={form.errors.status ? form.errors.status : undefined}
            variant="outlined"
            name="status"
            value={form.values.status}
            onChange={form.handleChange}
            size="small"
          />
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Описание</Typography>
        <Cell disableRipple>
          <TextField
            margin="none"
            multiline
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
            onChange={form.handleChange}
            size="small"
          />
        </Cell>
      </Stack>
      <Stack spacing={2} direction="row">
        <LoadingButton
          type="submit"
          color="success"
          size="medium"
          variant="contained"
          loading={editProfileLoading}
          disabled={
            !form.isValid ||
            JSON.stringify(form.values) === JSON.stringify(form.initialValues)
          }
          fullWidth
          onClick={form.submitForm}
        >
          Сохранить
        </LoadingButton>
        <Button
          type="reset"
          size="medium"
          disabled={
            JSON.stringify(form.initialValues) === JSON.stringify(form.values)
          }
          variant="outlined"
          fullWidth
        >
          Сбросить
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfileBodySettings;
