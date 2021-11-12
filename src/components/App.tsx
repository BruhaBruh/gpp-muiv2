import { gql, useMutation } from "@apollo/client";
import { Container, Stack } from "@mui/material";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import AuthPage from "../pages/auth/AuthPage";
import ServerPage from "../pages/discord/ServerPage";
import ValidatePage from "../pages/discord/ValidatePage";
import DonatePage from "../pages/donate/DonatePage";
import InfoPage from "../pages/info/InfoPage";
import NewsPage from "../pages/news/NewsPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import Page404 from "../pages/Page404";
import ProfilePage from "../pages/profile/ProfilePage";
import ProfilesPage from "../pages/profile/ProfilesPage";
import ReportPage from "../pages/report/ReportPage";
import ReportsPage from "../pages/report/ReportsPage";
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
  const profile = useAppSelector((state) => state.userData.profileId);
  const [updateOnline] = useMutation(gql`
    mutation updateOnline($id: ObjectID!) {
      updateLastOnline(id: $id) {
        lastOnline
      }
    }
  `);

  React.useEffect(() => {
    if (!profile) return;
    const i = setInterval(
      () =>
        updateOnline({
          variables: {
            id: profile,
          },
        }),
      15000
    );
    return () => clearInterval(i);
  }, [profile, updateOnline]);

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
                {/*<Route exact path="/chats">
                      <Head name="Чаты" />
                      <PageWrapper>
                        <ChatsPage />
                      </PageWrapper>
                    </Route>
                    <Route exact path="/chat/:id">
                      <Head name="Чат" />
                      <PageWrapper>
                        <ChatPage />
                      </PageWrapper>
                </Route>*/}
                <Route exact path="/profiles">
                  <Head name="Все профили" />
                  <PageWrapper>
                    <ProfilesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/donate">
                  <Head name="Донат" />
                  <PageWrapper>
                    <DonatePage />
                  </PageWrapper>
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
                <Route exact path="/notifications">
                  <Head name="Оповещения" />
                  <PageWrapper>
                    <NotificationsPage />
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
                  <Head name="Репорты" />
                  <PageWrapper>
                    <ReportsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/report/:id">
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
