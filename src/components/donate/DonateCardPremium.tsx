import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Icon24CrownOutline,
  Icon24InfoCircleOutline,
  Icon24RoubleBadgeOutline,
  Icon24ShoppingCartOutline,
} from "@vkontakte/icons";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { donateItems } from "../../donate/items";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import DonateFormPremium from "./DonateFormPremium";

const DonateCardPremium = () => {
  const dispatch = useAppDispatch();

  const openSubscription = () => dispatch(setModal(<DonateFormPremium />));

  const openInfo = () => {
    dispatch(
      setModal(
        <Dialog
          maxWidth="sm"
          fullWidth
          open={true}
          onClose={() => dispatch(setModal(null))}
        >
          <DialogTitle>Информация о товаре</DialogTitle>
          <DialogContent
            className="hide-scrollbar"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {donateItems[5].desc}
          </DialogContent>
        </Dialog>
      )
    );
  };

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
        position: "relative",
        userSelect: "none",
      }}
      onClick={openSubscription}
    >
      <Stack spacing={1}>
        <Button
          startIcon={
            <Icon24CrownOutline
              style={{ color: process.env.REACT_APP_PREMIUM_COLOR }}
            />
          }
          endIcon={
            <IconButton
              size="small"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                openInfo();
              }}
            >
              <Icon24InfoCircleOutline />
            </IconButton>
          }
          disableRipple
          disableFocusRipple
          color="inherit"
          variant="text"
          size="large"
          sx={{ cursor: "default", justifyContent: "start" }}
        >
          <Typography
            variant="body1"
            sx={{ flex: 1, textTransform: "none", textAlign: "left" }}
          >
            Premium подписка
          </Typography>
        </Button>
        <div style={{ position: "relative" }}>
          <LazyLoadImage
            draggable={false}
            alt=""
            width="100%"
            style={{ aspectRatio: "350 / 200" }}
            src={donateItems[5].images[0]}
          />
        </div>
        <Button
          startIcon={<Icon24RoubleBadgeOutline />}
          endIcon={<Icon24ShoppingCartOutline />}
          color="primary"
          variant="text"
          size="large"
        >
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              textTransform: "none",
              textAlign: "left",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {donateItems[9].cost} - {donateItems[7].cost}
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default DonateCardPremium;
