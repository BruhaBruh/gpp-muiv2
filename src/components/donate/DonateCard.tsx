import { gql, useMutation } from "@apollo/client";
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
  Icon24CubeBoxOutline,
  Icon24InfoCircleOutline,
  Icon24RoubleBadgeOutline,
  Icon24ShoppingCartOutline,
} from "@vkontakte/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Item } from "../../donate/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import DonateCase from "./DonateCase";

interface props {
  item: Item;
}

const DonateCard: React.FC<props> = ({ item }) => {
  const serverId = useAppSelector((state) => state.userData.serverId);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [buy, { data, error, loading }] = useMutation(gql`
    mutation buy($item: Int!, $server: ObjectID!) {
      buy(itemType: $item, server: $server)
    }
  `);
  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    dispatch(setModal(null));
  }, [data, dispatch, enqueueSnackbar]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, dispatch, enqueueSnackbar]);

  const openCase = () => dispatch(setModal(<DonateCase item={item} />));

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
            {item.desc}
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
      onClick={() => {
        if (loading) return;
        if (item.isCase) openCase();
        else buy({ variables: { item: item.type, server: serverId } });
      }}
    >
      <Stack spacing={1}>
        <Button
          startIcon={
            item.isCase && (
              <Box sx={{ color: (theme) => theme.palette.primary.main }}>
                <Icon24CubeBoxOutline />
              </Box>
            )
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
            {item.name}
          </Typography>
        </Button>
        <Box style={{ position: "relative" }}>
          <LazyLoadImage
            draggable={false}
            alt=""
            width="100%"
            style={{ aspectRatio: "350 / 200" }}
            src={item.images[0]}
          />
        </Box>
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
            {item.cost === 0 ? "Бесплатно" : item.cost}
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default DonateCard;
