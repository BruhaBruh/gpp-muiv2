import {
  Box,
  Fab,
  Paper,
  PaperProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon24Back, Icon28Menu } from "@vkontakte/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import ButtonR from "../ButtonR";
import Cell from "../Cell";
import Drawer from "../Drawer";
import IconWrapper from "../IconWrapper";
import SidebarMenu from "./SidebarMenu";

const Sidebar: React.FC<PaperProps> = ({ children, sx, ...props }) => {
  const sidebarHeader = useAppSelector((state) => state.ui.sidebarHeader);
  const hide = useMediaQuery("(max-width: 900px)");
  const [showDrawer, setShowDrawer] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setShowDrawer(open);
    };
  const history = useHistory();

  return hide ? (
    <>
      <Drawer
        open={showDrawer}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <SidebarMenu showBack setShow={setShowDrawer} />
      </Drawer>
      <Fab
        size="medium"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
          zIndex: 1000,
        }}
        onClick={() => setShowDrawer(true)}
      >
        <Icon28Menu />
      </Fab>
    </>
  ) : (
    <Paper
      {...props}
      sx={{
        ...sx,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "64px 1fr",
        minHeight: "100vh",
        borderRadius: 0,
        paddingLeft: (theme) => theme.spacing(2),
        paddingRight: (theme) => theme.spacing(2),
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          paddingTop: (theme) => theme.spacing(1),
          paddingBottom: (theme) => theme.spacing(1),
        }}
      >
        {sidebarHeader ? (
          <Cell
            onClick={() => history.goBack()}
            sx={{ height: "100%" }}
            fullWidth
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
            ??????????
          </Cell>
        ) : (
          <ButtonR color="inherit" to="/" fullWidth sx={{ height: "100%" }}>
            <Box
              sx={{
                color: (theme) => theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="28"
                height="32"
                viewBox="0 0 46 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.2979 20.4468C41.1546 19.3248 39.8801 18.4869 38.4673 17.9478C37.324 17.5106 36.0932 17.2556 34.7824 17.1974H33.9691L17.6746 17.1974V50.8576H24.3089V39.7978L33.9764 39.7978C37.3677 39.7833 40.0913 38.6904 42.2979 36.512C44.5045 34.3335 45.6114 31.6523 45.6114 28.483C45.6114 25.3137 44.5045 22.6253 42.2979 20.4468ZM37.6371 32.1113C36.705 33.0876 35.5325 33.5758 33.9764 33.5904L24.3089 33.5904V23.077C24.3089 23.077 32.7142 23.0624 34.127 23.0624C35.5398 23.0624 36.705 23.5433 37.6371 24.505C37.71 24.5779 37.7755 24.658 37.841 24.7381C38.6348 25.7071 39.0281 27.1133 39.0281 28.4757C39.0281 29.9256 38.562 31.1351 37.6371 32.1113Z"
                  fill="#1AE386"
                />
                <path
                  fill="currentColor"
                  d="M34.5626 17.2046H17.6891V23.0697H27.8845C27.2801 25.0587 26.1295 26.6179 24.4472 27.7544C24.3963 27.7836 24.3526 27.82 24.3089 27.8419C22.6485 28.9202 20.573 29.4593 18.0824 29.4593C17.944 29.4593 17.8129 29.4593 17.6818 29.452C14.4047 29.3792 11.7612 28.3446 9.74394 26.3556C7.64659 24.2864 6.59063 21.6635 6.59063 18.4942C6.59063 15.2885 7.62474 12.6365 9.69296 10.5309C11.7612 8.43257 14.3974 7.38342 17.6017 7.38342C19.5898 7.38342 21.3959 7.81328 23.0126 8.68028C24.6293 9.54729 25.8382 10.6693 26.6393 12.0463L32.3123 8.775C30.8631 6.41441 28.8458 4.5201 26.246 3.09209C23.6534 1.66408 20.7841 0.950073 17.6381 0.950073C12.6424 0.950073 8.44766 2.64766 5.06859 6.05012C1.68953 9.44529 0 13.5982 0 18.5088C0 23.383 1.7041 27.514 5.11957 30.8946C8.45494 34.2024 12.6424 35.8927 17.6745 35.9655C17.7911 35.9655 17.9149 35.9655 18.0314 35.9655C21.5779 35.9655 24.6511 35.1714 27.251 33.5904C28.2195 33.0002 29.1226 32.3008 29.9528 31.4921C31.8972 29.6123 33.2226 27.361 33.9363 24.7527C34.3587 23.23 34.5626 21.5761 34.5626 19.8057V17.2046Z"
                />
              </svg>
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: (theme) => theme.palette.text.primary,
                textDecoration: "none",
                marginLeft: (theme) => theme.spacing(1),
                flex: 1,
              }}
            >
              GPPlanet
            </Typography>
          </ButtonR>
        )}
      </Box>
      <SidebarMenu />
    </Paper>
  );
};

export default Sidebar;
