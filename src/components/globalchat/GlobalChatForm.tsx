import { gql, useMutation } from "@apollo/client";
import { Box, IconButton, TextField, Theme } from "@mui/material";
import { Icon28MessageOutline } from "@vkontakte/icons";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { useAppSelector } from "../../hooks/redux";
const MessageSchema = Yup.object().shape({
  message: Yup.string().max(200, "Максимальная длина 200"),
});

interface props {
  addText: string;
  setAddText: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalChatForm: React.FC<props> = ({ addText, setAddText }) => {
  const server = useAppSelector((state) => state.userData.serverId);
  const form = useFormik({
    initialValues: {
      message: "",
    },
    validateOnChange: true,
    validationSchema: MessageSchema,
    onSubmit: (values) => {
      if (values.message.length === 0) return;
      send({
        variables: {
          msg: values.message,
          server: server,
        },
      });
      form.setValues({ message: "" });
    },
  });
  const [send, { error }] = useMutation(gql`
    mutation create($msg: String!, $server: ObjectID!) {
      createGlobalChatMessage(input: { server: $server, message: $msg }) {
        id
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!addText) return;
    form.setFieldValue("message", form.values.message + addText);
    setAddText("");
    // eslint-disable-next-line
  }, [addText, setAddText]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Box
      component="form"
      onSubmit={(e: any) => {
        form.handleSubmit(e as React.FormEvent<HTMLFormElement>);
      }}
      onReset={form.handleReset}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr max-content",
        gap: (theme: Theme) => theme.spacing(1),
      }}
    >
      <TextField
        size="small"
        placeholder="Сообщение..."
        fullWidth
        error={!!form.errors.message}
        color={form.errors.message === "error" ? "error" : undefined}
        id="message"
        helperText={form.errors.message ? form.errors.message : undefined}
        variant="outlined"
        name="message"
        value={form.values.message}
        onChange={form.handleChange}
        multiline
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submitForm();
          }
        }}
        sx={{ margin: 0 }}
      />
      <IconButton
        type="submit"
        size="small"
        sx={{ aspectRatio: "1 / 1" }}
        disabled={!form.isValid || form.values.message.length === 0}
      >
        <Icon28MessageOutline />
      </IconButton>
    </Box>
  );
};

export default GlobalChatForm;
