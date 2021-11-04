import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router";
import { Product } from "../../graphql/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

interface props {
  product: Product;
}

const ProductCardMessageForm: React.FC<props> = ({ product }) => {
  const [text, setText] = React.useState("");
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [send] = useMutation(
    gql`
      mutation sendMessage($chat: ObjectID!, $message: String!) {
        sendMessage(input: { chat: $chat, message: $message }) {
          id
        }
      }
    `
  );
  const [startChat, { data: startSuccess, error: startError }] =
    useMutation(gql`
      mutation ($profile: ObjectID!) {
        createChat(input: { withProfile: $profile, type: PRODUCT }) {
          id
        }
      }
    `);
  React.useEffect(() => {
    if (!startSuccess) return;
    send({
      variables: {
        chat: startSuccess.createChat.id,
        message: text,
      },
    });
    send({
      variables: {
        chat: startSuccess.createChat.id,
        message: `![${product.id}]`,
      },
    });
    history.push("/chats/" + startSuccess.createChat.id);
  }, [startSuccess, product.id, send, history, text]);

  React.useEffect(() => {
    if (!startError) return;
    enqueueSnackbar(startError.message, { variant: "error" });
  }, [startError, enqueueSnackbar]);

  return (
    <Dialog
      open={true}
      onClose={() => dispatch(setModal(null))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        Написать {product.owner.nickname}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            size="small"
            placeholder="Сообщение..."
            fullWidth
            id="message"
            variant="outlined"
            name="message"
            multiline
            value={text}
            error={text.length > 1000}
            helperText={
              text.length > 1000
                ? "Максимальная длина 1000 символов"
                : undefined
            }
            onChange={(e) => setText(e.currentTarget.value)}
            maxRows={10}
            sx={{ margin: 0, flex: 1 }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={() => {
            dispatch(setModal(null));
          }}
          size="medium"
        >
          Отмена
        </Button>
        <Button
          color="primary"
          onClick={() =>
            startChat({ variables: { profile: product.owner.id } })
          }
          autoFocus
          variant="contained"
          size="medium"
        >
          Написать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCardMessageForm;
