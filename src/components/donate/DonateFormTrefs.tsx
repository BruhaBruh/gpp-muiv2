import { useMutation } from "@apollo/client";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import { Icon24ShoppingCartOutline } from "@vkontakte/icons";
import { useFormik } from "formik";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import Cell from "../ui/Cell";

const formSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Количество должно быть целочисленным числом")
    .min(1, "Минимальное количество 1")
    .max(1000000, "Максимальное количество 1000000")
    .required("Обязательно"),
});

const DonateFormTrefs = () => {
  const vertical: any = useAppSelector(
    (state) => state.settings.verticalSnackbarPosition
  );
  const horizontal: any = useAppSelector(
    (state) => state.settings.horizontalSnackbarPosition
  );
  const form = useFormik({
    initialValues: {
      amount: 1,
    },
    validationSchema: formSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      buy({ variables: { amount: Number(values.amount) } });
    },
  });
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [buy, { data, loading, error }] = useMutation(gql`
    mutation buyTrefs($amount: Int!) {
      buyTref(amount: $amount)
    }
  `);

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Поздравляем с покупкой треф!", { variant: "success" });
    dispatch(setModal(null));
  }, [data, dispatch, horizontal, vertical, enqueueSnackbar]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

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
        <DialogTitle>Конвертация в трефы</DialogTitle>
        <DialogContent className="hide-scrollbar">
          <div style={{ width: "100%" }}>
            <InputLabel id="amount-label">
              Количество монет. Перевод 1 к 2
            </InputLabel>
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
          <Cell
            color="primary"
            type="submit"
            fullWidth
            size="large"
            startIcon={<Icon24ShoppingCartOutline />}
            disabled={loading}
          >
            Купить
          </Cell>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DonateFormTrefs;
