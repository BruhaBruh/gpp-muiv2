import {
  Box,
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
  Icon28DiscountOutline,
} from "@vkontakte/icons";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { donateItems } from "../../donate/items";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import IconWrapper from "../ui/IconWrapper";
import DonateFormLite from "./DonateFormLite";

const DonateCardLite = () => {
  const dispatch = useAppDispatch();

  const openSubscription = () => dispatch(setModal(<DonateFormLite />));

  const openInfo = () =>
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
            {donateItems[0].desc}
          </DialogContent>
        </Dialog>
      )
    );

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
              style={{ color: process.env.REACT_APP_LITE_COLOR }}
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
            Lite подписка
          </Typography>
        </Button>
        <div style={{ position: "relative", flex: 1, height: "1px" }}>
          <LazyLoadImage
            draggable={false}
            alt=""
            width="100%"
            style={{ aspectRatio: "350 / 200" }}
            src={donateItems[0].images[0]}
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
            {donateItems[4].cost} - {donateItems[2].cost}
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                color: (theme) => theme.palette.primary.main,
                marginLeft: "12px",
              }}
            >
              -50
              <IconWrapper
                size={20}
                sx={{ display: "inline-flex", marginLeft: "4px" }}
              >
                <Icon28DiscountOutline />
              </IconWrapper>
            </Box>
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default DonateCardLite;
