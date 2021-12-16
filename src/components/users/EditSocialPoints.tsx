import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setUserUpdate } from "../../redux/cache/reducer";
import { setModal } from "../../redux/ui/reducer";

interface props {
  userId: number;
}

const EditSocialPoints: React.FC<props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const [num, setNum] = React.useState(0);
  const [add, { data, error, loading }] = useMutation(gql`
    mutation addSocialPoints($id: Int!, $amount: Int!) {
      addSocialPoints(id: $id, socialPoints: $amount) {
        userId
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Успешно!", {
      variant: "success",
    });
    dispatch(setUserUpdate(true));
    dispatch(setModal(null));
  }, [data, enqueueSnackbar, dispatch]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error?.message, {
      variant: "error",
    });
  }, [error, enqueueSnackbar]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <DialogTitle>Добавление социального рейтинга</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Кол-во социального рейтинга
            </Typography>
            <TextField
              type="number"
              value={num}
              onChange={(e) =>
                setNum(Math.floor(Number(e.currentTarget.value)))
              }
            />
          </Stack>
          <Button
            disabled={loading}
            size="medium"
            fullWidth
            onClick={() =>
              add({
                variables: {
                  id: userId,
                  amount: Math.floor(Number(num.toString())),
                },
              })
            }
          >
            Добавить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditSocialPoints;
