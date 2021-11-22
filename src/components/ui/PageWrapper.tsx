import {
  Avatar,
  Badge,
  Box,
  BoxProps,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useAppSelector } from "../../hooks/redux";
import { getUserRoleString } from "../../redux/userData/types";
import LinkR from "./LinkR";
import ScrollToTop from "./ScrollToTop";

const PageWrapper: React.FC<BoxProps> = ({ sx, children, ...props }) => {
  const header = useAppSelector((state) => state.ui.header);
  const lower = useMediaQuery("(max-width: 900px)");
  const lowersm = useMediaQuery("(max-width: 600px)");
  const userData = useAppSelector((state) => state.userData);

  return (
    <Box
      {...props}
      sx={{
        ...sx,
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "64px 1fr",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: (theme) => theme.spacing(2),
          paddingRight: (theme) => theme.spacing(2),
          borderRadius: 0,
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          {header}
        </Typography>
        {!lowersm && userData.isLoggedIn && (
          <LinkR
            to={`/u/${userData.userId}`}
            underline="none"
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <Stack spacing={1} direction="row" alignItems="center">
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
                badgeContent={" "}
                overlap="circular"
                color={"success"}
                sx={{
                  ".MuiBadge-dot": {
                    border: (theme) =>
                      `2px solid ${theme.palette.background.paper}`,
                    minWidth: "auto",
                    width: "7px",
                    height: "7px",
                    borderRadius: "100px",
                    boxSizing: "content-box",
                  },
                }}
              >
                <LazyLoadComponent>
                  <Avatar
                    src={userData.avatar}
                    children={userData.nickname.substr(0, 1)}
                    sx={{ width: 40, height: 40 }}
                  />
                </LazyLoadComponent>
              </Badge>
              <ListItemText
                sx={{ margin: 0, alignSelf: "center" }}
                primary={
                  <Typography variant="body1">{userData.nickname}</Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    {getUserRoleString(userData.userRole)}
                  </Typography>
                }
              />
            </Stack>
          </LinkR>
        )}
      </Paper>
      <Box
        sx={{
          padding: (theme) => theme.spacing(2),
          overflow: "hidden",
          paddingBottom: (theme) => (lower ? theme.spacing(9) : undefined),
          position: "relative",
        }}
      >
        <ScrollToTop />
        {children}
      </Box>
    </Box>
  );
};

export default PageWrapper;
