import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const formValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Должно быть числом")
    .min(10, "Минимальное пополнение 10 рублей")
    .required("Обязательно"),
});

const DonateForm = () => {
  const form = useFormik({
    initialValues: {
      amount: 10,
    },
    validateOnChange: true,
    validationSchema: formValidationSchema,
    onSubmit: (values) => {},
  });
  const dispatch = useAppDispatch();

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
        <DialogTitle>Пополнение баланса</DialogTitle>
        <DialogContent className="hide-scrollbar">
          <div style={{ width: "100%" }}>
            <InputLabel id="category-label">Количество</InputLabel>
            <TextField
              fullWidth
              error={!!form.errors.amount}
              color={form.errors.amount === "error" ? "error" : undefined}
              id="amount"
              helperText={form.errors.amount ? form.errors.amount : undefined}
              variant="outlined"
              name="amount"
              value={form.values.amount}
              onChange={form.handleChange}
              size="small"
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              color="success"
              size="medium"
              type="submit"
              href={"/qiwi/create?amount=" + form.values.amount}
              variant="contained"
              disabled={!form.isValid}
              fullWidth
            >
              Пополнить
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DonateForm;
