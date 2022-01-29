import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon24RoubleBadgeOutline } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import IconWrapper from "../ui/IconWrapper";

const DonateConvertToTref = () => {
  const [amount, setAmount] = React.useState("");
  const lowerSM = useMediaQuery("(max-width: 600px)");
  const dispatch = useAppDispatch();
  const [buy, { data, loading, error }] = useMutation(gql`
    mutation buy($amount: Int) {
      buyDonate(id: 13, amount: $amount) {
        donateitemId
        name
        amount
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    dispatch(setModal(null));
  }, [data, enqueueSnackbar, dispatch]);

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
      <DialogTitle>Конвертация в трефы</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Количество
            </Typography>
            <Stack spacing={1} direction={lowerSM ? "column" : "row"}>
              <Stack spacing={1} direction={lowerSM ? "row-reverse" : "row"}>
                <IconWrapper
                  size={32}
                  alignSelf="center"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  <Icon24RoubleBadgeOutline />
                </IconWrapper>
                <TextField
                  margin="none"
                  size="small"
                  fullWidth
                  id="banner"
                  variant="outlined"
                  name="banner"
                  value={amount}
                  error={!/^\d*$/.test(amount)}
                  helperText={
                    !/^\d*$/.test(amount) ? "Неверный формат" : undefined
                  }
                  onChange={(e) => setAmount(e.currentTarget.value)}
                />
              </Stack>
            </Stack>
          </Stack>
          <Button
            size="medium"
            disabled={
              !/^\d*$/.test(amount) ||
              !amount ||
              (/^\d*$/.test(amount) && Number(amount) < 1) ||
              loading
            }
            onClick={() => buy({ variables: { amount: Number(amount) } })}
            fullWidth
          >
            Конвертировать
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DonateConvertToTref;
