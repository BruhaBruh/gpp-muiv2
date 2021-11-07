import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { Icon24WarningTriangleOutline } from "@vkontakte/icons";
import React from "react";
import GlobalChat from "../../components/globalchat/GlobalChat";
import List from "../../components/services/List";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const ServicesPage = () => {
  const isGC = useAppSelector((state) => state.settings.hideGlobalChat);
  const under = useMediaQuery("(max-width: 1200px)");

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("hideModalOnShopPage")) {
      dispatch(
        setModal(
          <Dialog
            maxWidth="sm"
            fullWidth
            open={true}
            onClose={() => dispatch(setModal(null))}
          >
            <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="span"
                sx={{
                  color: (theme: Theme) => theme.palette.error.main,
                  marginRight: (theme: Theme) => theme.spacing(1),
                }}
              >
                <Icon24WarningTriangleOutline />
              </Box>
              Предупреждение
            </DialogTitle>
            <DialogContent>
              Договор купли-продажи - это соглашение обоих сторон, по который
              продавец или покупатель обязуются выполнить условия данного
              договора. В большинстве процесс договора обязан осуществлять на
              прямую по РП на самом сервере ГП.
            </DialogContent>
            <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Button
                  color="primary"
                  size="medium"
                  variant="text"
                  fullWidth
                  onClick={() => dispatch(setModal(null))}
                >
                  Закрыть
                </Button>
                {!localStorage.getItem("hideModalOnShopPage") && (
                  <Button
                    color="inherit"
                    size="medium"
                    variant="text"
                    fullWidth
                    onClick={() => {
                      localStorage.setItem("hideModalOnShopPage", "true");
                      dispatch(setModal(null));
                    }}
                  >
                    Больше не показывать
                  </Button>
                )}
              </Stack>
            </DialogActions>
          </Dialog>
        )
      );
    }
  }, [dispatch]);

  return (
    <Stack
      spacing={2}
      direction={under ? "column-reverse" : "row"}
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <List />
      {!isGC && <GlobalChat />}
    </Stack>
  );
};

export default ServicesPage;
