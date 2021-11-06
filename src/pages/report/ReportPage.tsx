import { LoadingButton } from "@mui/lab";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import StyledTab from "../../components/ui/StyledTab";
import StyledTabs from "../../components/ui/StyledTabs";

const ReportPage = () => {
  const [reportType, setReportType] = React.useState<
    "BUG" | "REPORT" | "FEATURE"
  >("BUG");
  const [reportText, setReportText] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
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
              <StyledTab label="Баг" value="BUG" />
              <StyledTab label="Жалоба" value="REPORT" />
              <StyledTab label="Предложение" value="FEATURE" />
            </StyledTabs>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Описание</Typography>
            {reportType === "BUG" && (
              <Typography variant="body1">
                Опишите суть бага. Как вы его получили, по шагам, если это
                возможно. Так же желательно прикрепить скриншоты или видео в
                виде ссылок. Разбираются только баги
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
            {reportType === "REPORT" && (
              <Typography variant="body1">
                Обязательно укажите на кого вы подаете жалобу, желательно id
                дискорд аккаунта, либо Mojang ник. Внятно объясните ситуацию.
                Предоставте доказательства в виде скриншотов или видео. Imgur
                или YouTube. Жалобы подаются на пользователей
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
            {reportType === "FEATURE" && (
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
              {reportType === "BUG" &&
                `Вы получите вознаграждение при обнаружении бага.`}
              {reportType === "REPORT" &&
                `При неуважительном отношении к проверяющим, вас проигнорируют`}
              {reportType === "FEATURE" &&
                `При согласии с вашим предложением вы получите вознаграждение.`}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Сообщение</Typography>
            <TextField
              placeholder={
                (reportType === "BUG" && "Я получил баг...") ||
                (reportType === "REPORT" && "Я подаю жалобу на...") ||
                (reportType === "FEATURE" && "Моя идея в...") ||
                ""
              }
              fullWidth
              error={reportText.length > 4096 || reportText.length < 10}
              color={
                reportText.length > 4096 || reportText.length < 10
                  ? "error"
                  : undefined
              }
              helperText={
                reportText.length > 4096 || reportText.length < 10
                  ? "Длина текста должна быть от 10 до 4096 символов"
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
            }}
            disabled={
              disabled || reportText.length > 4096 || reportText.length < 10
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
    </Stack>
  );
};

export default ReportPage;
