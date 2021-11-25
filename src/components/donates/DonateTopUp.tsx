import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon24RoubleBadgeOutline } from "@vkontakte/icons";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import IconWrapper from "../ui/IconWrapper";

const DonateTopUp = () => {
  const [amount, setAmount] = React.useState("");
  const dispatch = useAppDispatch();

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <DialogTitle>Пополнение баланса</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Количество
            </Typography>
            <Stack spacing={1} direction="row">
              <TextField
                margin="none"
                size="small"
                fullWidth
                variant="outlined"
                value={amount}
                error={
                  !/^\d*$/.test(amount) ||
                  (/^\d*$/.test(amount) &&
                    (Number(amount) < 10 || Number(amount) > 50000))
                }
                helperText={
                  !/^\d*$/.test(amount) ||
                  (/^\d*$/.test(amount) &&
                    (Number(amount) < 10 || Number(amount) > 50000))
                    ? "От 10 до 50.000"
                    : undefined
                }
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              <IconWrapper
                size={32}
                alignSelf="center"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                <Icon24RoubleBadgeOutline />
              </IconWrapper>
            </Stack>
          </Stack>
          <Button
            size="medium"
            disabled={
              !/^\d*$/.test(amount) ||
              (/^\d*$/.test(amount) &&
                (Number(amount) < 10 || Number(amount) > 50000))
            }
            href={"/api/qiwi/create?amount=" + amount}
            fullWidth
          >
            Пополнить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DonateTopUp;
