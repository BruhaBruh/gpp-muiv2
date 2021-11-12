import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { Permissions, Product } from "../../graphql/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions } from "../../redux/userData/types";

interface props {
  product: Product;
}

const ProductSchema = Yup.object().shape({
  cost: Yup.number()
    .typeError("Цена должна быть целочисленным числом")
    .min(0, "Минимальная цена 0")
    .max(100000000, "Максимальная цена 100.000.000")
    .required("Обязательно"),
  description: Yup.string().max(200, "Максимальная длина 200"),
  isHighlighted: Yup.bool(),
  amount: Yup.number()
    .typeError("Количество должно быть целочисленным числом")
    .min(1, "Минимальное количество 1")
    .max(64, "Максимальное количество 64")
    .required("Обязательно"),
});

const ProductEdit: React.FC<props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const form = useFormik({
    initialValues: {
      cost: product.cost,
      description: product.description,
      isHighlighted: product.isHighlighted,
      amount: product.amount ? product.amount : 1,
    },
    validationSchema: ProductSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      saveProduct({
        variables: {
          id: product.id,
          cost: parseFloat(values.cost.toString()),
          description: values.description,
          isHighlighted: values.isHighlighted,
          amount: values.amount,
        },
      });
    },
  });
  const [saveProduct, { data: saveSuccess, error: saveError }] = useMutation(
    gql`
      mutation editProduct(
        $id: ObjectID!
        $description: String
        $cost: Int
        $isHighlighted: Boolean
        $amount: Int
      ) {
        editProduct(
          id: $id
          input: {
            description: $description
            cost: $cost
            isHighlighted: $isHighlighted
            amount: $amount
          }
        ) {
          id
        }
      }
    `
  );

  React.useEffect(() => {
    if (!saveSuccess) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    dispatch(setModal(null));
  }, [saveSuccess, enqueueSnackbar, dispatch]);

  React.useEffect(() => {
    if (!saveError) return;
    enqueueSnackbar(saveError.message, { variant: "error" });
  }, [saveError, enqueueSnackbar]);

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
        <DialogTitle>
          Редактирование{" "}
          <span style={{ color: product.icon.category.color }}>
            {product.icon.name}
          </span>
        </DialogTitle>
        <DialogContent className="hide-scrollbar">
          <Stack spacing={2}>
            <div style={{ width: "100%" }}>
              <InputLabel id="avatar">Цена</InputLabel>
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
                      product.owner.user.permissions
                    ) ||
                    checkPermissions(
                      Permissions.PremiumSubscription,
                      product.owner.user.permissions
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
                <ToggleButton size="small" value={true} sx={{ width: "100%" }}>
                  Да
                </ToggleButton>
                <ToggleButton size="small" value={false} sx={{ width: "100%" }}>
                  Нет
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div style={{ width: "100%" }}>
              <InputLabel id="avatar">Описание</InputLabel>
              <TextField
                fullWidth
                error={!!form.errors.description}
                color={
                  form.errors.description === "error" ? "error" : undefined
                }
                id="description"
                helperText={
                  form.errors.description ? form.errors.description : undefined
                }
                variant="outlined"
                name="description"
                multiline
                value={form.values.description}
                onChange={form.handleChange}
                size="small"
              />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              color="success"
              size="medium"
              type="submit"
              variant="contained"
              disabled={!form.isValid}
              fullWidth
            >
              Сохранить
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

export default ProductEdit;
