import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { Product, ProfileSearchResult } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { getLastOnline } from "../../redux/userData/types";
import ProfileIcons from "../profile/ProfileIcons";

const schema = Yup.object().shape({
  profile: Yup.string().required("Обязательно"),
  cost: Yup.number()
    .typeError("Цена должна быть целочисленным числом")
    .min(1, "Минимальная цена 1")
    .max(100000000, "Максимальная цена 100.000.000")
    .required("Обязательно"),
  amount: Yup.number()
    .typeError("Количество должно быть целочисленным числом")
    .min(1, "Минимальное количество 1")
    .required("Обязательно"),
});

const ProductCardOrderForm: React.FC<{ product: Product }> = ({ product }) => {
  const timer = React.useRef<any>();
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      profile: "",
      amount: product.amount ? product.amount : 1,
      cost: product.cost,
    },
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: schema,
    onSubmit: (values) =>
      create({
        variables: {
          product: Number(product.id),
          profile: Number(values.profile),
          cost: Number(values.cost),
          amount: Number(values.amount),
        },
      }),
  });
  const serverId = useAppSelector((state) => state.userData.serverId);
  const [
    create,
    { data: createSuccess, error: createError, loading: createLoading },
  ] = useMutation(gql`
    mutation createOrder(
      $product: ObjectID!
      $profile: ObjectID!
      $cost: Int!
      $amount: Int!
    ) {
      createOrder(
        input: {
          product: $product
          toProfile: $profile
          cost: $cost
          amount: $amount
        }
      ) {
        __typename
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
              nickname
              lastOnline
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
        variables: { server: serverId, limit: 25, page: 1, role: null },
      }
    );
  const profileId = useAppSelector((state) => state.userData.profileId);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    getProfiles({ variables: { search: "" } });
  }, [getProfiles]);

  React.useEffect(() => {
    if (!createSuccess) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    dispatch(setModal(null));
  }, [createSuccess, enqueueSnackbar, dispatch]);

  React.useEffect(() => {
    if (!createError) return;
    enqueueSnackbar(createError.message, { variant: "error" });
  }, [createError, enqueueSnackbar]);

  return (
    <Dialog
      open={true}
      onClose={() => dispatch(setModal(null))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <Box
        component="form"
        onSubmit={(e: any) => {
          form.handleSubmit(e as React.FormEvent<HTMLFormElement>);
        }}
      >
        <DialogTitle id="alert-dialog-title">Создание договора</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="body1">
                  Профиль, кому вы продали товар
                </Typography>
                <Autocomplete
                  id="profile"
                  fullWidth
                  options={
                    profilesData
                      ? profilesData.profiles.result
                          .filter((p) => p.id !== profileId)
                          .map((profile) => ({
                            value: profile.id,
                            label: profile.nickname,
                            avatar: profile.avatar,
                            lastOnline: profile.lastOnline,
                            permissions: profile.user.permissions,
                          }))
                      : []
                  }
                  loading={profilesLoading}
                  loadingText="Загрузка..."
                  noOptionsText="Не найдено"
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) =>
                    form.setFieldValue("profile", value ? value.value : "")
                  }
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
                            getLastOnline(option.lastOnline) === "Онлайн"
                              ? " "
                              : 0
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
                        <ProfileIcons
                          permissions={option.permissions}
                          height="40px"
                        />
                      </Stack>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={(e) => {
                        clearTimeout(timer.current);

                        timer.current = setTimeout(
                          () =>
                            getProfiles({
                              variables: { search: e.target.value },
                            }),
                          500
                        );
                      }}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="body1">Итоговое количество</Typography>
                <TextField
                  margin="none"
                  fullWidth
                  error={!!form.errors.amount}
                  color={form.errors.amount === "error" ? "error" : undefined}
                  id="amount"
                  helperText={
                    form.errors.amount ? form.errors.amount : undefined
                  }
                  variant="outlined"
                  name="amount"
                  value={form.values.amount}
                  onChange={form.handleChange}
                  size="small"
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="body1">Итоговая стоимость</Typography>
                <TextField
                  margin="none"
                  fullWidth
                  error={!!form.errors.cost}
                  color={form.errors.cost === "error" ? "error" : undefined}
                  id="cost"
                  helperText={form.errors.cost ? form.errors.cost : undefined}
                  variant="outlined"
                  name="cost"
                  value={form.values.cost}
                  onChange={form.handleChange}
                  size="small"
                />
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: (theme) => theme.palette.warning.main }}
              >
                При злоупотреблении будут введены санкции отправителю и/или
                получателю.
              </Typography>
              <Typography variant="body2">
                Покупатель должен подтвердить сделку в разделе "Оповещения"
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="text"
            size="large"
            type="submit"
            disabled={
              !form.isValid || form.values.profile === "" || createLoading
            }
            fullWidth
          >
            Создать
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductCardOrderForm;
