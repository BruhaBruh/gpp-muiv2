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
import { Post } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import RichText from "../ui/RichText";

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
      maxWidth="lg"
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
            <RichText value={message} onChange={(v) => setMessage(v)} />
          </Stack>
          <Button
            size="medium"
            fullWidth
            disabled={
              message.length < 1 || message.length > 20000 || saveLoading
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
