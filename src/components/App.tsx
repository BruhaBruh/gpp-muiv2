import { Container, Stack } from "@mui/material";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import AuthPage from "../pages/auth/AuthPage";
import ServerPage from "../pages/discord/ServerPage";
import ValidatePage from "../pages/discord/ValidatePage";
import InfoPage from "../pages/info/InfoPage";
import NewsPage from "../pages/news/NewsPage";
import Page404 from "../pages/Page404";
import ProfilePage from "../pages/profile/ProfilePage";
import ProfilesPage from "../pages/profile/ProfilesPage";
import ReportPage from "../pages/report/ReportPage";
import ServicesPage from "../pages/services/ServicesPage";
import BlacklistPage from "../pages/settings/BlacklistPage";
import InterfacePage from "../pages/settings/InterfacePage";
import SettingsPage from "../pages/settings/SettingsPage";
import ThemeCreatePage from "../pages/settings/ThemeCreatePage";
import ThemesPage from "../pages/settings/ThemesPage";
import ProductsPage from "../pages/shop/ProductsPage";
import Head from "./ui/Head";
import PageWrapper from "./ui/PageWrapper";
import Sidebar from "./ui/Sidebar/Sidebar";

function App() {
  const redirect = useAppSelector((state) => state.settings.redirect);
  const onServer = useAppSelector((state) => state.userData.onServer);
  const isValidated = useAppSelector((state) => state.userData.isValidated);
  const isLoggedIn = useAppSelector((state) => state.userData.isLoggedIn);
  const isLoading = useAppSelector((state) => state.userData.isLoading);

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{
        background: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        minHeight: "100vh",
        "*::selection": {
          background: (theme) => theme.palette.primary.dark,
        },
      }}
    >
      <Stack spacing={0} direction={"row"} sx={{ position: "relative" }}>
        <Sidebar />

        {!isLoading && (
          <>
            {!isLoggedIn && (
              <PageWrapper>
                <Head name="Авторизация" />
                <AuthPage />
              </PageWrapper>
            )}

            {!isValidated && !onServer && isLoggedIn && (
              <PageWrapper>
                <Head name="Вас нет на сервере" />
                <ServerPage />
              </PageWrapper>
            )}

            {!isValidated && onServer && isLoggedIn && (
              <PageWrapper>
                <Head name="Вы не подтвержденны" />
                <ValidatePage />
              </PageWrapper>
            )}

            {isValidated && onServer && isLoggedIn && (
              <Switch>
                <Route exact path="/profile/:id">
                  <Head name="" />
                  <PageWrapper>
                    <ProfilePage />
                  </PageWrapper>
                </Route>
                <Route exact path="/shop">
                  <Head name="Товары" />
                  <PageWrapper>
                    <ProductsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/services">
                  <Head name="Услуги" />
                  <PageWrapper>
                    <ServicesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/chats">
                  <Head name="Чаты" />
                  <PageWrapper>Чаты</PageWrapper>
                </Route>
                <Route exact path="/profiles">
                  <Head name="Все профили" />
                  <PageWrapper>
                    <ProfilesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/donate">
                  <Head name="Донат" />
                  <PageWrapper>Донат</PageWrapper>
                </Route>
                <Route exact path="/info">
                  <Head name="Информация" />
                  <PageWrapper>
                    <InfoPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/news/:id">
                  <PageWrapper>
                    <NewsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings">
                  <Head name="Настройки" />
                  <PageWrapper>
                    <SettingsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/blacklist">
                  <Head name="Чёрный список" />
                  <PageWrapper>
                    <BlacklistPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/themes">
                  <Head name="Внешний вид" />
                  <PageWrapper>
                    <ThemesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/themes/create">
                  <Head name="Создание темы" />
                  <PageWrapper>
                    <ThemeCreatePage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/interface">
                  <Head name="Настройка интерфейса" />
                  <PageWrapper>
                    <InterfacePage />
                  </PageWrapper>
                </Route>
                <Route exact path="/report">
                  <Head name="Репорт" />
                  <PageWrapper>
                    <ReportPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/">
                  <Redirect to={redirect} />
                </Route>
                <Route exact path="*">
                  <Head name="Ошибка 404" />
                  <PageWrapper>
                    <Page404 />
                  </PageWrapper>
                </Route>
              </Switch>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}

export default App;
