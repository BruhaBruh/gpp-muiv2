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
import { useHistory } from "react-router";
import { Forum } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const ForumDelete: React.FC<{ forum: Forum }> = ({ forum }) => {
  const dispatch = useAppDispatch();
  const [remove, { data, loading, error }] = useMutation(gql`
    mutation remove($id: Int!) {
      removeForum(id: $id) {
        forumId
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const reload = () => {
    const current = window.location.pathname;
    history.replace(`/reload`);
    setTimeout(() => {
      history.replace(current);
    });
  };

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    reload();
    dispatch(setModal(null));
    // eslint-disable-next-line
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
      <DialogTitle>Удаление {forum.name}</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Вы уверены, что хотите удалить раздел?
          </Typography>
          <Button
            onClick={() => remove({ variables: { id: forum.forumId } })}
            color="error"
            size="medium"
            disabled={loading}
            fullWidth
          >
            Удалить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ForumDelete;
