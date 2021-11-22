import {
  Box,
  Button,
  createTheme,
  ListItemText,
  Paper,
  Radio,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon24Add, Icon24Back, Icon28DeleteOutline } from "@vkontakte/icons";
import React from "react";
import ButtonR from "../../components/ui/ButtonR";
import CellR from "../../components/ui/CellR";
import IconWrapper from "../../components/ui/IconWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeCustomTheme,
  setSidebarHeader,
  setTheme,
} from "../../redux/ui/reducer";
import { darkThemeOptions } from "../../utils/theme";

const ThemesPage = () => {
  const themes = useAppSelector((state) => state.ui.themes);
  const themeIndex = useAppSelector((state) => state.ui.theme);
  const theme = React.useMemo(() => {
    if (themeIndex > themes.length - 1 || themeIndex < 0) {
      return createTheme(darkThemeOptions);
    }
    return createTheme(themes[themeIndex].theme);
  }, [themeIndex, themes]);
  const lower = useMediaQuery("(max-width: 1200px)");
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      setSidebarHeader(
        <CellR
          to="/settings"
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
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Палитра
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: lower ? "repeat(4, 1fr)" : "repeat(6, 1fr)",
              gridTemplateAreas: lower
                ? `"m m p p" "l d b t"`
                : `"l m d b p t"`,
              gridTemplateRows: lower ? "1fr 1fr" : undefined,
            }}
          >
            <Button
              color="inherit"
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: 0,
                padding: 0,
                position: "relative",
                gridArea: "l",
                minWidth: "auto",
                background: (theme) => theme.palette.primary.light,
                "&:hover": {
                  background: (theme) => theme.palette.primary.light,
                },
              }}
            >
              <ListItemText
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  maxWidth: "100%",
                  margin: 0,
                  marginTop: (theme) => theme.spacing(1),
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.primary.light),
                }}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      fontSize: "0.75rem !important",
                    }}
                  >
                    light
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "left", fontSize: "0.75rem !important" }}
                  >
                    {theme.palette.primary.light}
                  </Typography>
                }
              />
            </Button>
            <Button
              color="inherit"
              sx={{
                aspectRatio: lower ? "2 / 1" : "1 / 1",
                borderRadius: 0,
                padding: 0,
                position: "relative",
                gridArea: "m",
                minWidth: "auto",
                background: (theme) => theme.palette.primary.main,
                "&:hover": {
                  background: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <ListItemText
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  maxWidth: "100%",
                  margin: 0,
                  marginTop: (theme) => theme.spacing(1),
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.primary.main),
                }}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      fontSize: "0.75rem !important",
                    }}
                  >
                    main
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "left", fontSize: "0.75rem !important" }}
                  >
                    {theme.palette.primary.main}
                  </Typography>
                }
              />
              <Box
                sx={{
                  borderRadius: "999px",
                  background: (theme) => theme.palette.background.default,
                  padding: (theme) => theme.spacing(1),
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: (theme) => theme.spacing(2),
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                P
              </Box>
            </Button>
            <Button
              color="inherit"
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: 0,
                padding: 0,
                position: "relative",
                gridArea: "d",
                minWidth: "auto",
                background: (theme) => theme.palette.primary.dark,
                "&:hover": {
                  background: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <ListItemText
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  maxWidth: "100%",
                  margin: 0,
                  marginTop: (theme) => theme.spacing(1),
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.primary.dark),
                }}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      fontSize: "0.75rem !important",
                    }}
                  >
                    dark
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "left", fontSize: "0.75rem !important" }}
                  >
                    {theme.palette.primary.dark}
                  </Typography>
                }
              />
            </Button>
            <Button
              color="inherit"
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: 0,
                padding: 0,
                position: "relative",
                gridArea: "b",
                minWidth: "auto",
                background: (theme) => theme.palette.background.default,
                "&:hover": {
                  background: (theme) => theme.palette.background.default,
                },
              }}
            >
              <ListItemText
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  maxWidth: "100%",
                  margin: 0,
                  marginTop: (theme) => theme.spacing(1),
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.default
                    ),
                }}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      fontSize: "0.75rem !important",
                    }}
                  >
                    default
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "left", fontSize: "0.75rem !important" }}
                  >
                    {theme.palette.background.default}
                  </Typography>
                }
              />
            </Button>
            <Button
              color="inherit"
              sx={{
                aspectRatio: lower ? "2 / 1" : "1 / 1",
                borderRadius: 0,
                padding: 0,
                position: "relative",
                gridArea: "p",
                minWidth: "auto",
                background: (theme) => theme.palette.background.paper,
                "&:hover": {
                  background: (theme) => theme.palette.background.paper,
                },
              }}
            >
              <ListItemText
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  maxWidth: "100%",
                  margin: 0,
                  marginTop: (theme) => theme.spacing(1),
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                }}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      fontSize: "0.75rem !important",
                    }}
                  >
                    paper
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "left", fontSize: "0.75rem !important" }}
                  >
                    {theme.palette.background.paper}
                  </Typography>
                }
              />
            </Button>
            <Button
              color="inherit"
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: 0,
                padding: 0,
                position: "relative",
                gridArea: "t",
                minWidth: "auto",
                background: (theme) => theme.palette.text.primary,
                "&:hover": {
                  background: (theme) => theme.palette.text.primary,
                },
              }}
            >
              <ListItemText
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  maxWidth: "100%",
                  margin: 0,
                  marginTop: (theme) => theme.spacing(1),
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.text.primary),
                }}
                primary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      fontSize: "0.75rem !important",
                    }}
                  >
                    text
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "left", fontSize: "0.75rem !important" }}
                  >
                    {theme.palette.text.primary}
                  </Typography>
                }
              />
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
          alignSelf: "stretch",
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Темы
          </Typography>
          <Box
            sx={{ alignSelf: "stretch", overflowX: "scroll" }}
            className="hide-scrollbar"
          >
            <Stack spacing={2} direction="row" sx={{ width: "max-content" }}>
              {themes
                .map((t) => ({ name: t.name, theme: createTheme(t.theme) }))
                .map((t, i) => (
                  <Stack spacing={1}>
                    <Button
                      color="inherit"
                      sx={{
                        overflow: "hidden",
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        padding: 0,
                        width: "max-content",
                        margin: "0 auto",
                      }}
                      onClick={() => dispatch(setTheme(i))}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gridTemplateRows: "1fr 1fr",
                        }}
                      >
                        <Box
                          sx={{
                            background: t.theme.palette.primary.main,
                            aspectRatio: "3 / 4",
                            width: "48px",
                          }}
                        />
                        <Box
                          sx={{
                            background: t.theme.palette.background.default,
                            aspectRatio: "3 / 4",
                          }}
                        />
                        <Box
                          sx={{
                            gridColumn: "1 / -1",
                            background: t.theme.palette.background.paper,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          children={
                            <Radio
                              checked={i === themeIndex}
                              sx={{
                                color: (theme) =>
                                  theme.palette.getContrastText(
                                    t.theme.palette.background.paper
                                  ),
                              }}
                            />
                          }
                        />
                      </Box>
                    </Button>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {t.name}
                      {i > 3 && (
                        <IconWrapper
                          size={20}
                          sx={{
                            color: (theme) => theme.palette.error.main,
                            cursor: "pointer",
                            marginLeft: (theme) => theme.spacing(1),
                          }}
                          onClick={() => dispatch(removeCustomTheme(t.name))}
                        >
                          <Icon28DeleteOutline />
                        </IconWrapper>
                      )}
                    </Typography>
                  </Stack>
                ))}
              <Stack spacing={1}>
                <ButtonR
                  to="/settings/themes/create"
                  color="inherit"
                  sx={{
                    overflow: "hidden",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    width: "96px",
                  }}
                >
                  <IconWrapper size={24}>
                    <Icon24Add />
                  </IconWrapper>
                </ButtonR>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Создать
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ThemesPage;
