import { ApolloProvider } from "@apollo/client";
import { createTheme, IconButton, ThemeProvider } from "@mui/material";
import {
  Icon20Check,
  Icon28CancelAltOutline,
  Icon28ErrorCircleOutline,
  Icon28InfoOutline,
  Icon28WarningTriangleOutline,
} from "@vkontakte/icons";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import IconWrapper from "./components/ui/IconWrapper";
import { useAppSelector } from "./hooks/redux";
import "./index.css";
import { client } from "./libs/apolloService";
import AuthLoader from "./loaders/AuthLoader";
import { store } from "./redux/store";
import { darkThemeOptions } from "./utils/theme";

const IndexWithProviders = () => {
  const themes = useAppSelector((state) => state.ui.themes);
  const themeIndex = useAppSelector((state) => state.ui.theme);
  const theme = React.useMemo(() => {
    if (themeIndex > themes.length - 1 || themeIndex < 0) {
      return createTheme(darkThemeOptions);
    }
    return createTheme(themes[themeIndex].theme);
  }, [themeIndex, themes]);
  const notistackRef = React.useRef<any>();
  const onClickDismiss = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  const h: any = useAppSelector(
    (state) => state.settings.horizontalSnackbarPosition
  );
  const v: any = useAppSelector(
    (state) => state.settings.verticalSnackbarPosition
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider
          ref={notistackRef}
          preventDuplicate
          anchorOrigin={{ horizontal: h, vertical: v }}
          dense
          action={(key) => (
            <IconButton size="small" onClick={onClickDismiss(key)}>
              <IconWrapper>
                <IconWrapper size={20}>
                  <Icon28CancelAltOutline />
                </IconWrapper>
              </IconWrapper>
            </IconButton>
          )}
          iconVariant={{
            success: (
              <IconWrapper
                size={20}
                sx={{ marginRight: (theme) => theme.spacing(1) }}
              >
                <Icon20Check />
              </IconWrapper>
            ),
            warning: (
              <IconWrapper
                size={20}
                sx={{ marginRight: (theme) => theme.spacing(1) }}
              >
                <Icon28WarningTriangleOutline />
              </IconWrapper>
            ),
            error: (
              <IconWrapper
                size={20}
                sx={{ marginRight: (theme) => theme.spacing(1) }}
              >
                <Icon28ErrorCircleOutline />
              </IconWrapper>
            ),
            info: (
              <IconWrapper
                size={20}
                sx={{ marginRight: (theme) => theme.spacing(1) }}
              >
                <Icon28InfoOutline />
              </IconWrapper>
            ),
          }}
        >
          <AuthLoader />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider
      client={client(window.location.host, window.location.protocol)}
    >
      <IndexWithProviders />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
