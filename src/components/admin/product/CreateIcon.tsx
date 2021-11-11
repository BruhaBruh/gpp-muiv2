import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
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
  image: Yup.string()
    .trim()
    .matches(
      /https:\/\/i\.(postimg\.cc|imgur.com)\/.*(\.jpg|\.png|\.jpeg)/i,
      "Ссылка должна быть прямой с imgur или postimg"
    )
    .required("Обязательно"),
});

interface props {
  categories: Category[];
}

const CreateIcon: React.FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = React.useState(categories[0].id);
  const form = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validateOnChange: true,
    validationSchema: formSchema,
    onSubmit: (values) =>
      create({
        variables: {
          name: values.name,
          image: values.image,
          category: category,
        },
      }),
  });
  const [create, { data, error, loading }] = useMutation(gql`
    mutation createIcon(
      $category: ObjectID!
      $name: String!
      $image: MediaLink!
    ) {
      createIcon(input: { category: $category, name: $name, image: $image }) {
        id
      }
    }
  `);
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
        <DialogTitle>Создание Иконки</DialogTitle>
        <DialogContent className="hide-scrollbar">
          <Stack spacing={1}>
            <div style={{ width: "100%" }}>
              <InputLabel id="category-label">Выберите категорию</InputLabel>
              <Select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              <InputLabel id="image-label">Иконка</InputLabel>
              <div style={{ display: "flex" }}>
                <Avatar
                  variant="rounded"
                  src={form.values.image}
                  sx={{
                    width: 40,
                    height: 40,
                    marginRight: (theme: Theme) => theme.spacing(1),
                    marginTop: "8px",
                    imageRendering: "pixelated",
                  }}
                />
                <TextField
                  fullWidth
                  error={!!form.errors.image}
                  color={form.errors.image === "error" ? "error" : undefined}
                  id="image"
                  helperText={form.errors.image ? form.errors.image : undefined}
                  variant="outlined"
                  name="image"
                  value={form.values.image}
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
              disabled={
                !form.isValid ||
                loading ||
                JSON.stringify(form.initialValues) ===
                  JSON.stringify(form.values)
              }
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

export default CreateIcon;
