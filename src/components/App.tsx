import { Container, LinearProgress, Stack } from "@mui/material";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ReportSubType, ReportType } from "../graphql/types";
import { useAppSelector } from "../hooks/redux";
import AuthPage from "../pages/auth/AuthPage";
import DonatesPage from "../pages/donates/DonatesPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import Page404 from "../pages/Page404";
import BugPage from "../pages/reports/BugPage";
import ComplaintPage from "../pages/reports/ComplaintPage";
import CreateReportPage from "../pages/reports/CreateReportPage";
import FeaturePage from "../pages/reports/FeaturePage";
import ReportPage from "../pages/reports/ReportPage";
import ReportsPage from "../pages/reports/ReportsPage";
import InterfacePage from "../pages/settings/InterfacePage";
import NotificationPage from "../pages/settings/NotificationPage";
import SettingsPage from "../pages/settings/SettingsPage";
import ThemeCreatePage from "../pages/settings/ThemeCreatePage";
import ThemesPage from "../pages/settings/ThemesPage";
import TopsPage from "../pages/tops/TopsPage";
import UserPage from "../pages/user/UserPage";
import UsersPage from "../pages/user/UsersPage";
import Head from "./ui/Head";
import PageWrapper from "./ui/PageWrapper";
import Sidebar from "./ui/Sidebar/Sidebar";

function App() {
  const isLoggedIn = useAppSelector((state) => state.userData.isLoggedIn);
  const isLoading = useAppSelector((state) => state.userData.isLoading);
  const isAuthenticated = useAppSelector(
    (state) => state.userData.isAuthenticated
  );
  const redirect = useAppSelector((state) => state.settings.redirect);

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
        <PageWrapper>
          {isLoading ? (
            <LinearProgress />
          ) : isAuthenticated ? (
            isLoggedIn ? (
              <Switch>
                <Route exact path="/u/:id">
                  <Head name="Профиль" />
                  <UserPage />
                </Route>
                <Route exact path="/u">
                  <Head name="Профили" />
                  <UsersPage />
                </Route>
                <Route exact path="/r">
                  <Head name="Репорты" />
                  <ReportsPage />
                </Route>
                <Route exact path="/r/c">
                  <Head name="Жалоба" /> {/* › */}
                  <ComplaintPage />
                </Route>
                <Route exact path="/r/c/admin">
                  <Head name="Жалоба на Персонал" /> {/* › */}
                  <CreateReportPage
                    type={ReportType.Report}
                    subtype={ReportSubType.Admin}
                  />
                </Route>
                <Route exact path="/r/c/user">
                  <Head name="Жалоба на Игрока" /> {/* › */}
                  <CreateReportPage
                    type={ReportType.Report}
                    subtype={ReportSubType.User}
                  />
                </Route>
                <Route exact path="/r/b">
                  <Head name="Баг" /> {/* › */}
                  <BugPage />
                </Route>
                <Route exact path="/r/b/server">
                  <Head name="Баг сервера" /> {/* › */}
                  <CreateReportPage
                    type={ReportType.Bug}
                    subtype={ReportSubType.Server}
                  />
                </Route>
                <Route exact path="/r/b/site">
                  <Head name="Баг сайта" /> {/* › */}
                  <CreateReportPage
                    type={ReportType.Bug}
                    subtype={ReportSubType.Site}
                  />
                </Route>
                <Route exact path="/r/f">
                  <Head name="Предложение" /> {/* › */}
                  <FeaturePage />
                </Route>
                <Route exact path="/r/f/server">
                  <Head name="Предложение для сервера" /> {/* › */}
                  <CreateReportPage
                    type={ReportType.Feature}
                    subtype={ReportSubType.Server}
                  />
                </Route>
                <Route exact path="/r/f/site">
                  <Head name="Предложение для сайта" /> {/* › */}
                  <CreateReportPage
                    type={ReportType.Feature}
                    subtype={ReportSubType.Site}
                  />
                </Route>
                <Route exact path="/r/:id">
                  <Head name="Репорт" />
                  <ReportPage />
                </Route>
                <Route exact path="/n">
                  <Head name="Оповещения" />
                  <NotificationsPage />
                </Route>
                <Route exact path="/d">
                  <Head name="Донат" />
                  <DonatesPage />
                </Route>
                <Route exact path="/t">
                  <Head name="Топы" />
                  <TopsPage />
                </Route>
                <Route exact path="/settings">
                  <Head name="Настройки" />
                  <SettingsPage />
                </Route>
                <Route exact path="/settings/themes">
                  <Head name="Внешний вид" />
                  <ThemesPage />
                </Route>
                <Route exact path="/settings/themes/create">
                  <Head name="Создание темы" />
                  <ThemeCreatePage />
                </Route>
                <Route exact path="/settings/interface">
                  <Head name="Настройка интерфейса" />
                  <InterfacePage />
                </Route>
                <Route exact path="/settings/notification">
                  <Head name="Настройки Discord уведомлений" />
                  <NotificationPage />
                </Route>
                <Route exact path="/">
                  <Redirect to={redirect} />
                </Route>
                <Route exact path="*">
                  <Head name="Ошибка 404" />
                  <Page404 />
                </Route>
              </Switch>
            ) : (
              <>Вы не зарегистрированы на сервере Minecraft {/* TODO page */}</>
            )
          ) : (
            <>
              <Head name="Авторизация" />
              <AuthPage />
            </>
          )}
        </PageWrapper>
        {/*!isLoading && (
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
                <Route exact path="/profiles">
                  <Head name="Все профили" />
                  <PageWrapper>
                    <ProfilesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/tops">
                  <Head name="Топ профилей" />
                  <PageWrapper>
                    <TopsPage />
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
        )*/}
      </Stack>
    </Container>
  );
}

export default App;
