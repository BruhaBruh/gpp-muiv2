import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router";
import { ChatType, Message, MessageSearchResult } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addMessages,
  incPage,
  removeMessage as removeMessageR,
} from "../../redux/chats/reducer";
import { setModal } from "../../redux/ui/reducer";
import ChatMessage from "./ChatMessage";

interface props {
  setMessageToEdit: (value: React.SetStateAction<Message | undefined>) => void;
}

const ChatMessages: React.FC<props> = ({ setMessageToEdit }) => {
  const { id } = useParams<{ id: string }>();
  const messages: Message[] | undefined = useAppSelector(
    (state) =>
      state.chats.chats.filter((c) => c.chat.id === Number(id))[0]?.messages
  );
  const page: number | undefined = useAppSelector(
    (state) =>
      state.chats.chats
        .filter((c) => c.chat.id === Number(id))
        .map((c) => c.page)[0]
  );
  const chatType: ChatType | undefined = useAppSelector(
    (state) =>
      state.chats.chats
        .filter((c) => c.chat.id === Number(id))
        .map((c) => c.chat)[0]?.type
  );
  const [getMessages, { data, loading }] = useLazyQuery<{
    messages: MessageSearchResult;
  }>(
    gql`
      query getMessages(
        $chat: ObjectID!
        $limit: Int
        $page: Int
        $search: String
      ) {
        messages(chat: $chat, limit: $limit, page: $page, search: $search) {
          result {
            id
            type
            chat
            owner {
              id
              nickname
              lastOnline
              avatar
              roles {
                color
              }
            }
            message
            createdAt
            edited
            updatedAt
            readed
          }
          hasMore
        }
      }
    `,
    {
      variables: { page: 1, chat: Number(id), limit: 25, search: "" },
      fetchPolicy: "no-cache",
    }
  );
  const lastElementRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver>();
  const [removeMessage, { error: removeError }] = useMutation(gql`
    mutation removeMessage($message: ObjectID!) {
      removeMessage(id: $message) {
        id
      }
    }
  `);
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (messages === undefined || !id) return;
    if (messages.length <= 1) return;
    getMessages();
    dispatch(incPage(id));
    // eslint-disable-next-line
  }, [getMessages, dispatch, id]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(addMessages({ id: id, messages: data.messages.result }));
    setHasMore(false);
  }, [data, dispatch, setHasMore, id]);

  React.useEffect(() => {
    if (!messages) return;
    if (loading || messages.length === 0 || lastElementRef.current === null)
      return;
    if (observer.current) observer.current.disconnect();
    const cb: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        getMessages({
          variables: {
            page: page,
          },
        });
        dispatch(incPage(id));
        setHasMore(false);
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElementRef.current);
    // eslint-disable-next-line
  }, [lastElementRef, loading, messages, page, getMessages, id, dispatch]);

  React.useEffect(() => {
    if (!removeError) return;
    enqueueSnackbar(removeError.message, { variant: "error" });
  }, [removeError, enqueueSnackbar]);

  return (
    <Stack
      direction="column-reverse"
      spacing={1}
      sx={{
        overflowY: "scroll",
        height:
          chatType === ChatType.Chat
            ? "calc(100vh - 252px)"
            : "calc(100vh - 236px)",
      }}
      className="hide-scrollbar"
    >
      {messages?.map((msg, i) => {
        return (
          <ChatMessage
            message={msg}
            onRemove={() =>
              dispatch(
                setModal(
                  <Dialog
                    open={true}
                    onClose={() => dispatch(setModal(null))}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Удаление сообщения
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить сообщение?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        color="inherit"
                        onClick={() => dispatch(setModal(null))}
                        autoFocus
                        size="medium"
                      >
                        Отмена
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          removeMessage({ variables: { message: msg.id } });
                          dispatch(removeMessageR(msg));
                          dispatch(setModal(null));
                        }}
                        size="medium"
                      >
                        Удалить
                      </Button>
                    </DialogActions>
                  </Dialog>
                )
              )
            }
            setMessageToEdit={setMessageToEdit}
            prevMessage={messages[i + 1]}
          />
        );
      })}
      {loading && <LinearProgress />}
      {((data?.messages.hasMore && !loading) || hasMore) && (
        <div
          style={{ minHeight: "10px", width: "100%" }}
          ref={lastElementRef}
        ></div>
      )}
    </Stack>
  );
};

export default ChatMessages;
