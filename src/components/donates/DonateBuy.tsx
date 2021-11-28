import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Donateitem } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const DonateBuy: React.FC<{ item: Donateitem }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [buy, { data, loading, error }] = useMutation<{
    buyDonate: Donateitem;
  }>(gql`
    mutation buy($id: Int!) {
      buyDonate(id: $id) {
        donateitemId
        name
        type
        amount
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!data) return;
    if (item.type === 3) {
      enqueueSnackbar(
        `Вы получили ${
          data.buyDonate.type === 4 ? data.buyDonate.amount : ""
        } ${data.buyDonate.name}`,
        { variant: "success" }
      );
    } else {
      enqueueSnackbar("Успешно!", { variant: "success" });
    }
    dispatch(setModal(null));
  }, [data, enqueueSnackbar, dispatch, item.type]);

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
      <DialogTitle>Покупка {item.name}</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Вы уверены?
          </Typography>
          <Button
            onClick={() => buy({ variables: { id: item.donateitemId } })}
            disabled={loading}
            size="medium"
            fullWidth
          >
            Купить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DonateBuy;
