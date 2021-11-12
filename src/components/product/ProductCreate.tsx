import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";
import { Category, IconSearchResult, Permissions } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions } from "../../redux/userData/types";

interface props {
  categories: Category[];
}

const ProductSchema = Yup.object().shape({
  cost: Yup.number()
    .typeError("Цена должна быть целочисленным числом")
    .min(0, "Минимальная цена 0")
    .max(100000000, "Максимальная цена 100.000.000")
    .required("Обязательно"),
  description: Yup.string().max(200, "Максимальная длина 200"),
  icon: Yup.string(),
  isHighlighted: Yup.bool(),
  amount: Yup.number()
    .typeError("Количество должно быть целочисленным числом")
    .min(1, "Минимальное количество 1")
    .max(64, "Максимальное количество 64")
    .required("Обязательно"),
});

const ProductCreate: React.FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const server = useAppSelector((state) => state.userData.serverId);
  const permissions = useAppSelector((state) => state.userData.permissions);
  const [getIcons, { data: iconsData, loading: iconsLoading }] = useLazyQuery<{
    icons: IconSearchResult;
  }>(
    gql`
      query icons($limit: Int, $page: Int, $category: ObjectID) {
        icons(limit: $limit, page: $page, category: $category) {
          result {
            id
            image
            name
          }
          hasMore
        }
      }
    `,
    { fetchPolicy: "no-cache", variables: { limit: 1000, page: 1 } }
  );
  const [selected, setSelected] = React.useState(categories[0].id);
  const form = useFormik({
    initialValues: {
      cost: 0,
      description: "",
      icon: "",
      isHighlighted: false,
      amount: 1,
    },
    validationSchema: ProductSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      createProduct({
        variables: {
          icon: values.icon,
          server: server,
          cost: parseFloat(values.cost.toString()),
          description: values.description,
          amount: values.amount,
          isHighlighted: values.isHighlighted,
        },
      });
    },
  });
  const [
    createProduct,
    { data: createSuccess, loading: createLoading, error: createError },
  ] = useMutation(gql`
    mutation createProduct(
      $icon: ObjectID!
      $server: ObjectID!
      $cost: Int!
      $amount: Int!
      $description: String!
      $isHighlighted: Boolean!
    ) {
      createProduct(
        input: {
          icon: $icon
          server: $server
          cost: $cost
          description: $description
          amount: $amount
          isHighlighted: $isHighlighted
        }
      ) {
        id
      }
    }
  `);

  React.useEffect(() => {
    if (selected === "") return;
    getIcons({ variables: { category: selected } });
  }, [selected, getIcons]);

  React.useEffect(() => {
    if (!iconsData) return;
    form.setFieldValue("icon", "");
    // eslint-disable-next-line
  }, [iconsData]);

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
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <Box
        component="form"
        onSubmit={(e: any) => {
          form.handleSubmit(e as React.FormEvent<HTMLFormElement>);
        }}
      >
        <DialogTitle>Создание товара</DialogTitle>
        <DialogContent className="hide-scrollbar">
          <Stack spacing={2}>
            <div style={{ width: "100%" }}>
              <InputLabel id="category-label">Выберите категорию</InputLabel>
              <Select
                name="category"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                fullWidth
                size="small"
              >
                {categories
                  .map((category) => ({
                    value: category.id,
                    label: category.name,
                    color: category.color,
                  }))
                  .map((c) => (
                    <MenuItem
                      value={c.value}
                      sx={{ color: c.color ? c.color : undefined }}
                    >
                      {c.label}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            {selected && (
              <div style={{ width: "100%" }}>
                <InputLabel id="icon-label">Выберите товар</InputLabel>
                <Autocomplete
                  id="icon"
                  fullWidth
                  options={
                    iconsData
                      ? iconsData.icons.result.map((icon) => ({
                          value: icon.id,
                          label: icon.name,
                          image: icon.image,
                        }))
                      : []
                  }
                  loading={iconsLoading}
                  loadingText="Загрузка..."
                  noOptionsText="Не найдено"
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) =>
                    form.setFieldValue("icon", value ? value.value : "")
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { marginRight: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <LazyLoadImage
                        alt={""}
                        src={option.image} // use normal <img> attributes as props
                        width="24px"
                        height="24px"
                        style={{ imageRendering: "pixelated" }}
                      />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </div>
            )}
            {selected && form.values.icon && (
              <div style={{ width: "100%" }}>
                <InputLabel id="cost-label">Цена</InputLabel>
                <TextField
                  fullWidth
                  error={!!form.errors.cost}
                  color={form.errors.cost === "error" ? "error" : undefined}
                  id="cost"
                  helperText={
                    form.errors.cost
                      ? form.errors.cost
                      : form.values.cost === 0
                      ? "Договорная"
                      : undefined
                  }
                  variant="outlined"
                  name="cost"
                  value={form.values.cost}
                  onChange={form.handleChange}
                  size="small"
                />
              </div>
            )}
            {form.values.icon && (
              <div style={{ width: "100%" }}>
                <InputLabel id="avatar">Подсвечен?</InputLabel>
                <ToggleButtonGroup
                  color="primary"
                  value={form.values.isHighlighted}
                  exclusive
                  disabled={
                    !(
                      checkPermissions(
                        Permissions.LiteSubscription,
                        permissions
                      ) ||
                      checkPermissions(
                        Permissions.PremiumSubscription,
                        permissions
                      )
                    )
                  }
                  onChange={(_, v) =>
                    form.setFieldValue(
                      "isHighlighted",
                      v !== null ? v : form.values.isHighlighted
                    )
                  }
                  sx={{ width: "100%" }}
                >
                  <ToggleButton
                    size="small"
                    value={true}
                    sx={{ width: "100%" }}
                  >
                    Да
                  </ToggleButton>
                  <ToggleButton
                    size="small"
                    value={false}
                    sx={{ width: "100%" }}
                  >
                    Нет
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            )}
            {selected && form.values.icon && (
              <div style={{ width: "100%" }}>
                <InputLabel id="amount-label">Количество</InputLabel>
                <Slider
                  size="small"
                  min={1}
                  max={64}
                  step={1}
                  value={form.values.amount}
                  onChange={(_, v) => form.setFieldValue("amount", v)}
                  valueLabelDisplay="on"
                />
              </div>
            )}
            {selected && form.values.icon && (
              <div style={{ width: "100%" }}>
                <InputLabel id="desc-label">Описание</InputLabel>
                <TextField
                  fullWidth
                  error={!!form.errors.description}
                  color={
                    form.errors.description === "error" ? "error" : undefined
                  }
                  id="description"
                  helperText={
                    form.errors.description
                      ? form.errors.description
                      : undefined
                  }
                  variant="outlined"
                  name="description"
                  multiline
                  value={form.values.description}
                  onChange={form.handleChange}
                  size="small"
                />
              </div>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              color="success"
              size="medium"
              type="submit"
              variant="contained"
              disabled={!form.isValid || createLoading}
              fullWidth
            >
              Создать
            </Button>
            <Button
              onClick={() => dispatch(setModal(null))}
              color="inherit"
              size="medium"
              variant="outlined"
              fullWidth
            >
              Отмена
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductCreate;
