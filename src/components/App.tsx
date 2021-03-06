import { Container, LinearProgress, Stack } from "@mui/material";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ReportSubType, ReportType } from "../graphql/types";
import { useAppSelector } from "../hooks/redux";
import AuthPage from "../pages/auth/AuthPage";
import DonatesHistory from "../pages/donates/DonatesHistory";
import DonatesPage from "../pages/donates/DonatesPage";
import ForumPage from "../pages/forum/ForumPage";
import IndexPage from "../pages/forum/IndexPage";
import ThreadPage from "../pages/forum/ThreadPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import Page404 from "../pages/Page404";
import RatingsPage from "../pages/ratings/RatingsPage";
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
import StatisticsPage from "../pages/statistics/StatisticsPage";
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
                  <Head name="??????????????" />
                  <UserPage />
                </Route>
                <Route exact path="/u">
                  <Head name="??????????????" />
                  <UsersPage />
                </Route>
                <Route exact path="/r">
                  <Head name="??????????????" />
                  <ReportsPage />
                </Route>
                <Route exact path="/ratings">
                  <Head name="????????????????" showBack />
                  <RatingsPage />
                </Route>
                <Route exact path="/r/c">
                  <Head name="????????????" showBack /> {/* ??? */}
                  <ComplaintPage />
                </Route>
                <Route exact path="/r/c/admin">
                  <Head name="???????????? ???? ????????????????" showBack /> {/* ??? */}
                  <CreateReportPage
                    type={ReportType.Report}
                    subtype={ReportSubType.Admin}
                  />
                </Route>
                <Route exact path="/r/c/user">
                  <Head name="???????????? ???? ????????????" showBack /> {/* ??? */}
                  <CreateReportPage
                    type={ReportType.Report}
                    subtype={ReportSubType.User}
                  />
                </Route>
                <Route exact path="/r/b">
                  <Head name="??????" showBack /> {/* ??? */}
                  <BugPage />
                </Route>
                <Route exact path="/r/b/server">
                  <Head name="?????? ??????????????" showBack /> {/* ??? */}
                  <CreateReportPage
                    type={ReportType.Bug}
                    subtype={ReportSubType.Server}
                  />
                </Route>
                <Route exact path="/r/b/site">
                  <Head name="?????? ??????????" showBack /> {/* ??? */}
                  <CreateReportPage
                    type={ReportType.Bug}
                    subtype={ReportSubType.Site}
                  />
                </Route>
                <Route exact path="/r/f">
                  <Head name="??????????????????????" showBack /> {/* ??? */}
                  <FeaturePage />
                </Route>
                <Route exact path="/r/f/server">
                  <Head name="?????????????????????? ?????? ??????????????" showBack /> {/* ??? */}
                  <CreateReportPage
                    type={ReportType.Feature}
                    subtype={ReportSubType.Server}
                  />
                </Route>
                <Route exact path="/r/f/site">
                  <Head name="?????????????????????? ?????? ??????????" showBack /> {/* ??? */}
                  <CreateReportPage
                    type={ReportType.Feature}
                    subtype={ReportSubType.Site}
                  />
                </Route>
                <Route exact path="/r/:id">
                  <Head name="????????????" showBack />
                  <ReportPage />
                </Route>
                <Route exact path="/n">
                  <Head name="????????????????????" />
                  <NotificationsPage />
                </Route>
                <Route exact path="/d">
                  <Head name="??????????" />
                  <DonatesPage />
                </Route>
                <Route exact path="/d/h">
                  <Head name="?????????????? ????????????????????" showBack />
                  <DonatesHistory />
                </Route>
                <Route exact path="/f">
                  <Head name="?????????? ??? ??????????????" />
                  <IndexPage />
                </Route>
                <Route exact path="/f/:id">
                  <Head name="??????????" />
                  <ForumPage />
                </Route>
                <Route exact path="/th/:id">
                  <Head name="????????" showBack />
                  <ThreadPage />
                </Route>
                <Route exact path="/t">
                  <Head name="????????" />
                  <TopsPage />
                </Route>
                <Route exact path="/s">
                  <Head name="????????????????????" />
                  <StatisticsPage />
                </Route>
                <Route exact path="/settings">
                  <Head name="??????????????????" />
                  <SettingsPage />
                </Route>
                <Route exact path="/settings/themes">
                  <Head name="?????????????? ??????" showBack />
                  <ThemesPage />
                </Route>
                <Route exact path="/settings/themes/create">
                  <Head name="???????????????? ????????" showBack />
                  <ThemeCreatePage />
                </Route>
                <Route exact path="/settings/interface">
                  <Head name="?????????????????? ????????????????????" showBack />
                  <InterfacePage />
                </Route>
                <Route exact path="/settings/notification">
                  <Head name="?????????????????? Discord ??????????????????????" showBack />
                  <NotificationPage />
                </Route>
                <Route exact path="/">
                  <Redirect to={redirect} />
                </Route>
                <Route exact path="*">
                  <Head name="???????????? 404" />
                  <Page404 />
                </Route>
              </Switch>
            ) : (
              <>???? ???? ???????????????????????????????? ???? ?????????????? Minecraft {/* TODO page */}</>
            )
          ) : (
            <>
              <Head name="??????????????????????" />
              <AuthPage />
            </>
          )}
        </PageWrapper>
        {/*!isLoading && (
          <>
            {!isLoggedIn && (
              <PageWrapper>
                <Head name="??????????????????????" />
                <AuthPage />
              </PageWrapper>
            )}

            {!isValidated && !onServer && isLoggedIn && (
              <PageWrapper>
                <Head name="?????? ?????? ???? ??????????????" />
                <ServerPage />
              </PageWrapper>
            )}

            {!isValidated && onServer && isLoggedIn && (
              <PageWrapper>
                <Head name="???? ???? ??????????????????????????" />
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
                  <Head name="????????????" />
                  <PageWrapper>
                    <ProductsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/services">
                  <Head name="????????????" />
                  <PageWrapper>
                    <ServicesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/profiles">
                  <Head name="?????? ??????????????" />
                  <PageWrapper>
                    <ProfilesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/tops">
                  <Head name="?????? ????????????????" />
                  <PageWrapper>
                    <TopsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/donate">
                  <Head name="??????????" />
                  <PageWrapper>
                    <DonatePage />
                  </PageWrapper>
                </Route>
                <Route exact path="/info">
                  <Head name="????????????????????" />
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
                  <Head name="????????????????????" />
                  <PageWrapper>
                    <NotificationsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings">
                  <Head name="??????????????????" />
                  <PageWrapper>
                    <SettingsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/blacklist">
                  <Head name="???????????? ????????????" />
                  <PageWrapper>
                    <BlacklistPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/themes">
                  <Head name="?????????????? ??????" />
                  <PageWrapper>
                    <ThemesPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/themes/create">
                  <Head name="???????????????? ????????" />
                  <PageWrapper>
                    <ThemeCreatePage />
                  </PageWrapper>
                </Route>
                <Route exact path="/settings/interface">
                  <Head name="?????????????????? ????????????????????" />
                  <PageWrapper>
                    <InterfacePage />
                  </PageWrapper>
                </Route>
                <Route exact path="/report">
                  <Head name="??????????????" />
                  <PageWrapper>
                    <ReportsPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/report/:id">
                  <Head name="????????????" />
                  <PageWrapper>
                    <ReportPage />
                  </PageWrapper>
                </Route>
                <Route exact path="/">
                  <Redirect to={redirect} />
                </Route>
                <Route exact path="*">
                  <Head name="???????????? 404" />
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
