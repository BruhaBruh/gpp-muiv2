import {
  Box,
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
  Icon24CubeBoxOutline,
  Icon24InfoCircleOutline,
  Icon24RoubleBadgeOutline,
  Icon24ShoppingCartOutline,
} from "@vkontakte/icons";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Donateitem } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";
import DonateBuy from "./DonateBuy";

const DonateCard: React.FC<{ item: Donateitem }> = ({ item }) => {
  const dispatch = useAppDispatch();

  const getIcon = () => {
    switch (item.icon) {
      case 0:
        return (
          <IconWrapper
            sx={{
              color: process.env.REACT_APP_PREMIUM_COLOR,
            }}
            size={24}
          >
            <Icon24CrownOutline />
          </IconWrapper>
        );
      case 1:
        return (
          <IconWrapper
            sx={{
              color: process.env.REACT_APP_LITE_COLOR,
            }}
            size={24}
          >
            <Icon24CrownOutline />
          </IconWrapper>
        );
      case 2:
        return (
          <IconWrapper
            sx={{
              color: (theme) => theme.palette.text.disabled,
              display: "flex",
              alignItems: "center",
            }}
            size={20}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512px"
              height="512px"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z"
              />
            </svg>
          </IconWrapper>
        );
      case 3:
        return (
          <IconWrapper
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
            size={24}
          >
            <Icon24CubeBoxOutline />
          </IconWrapper>
        );
      default:
        return undefined;
    }
  };

  const getDays = (text: string) => {
    return (
      <Typography
        variant="subtitle2"
        sx={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          color: (theme) => theme.palette.text.secondary,
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    );
  };

  const getImage = () => {
    switch (item.icon) {
      case 0:
        return (
          <IconWrapper
            sx={{
              color: process.env.REACT_APP_PREMIUM_COLOR,
              position: "relative",
            }}
            size={128}
          >
            <Icon24CrownOutline />
            {getDays(`${item.amount} дней`)}
          </IconWrapper>
        );
      case 1:
        return (
          <IconWrapper
            sx={{
              color: process.env.REACT_APP_LITE_COLOR,
              position: "relative",
            }}
            size={128}
          >
            <Icon24CrownOutline />
            {getDays(`${item.amount} дней`)}
          </IconWrapper>
        );
      case 2:
        return (
          <IconWrapper
            sx={{
              color: (theme) => theme.palette.text.disabled,
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            size={128}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512px"
              height="512px"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z"
              />
            </svg>
            {getDays(`1 к 2`)}
          </IconWrapper>
        );
      case 3:
        return (
          <LazyLoadImage
            src={"https://i.postimg.cc/fbMb3CdF/chest.png"}
            width="100%"
          />
        );
      default:
        return undefined;
    }
  };

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
            {item.description}
          </DialogContent>
        </Dialog>
      )
    );
  };
  const open = () => {
    if (item.type === 3) {
      // case
      dispatch(setModal(<DonateBuy item={item} />));
    } else {
      dispatch(setModal(<DonateBuy item={item} />));
    }
  };

  return (
    <Paper
      sx={{ padding: (theme) => theme.spacing(2), userSelect: "none" }}
      onClick={open}
    >
      <Stack spacing={1}>
        <Cell
          disableRipple
          disableFocusRipple
          startIcon={getIcon()}
          endIcon={
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                openInfo();
              }}
            >
              <IconWrapper
                size={20}
                sx={{ color: (theme) => theme.palette.info.main }}
              >
                <Icon24InfoCircleOutline />
              </IconWrapper>
            </IconButton>
          }
          sx={{ textTransform: "none" }}
        >
          {item.name}
        </Cell>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "350 / 200",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getImage()}
        </Box>
        <Cell
          color="primary"
          startIcon={
            <IconWrapper size={24}>
              <Icon24RoubleBadgeOutline />
            </IconWrapper>
          }
          endIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24ShoppingCartOutline />
            </IconWrapper>
          }
        >
          {item.cost}
        </Cell>
      </Stack>
    </Paper>
  );
};

export default DonateCard;
