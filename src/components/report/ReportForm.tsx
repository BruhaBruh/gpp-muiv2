import { gql, useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { ReportType } from "../../graphql/graphql";
import { useAppSelector } from "../../hooks/redux";
import StyledTab from "../ui/StyledTab";
import StyledTabs from "../ui/StyledTabs";

const ReportForm = () => {
  const [reportType, setReportType] = React.useState<ReportType>(
    ReportType.Bug
  );
  const [reportText, setReportText] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const serverId = useAppSelector((state) => state.userData.serverId);
  const [create, { data, error, loading }] = useMutation(gql`
    mutation createReport(
      $type: ReportType!
      $server: ObjectID!
      $message: String!
    ) {
      createReport(input: { type: $type, server: $server, message: $message }) {
        id
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    setReportText("");
    setDisabled(false);
  }, [data, enqueueSnackbar, setDisabled]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
    setDisabled(false);
  }, [error, enqueueSnackbar, setDisabled]);

  return (
    <Paper sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}>
      <Stack spacing={2}>
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textTransform: "uppercase",
          }}
        >
          Репорт
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body1">Тип репорта</Typography>
          <StyledTabs
            value={reportType}
            onChange={(_, v) => setReportType(v)}
            variant="fullWidth"
          >
            <StyledTab label="Баг" value={ReportType.Bug} />
            <StyledTab label="Жалоба" value={ReportType.Report} />
            <StyledTab label="Предложение" value={ReportType.Feature} />
          </StyledTabs>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body1">Описание</Typography>
          {reportType === ReportType.Bug && (
            <Typography variant="body1">
              Опишите суть бага. Как вы его получили, по шагам, если это
              возможно. Так же желательно прикрепить скриншоты или видео в виде
              ссылок. Разбираются только баги
              <Box
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: (theme) => theme.palette.warning.main,
                }}
              >
                {" "}
                САЙТА
              </Box>
            </Typography>
          )}
          {reportType === ReportType.Report && (
            <Typography variant="body1">
              Обязательно укажите на кого вы подаете жалобу, желательно id
              дискорд аккаунта, либо Mojang ник. Внятно объясните ситуацию.
              Предоставте доказательства в виде скриншотов или видео. Imgur или
              YouTube. Жалобы подаются на пользователей
              <Box
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: (theme) => theme.palette.warning.main,
                }}
              >
                {" "}
                САЙТА
              </Box>
            </Typography>
          )}
          {reportType === ReportType.Feature && (
            <Typography variant="body1">
              <>
                Расскажите в чем идея и как это можно реализовать. Идея должна
                быть для
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    color: (theme) => theme.palette.warning.main,
                  }}
                >
                  {" "}
                  САЙТА
                </Box>
              </>
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            {reportType === ReportType.Bug &&
              `Вы получите вознаграждение при обнаружении бага.`}
            {reportType === ReportType.Report &&
              `При неуважительном отношении к проверяющим, вас проигнорируют`}
            {reportType === ReportType.Feature &&
              `При согласии с вашим предложением вы получите вознаграждение.`}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body1">Сообщение</Typography>
          <TextField
            placeholder={
              (reportType === ReportType.Bug && "Я получил баг...") ||
              (reportType === ReportType.Report && "Я подаю жалобу на...") ||
              (reportType === ReportType.Feature && "Моя идея в...") ||
              ""
            }
            fullWidth
            error={reportText.length > 2048 || reportText.length < 10}
            color={
              reportText.length > 2048 || reportText.length < 10
                ? "error"
                : undefined
            }
            helperText={
              reportText.length > 2048 || reportText.length < 10
                ? "Длина текста должна быть от 10 до 2048 символов"
                : undefined
            }
            multiline
            variant="outlined"
            name="reporttext"
            size="small"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
        </Stack>

        <LoadingButton
          onClick={() => {
            setDisabled(true);
            create({
              variables: {
                type: reportType,
                server: serverId,
                message: reportText,
              },
            });
          }}
          disabled={
            disabled ||
            reportText.length > 2048 ||
            reportText.length < 10 ||
            loading
          }
          color="primary"
          size="medium"
          variant="outlined"
          fullWidth
        >
          Отправить
        </LoadingButton>
      </Stack>
    </Paper>
  );
};

export default ReportForm;
