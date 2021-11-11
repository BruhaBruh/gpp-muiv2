import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Theme,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { Category } from "../../../graphql/graphql";
import { useAppDispatch } from "../../../hooks/redux";
import { setModal } from "../../../redux/ui/reducer";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, "Максимальная длина 32 символа")
    .required("Обязательно"),
  color: Yup.string()
    .trim()
    .matches(
      /^#([a-f0-9]{6}|[a-f0-9]{8})$/i,
      "Цвет должен иметь формат HEX, допустим alpha канал"
    )
    .required("Обязательно"),
});

interface props {
  categories: Category[];
}

const EditCategory: React.FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = React.useState(categories[0]);
  const form = useFormik({
    initialValues: {
      category: "",
      name: "",
      color: "#FFFFFF",
    },
    validateOnChange: true,
    validationSchema: formSchema,
    onSubmit: (values) =>
      edit({
        variables: {
          category: values.category,
          name: values.name,
          color: values.color,
        },
      }),
  });
  const [edit, { data, error, loading }] = useMutation(gql`
    mutation editCategory(
      $category: ObjectID!
      $name: String
      $color: HEXColor
    ) {
      editCategory(id: $category, input: { name: $name, color: $color }) {
        id
      }
    }
  `);

  React.useEffect(() => {
    if (!category) return;
    form.setValues({
      name: category.name,
      category: category.id,
      color: category.color,
    });
    // eslint-disable-next-line
  }, [category]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    form.resetForm();
    // eslint-disable-next-line
  }, [data, enqueueSnackbar]);

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
        <DialogTitle>Редактирование Категории</DialogTitle>
        <DialogContent className="hide-scrollbar">
          <Stack spacing={1}>
            <div style={{ width: "100%" }}>
              <InputLabel id="category-label">Выберите категорию</InputLabel>
              <Select
                name="category"
                value={form.values.category}
                onChange={(e) =>
                  setCategory(
                    categories.filter((c) => c.id === e.target.value)[0]
                  )
                }
                fullWidth
                size="small"
              >
                {categories.map((category) => (
                  <MenuItem value={category.id} sx={{ color: category.color }}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ width: "100%" }}>
              <InputLabel id="name-label">Название</InputLabel>
              <TextField
                fullWidth
                error={!!form.errors.name}
                color={form.errors.name ? "error" : undefined}
                id="name"
                helperText={form.errors.name ? form.errors.name : undefined}
                variant="outlined"
                name="name"
                value={form.values.name}
                onChange={form.handleChange}
                size="small"
              />
            </div>
            <div style={{ width: "100%" }}>
              <InputLabel id="color-label">Цвет</InputLabel>
              <div style={{ display: "flex" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    marginRight: (theme: Theme) => theme.spacing(1),
                    marginTop: "8px",
                    backgroundColor: form.values.color,
                    borderRadius: (theme: Theme) => theme.spacing(1),
                    border: (theme: Theme) =>
                      `1px solid ${theme.palette.divider}`,
                  }}
                />
                <TextField
                  fullWidth
                  error={!!form.errors.color}
                  color={form.errors.color === "error" ? "error" : undefined}
                  id="color"
                  helperText={form.errors.color ? form.errors.color : undefined}
                  variant="outlined"
                  name="color"
                  value={form.values.color}
                  onChange={form.handleChange}
                  size="small"
                />
              </div>
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
              disabled={!form.isValid || loading}
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

export default EditCategory;
