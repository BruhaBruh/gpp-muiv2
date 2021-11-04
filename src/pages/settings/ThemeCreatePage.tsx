import {
  Alert,
  Box,
  Button,
  createTheme,
  FormControlLabel,
  ListItemText,
  Palette,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Icon16Pen, Icon24Back } from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { HexColorPicker } from "react-colorful";
import CellR from "../../components/ui/CellR";
import Drawer from "../../components/ui/Drawer";
import IconWrapper from "../../components/ui/IconWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addCustomTheme, setSidebarHeader } from "../../redux/ui/reducer";
import { darkThemeOptions, lightThemeOptions } from "../../utils/theme";

type EditType = "light" | "main" | "dark" | "default" | "paper" | "text";

interface EditColors {
  light: string;
  main: string;
  dark: string;
  default: string;
  paper: string;
  text: string;
}

const ThemeCreatePage = () => {
  const dispatch = useAppDispatch();
  const [isDarkType, setIsDarkType] = React.useState(true);
  const [themeEdit, setThemeEdit] = React.useState(darkThemeOptions);
  const { enqueueSnackbar } = useSnackbar();
  const themeNames = useAppSelector((state) =>
    state.ui.themes.map((t) => t.name)
  );
  const [colors, setColors] = React.useState<EditColors>({
    light: "",
    main: "",
    dark: "",
    default: "",
    paper: "",
    text: "",
  });
  const [name, setName] = React.useState("");
  const t = React.useMemo(() => {
    if (
      JSON.stringify(colors) ===
      JSON.stringify({
        light: "",
        main: "",
        dark: "",
        default: "",
        paper: "",
        text: "",
      })
    ) {
      return createTheme(themeEdit);
    } else {
      return createTheme({
        ...themeEdit,
        palette: {
          ...themeEdit.palette,
          primary: {
            light: colors.light,
            main: colors.main,
            dark: colors.dark,
          },
          background: {
            paper: colors.paper,
            default: colors.default,
          },
        },
      });
    }
  }, [themeEdit, colors]);
  const [editType, setEditType] = React.useState<EditType | undefined>();
  const [color, setColor] = React.useState("");

  React.useEffect(() => {
    if (isDarkType) {
      setThemeEdit(darkThemeOptions);
    } else {
      setThemeEdit(lightThemeOptions);
    }
  }, [isDarkType]);

  React.useEffect(() => {
    setColors({
      light: (themeEdit.palette as Palette).primary.light,
      main: (themeEdit.palette as Palette).primary.main,
      dark: (themeEdit.palette as Palette).primary.dark,
      default: (themeEdit.palette as Palette).background.default,
      paper: (themeEdit.palette as Palette).background.paper,
      text: (themeEdit.palette as Palette).text.primary,
    });
  }, [themeEdit]);

  React.useEffect(() => {
    dispatch(
      setSidebarHeader(
        <CellR
          to="/settings/themes"
          onClick={() => dispatch(setSidebarHeader(null))}
          sx={{ height: "100%" }}
          startIcon={
            <IconWrapper
              component="span"
              size={20}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24Back />
            </IconWrapper>
          }
        >
          Назад
        </CellR>
      )
    );
  }, [dispatch]);

  React.useEffect(() => {
    if (!!color || !editType) return;
    switch (editType) {
      case "light":
        return setColor(colors.light);
      case "main":
        return setColor(colors.main);
      case "dark":
        return setColor(colors.dark);
      case "default":
        return setColor(colors.default);
      case "paper":
        return setColor(colors.paper);
      case "text":
        return setColor(colors.text);
      default:
        return undefined;
    }
  }, [color, editType, colors]);

  const saveColor = () => {
    switch (editType) {
      case "light":
        return setColors((prev) => ({ ...prev, light: color }));
      case "main":
        return setColors((prev) => ({ ...prev, main: color }));
      case "dark":
        return setColors((prev) => ({ ...prev, dark: color }));
      case "default":
        return setColors((prev) => ({ ...prev, default: color }));
      case "paper":
        return setColors((prev) => ({ ...prev, paper: color }));
      case "text":
        return setColors((prev) => ({ ...prev, text: color }));
      default:
        return;
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <Drawer open={editType !== undefined}>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Выбор цвета
          </Typography>
          <Stack spacing={1} direction="row" alignItems="center">
            <Box
              sx={{
                height: "32px",
                minWidth: "32px",
                width: "32px",
                borderRadius: "32px",
                background: color,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            />
            <TextField
              fullWidth
              size="small"
              value={color}
              onChange={(e) => setColor(e.currentTarget.value)}
            />
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.text.disabled }}
            >
              <Icon16Pen />
            </IconWrapper>
          </Stack>
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{ width: "100%" }}
          />
          <Stack spacing={2} direction={"row"}>
            <Button
              onClick={() => {
                setEditType(undefined);
                setColor("");
              }}
              size="large"
              color="inherit"
              variant="text"
              fullWidth
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                saveColor();
                setEditType(undefined);
                setColor("");
              }}
              size="large"
              color="primary"
              variant="outlined"
              fullWidth
            >
              Сохранить
            </Button>
          </Stack>
        </Stack>
      </Drawer>
      <Alert severity="info">
        Чтобы поменять цвет в теме, нажмите на его поле, а затем выберите нужный
        цвет.
      </Alert>
      <Paper
        sx={{
          overflow: "hidden",
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textTransform: "uppercase",
            }}
          >
            Предпросмотр
          </Typography>
          <ThemeProvider theme={t}>
            <Paper
              sx={{
                background: (theme) => theme.palette.background.default,
                padding: (theme) => theme.spacing(2),
              }}
            >
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: (theme) => theme.spacing(2),
                  }}
                >
                  <Paper sx={{ height: "128px" }} />
                  <Paper sx={{ height: "128px" }} elevation={1} />
                  <Paper sx={{ height: "128px" }} elevation={2} />
                </Box>
                <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
                  <Button size="medium" color="primary" variant="contained">
                    Кнопка
                  </Button>
                  <Button size="medium" color="primary" variant="outlined">
                    Кнопка
                  </Button>
                  <Button size="medium" color="primary" variant="text">
                    Кнопка
                  </Button>
                </Stack>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ color: (theme) => theme.palette.text.primary }}
                    >
                      У этого текста цвет text.primary
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body1"
                      sx={{ color: (theme) => theme.palette.text.secondary }}
                    >
                      А у этого - text.secondary
                    </Typography>
                  }
                />
              </Stack>
            </Paper>
          </ThemeProvider>
        </Stack>
      </Paper>
      <Paper
        sx={{
          overflow: "hidden",
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              textTransform: "uppercase",
            }}
          >
            Палитра
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">Тип темы</Typography>
            <RadioGroup
              aria-label="theme type"
              value={isDarkType}
              onChange={(_, v) => setIsDarkType(v === "true")}
              name="theme-type-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Темная"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Светлая"
              />
            </RadioGroup>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Акцент</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: (theme) => theme.spacing(2),
              }}
            >
              <Button
                color="inherit"
                size="medium"
                variant="text"
                sx={{ justifyContent: "start" }}
                onClick={() => setEditType("light")}
              >
                <Stack spacing={1} direction="row">
                  <Box
                    sx={{
                      borderRadius: (theme) => theme.spacing(1),
                      background: colors.light,
                      aspectRatio: "1 / 1",
                      height: "48px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        primary.light
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {colors.light}
                      </Typography>
                    }
                  />
                </Stack>
              </Button>
              <Button
                color="inherit"
                size="medium"
                variant="text"
                sx={{ justifyContent: "start" }}
                onClick={() => setEditType("main")}
              >
                <Stack spacing={1} direction="row">
                  <Box
                    sx={{
                      borderRadius: (theme) => theme.spacing(1),
                      background: colors.main,
                      aspectRatio: "1 / 1",
                      height: "48px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        primary.main
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {colors.main}
                      </Typography>
                    }
                  />
                </Stack>
              </Button>
              <Button
                color="inherit"
                size="medium"
                variant="text"
                sx={{ justifyContent: "start" }}
                onClick={() => setEditType("dark")}
              >
                <Stack spacing={1} direction="row">
                  <Box
                    sx={{
                      borderRadius: (theme) => theme.spacing(1),
                      background: colors.dark,
                      aspectRatio: "1 / 1",
                      height: "48px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        primary.dark
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {colors.dark}
                      </Typography>
                    }
                  />
                </Stack>
              </Button>
            </Box>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Поверхности</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: (theme) => theme.spacing(2),
              }}
            >
              <Button
                color="inherit"
                size="medium"
                variant="text"
                sx={{ justifyContent: "start" }}
                onClick={() => setEditType("paper")}
              >
                <Stack spacing={1} direction="row">
                  <Box
                    sx={{
                      borderRadius: (theme) => theme.spacing(1),
                      background: colors.paper,
                      aspectRatio: "1 / 1",
                      height: "48px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        background.paper
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {colors.paper}
                      </Typography>
                    }
                  />
                </Stack>
              </Button>
              <Button
                color="inherit"
                size="medium"
                variant="text"
                sx={{ justifyContent: "start" }}
                onClick={() => setEditType("default")}
              >
                <Stack spacing={1} direction="row">
                  <Box
                    sx={{
                      borderRadius: (theme) => theme.spacing(1),
                      background: colors.default,
                      aspectRatio: "1 / 1",
                      height: "48px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        background.default
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {colors.default}
                      </Typography>
                    }
                  />
                </Stack>
              </Button>
            </Box>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Текст</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: (theme) => theme.spacing(2),
              }}
            >
              <Button
                color="inherit"
                size="medium"
                variant="text"
                sx={{ justifyContent: "start" }}
                onClick={() => setEditType("text")}
              >
                <Stack spacing={1} direction="row">
                  <Box
                    sx={{
                      borderRadius: (theme) => theme.spacing(1),
                      background: colors.text,
                      aspectRatio: "1 / 1",
                      height: "48px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        text.primary
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {colors.text}
                      </Typography>
                    }
                  />
                </Stack>
              </Button>
            </Box>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">Название</Typography>

            <TextField
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              fullWidth
              size="small"
            />
            <Button
              disabled={!name || themeNames.includes(name)}
              onClick={() => {
                dispatch(
                  addCustomTheme({
                    name: name,
                    theme: {
                      ...themeEdit,
                      palette: {
                        ...themeEdit.palette,
                        primary: {
                          light: colors.light,
                          main: colors.main,
                          dark: colors.dark,
                        },
                        background: {
                          paper: colors.paper,
                          default: colors.default,
                        },
                      },
                    },
                  })
                );
                setName("");
                setIsDarkType((prev) => !prev);
                enqueueSnackbar("Успешно!", { variant: "success" });
              }}
              fullWidth
              size="large"
              color="primary"
              variant="outlined"
            >
              Создать
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ThemeCreatePage;
