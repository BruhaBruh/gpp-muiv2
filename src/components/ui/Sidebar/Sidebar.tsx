import {
  Box,
  Fab,
  Paper,
  PaperProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Icon28Menu } from "@vkontakte/icons";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../../assets/images/logo.png";
import { useAppSelector } from "../../../hooks/redux";
import ButtonR from "../ButtonR";
import Drawer from "../Drawer";
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
        gridTemplateRows: "48px 1fr",
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
          sidebarHeader
        ) : (
          <ButtonR color="inherit" to="/" fullWidth sx={{ height: "100%" }}>
            <LazyLoadImage src={logo} height="100%" />
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
