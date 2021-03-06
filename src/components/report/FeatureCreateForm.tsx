import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReportSubType, ReportType } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setReportsUpdate } from "../../redux/cache/reducer";

const FeatureCreateForm: React.FC<{ subtype: ReportSubType }> = ({
  subtype,
}) => {
  const [text, setText] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [create, { data, error, loading }] = useMutation(gql`
    mutation createReport(
      $type: ReportType!
      $subtype: ReportSubType!
      $message: String!
    ) {
      createReport(
        input: { type: $type, subtype: $subtype, message: $message }
      ) {
        reportId
      }
    }
  `);
  const history = useHistory();

  React.useEffect(() => {
    if (!data) return;
    setText("");
    dispatch(setReportsUpdate(true));
    history.push("/r");
  }, [data, setText, dispatch, history]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <>
      <TextField
        margin="none"
        size="small"
        fullWidth
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        maxRows={5}
        multiline
      />
      <Button
        size="medium"
        disabled={
          loading || text.trim().length < 1 || text.trim().length > 1000
        }
        onClick={() =>
          create({
            variables: {
              type: ReportType.Feature,
              subtype: subtype,
              message: text.trim(),
            },
          })
        }
      >
        Отправить
      </Button>
    </>
  );
};

export default FeatureCreateForm;
