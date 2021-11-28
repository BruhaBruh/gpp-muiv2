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
import { useHistory } from "react-router";
import { Post } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const PostEdit: React.FC<{ post: Post }> = ({ post }) => {
  const [message, setMessage] = React.useState(post.message);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [save, { data: saveData, loading: saveLoading, error: saveError }] =
    useMutation(gql`
      mutation editPost($input: PostEditInput!) {
        editPost(input: $input) {
          postId
        }
      }
    `);
  const history = useHistory();

  const reload = () => {
    const current = window.location.pathname;
    history.replace(`/reload`);
    setTimeout(() => {
      history.replace(current);
    });
  };

  React.useEffect(() => {
    if (!saveData) return;
    enqueueSnackbar("Успешно!", { variant: "success" });
    reload();
    dispatch(setModal(null));
    // eslint-disable-next-line
  }, [saveData, enqueueSnackbar, dispatch]);

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
      <DialogTitle>Редактирование сообщения</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Сообщение
            </Typography>
            <TextField
              margin="none"
              size="small"
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              error={message.length < 1 || message.length > 2000}
              helperText={
                message.length < 1 || message.length > 2000
                  ? "От 1 до 2000 символов"
                  : undefined
              }
            />
          </Stack>
          <Button
            size="medium"
            fullWidth
            disabled={
              message.length < 1 || message.length > 2000 || saveLoading
            }
            onClick={() =>
              save({
                variables: { input: { id: post.postId, message: message } },
              })
            }
          >
            Сохранить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PostEdit;
