import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Slider,
  Theme,
  Typography,
} from "@mui/material";
import {
  Icon24RoubleBadgeOutline,
  Icon24ShoppingCartOutline,
} from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { donateItems } from "../../donate/items";
import { ItemType } from "../../donate/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";

const DonateFormPremium = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const dispatch = useAppDispatch();
  const [time, setTime] = React.useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const vertical: any = useAppSelector(
    (state) => state.settings.verticalSnackbarPosition
  );
  const horizontal: any = useAppSelector(
    (state) => state.settings.horizontalSnackbarPosition
  );
  const [buy, { data, error, loading }] = useMutation(gql`
    mutation buy($item: Int!, $server: ObjectID!) {
      buy(itemType: $item, server: $server)
    }
  `);
  const premium = [
    ItemType.premium_week,
    ItemType.premium_month,
    ItemType.premium_halfyear,
  ];
  const getTime = () => {
    switch (time) {
      case 0:
        return "Неделя";
      case 1:
        return "Месяц";
      case 2:
        return "Полгода";
    }
  };

  React.useEffect(() => {
    if (!data) return;
    enqueueSnackbar("Поздравляем с приобретением Premium подписки!", {
      variant: "success",
    });
    dispatch(setModal(null));
  }, [data, dispatch, horizontal, vertical, enqueueSnackbar]);

  React.useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error, enqueueSnackbar]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <DialogTitle>Подписка Premium</DialogTitle>
      <DialogContent className="hide-scrollbar" sx={{ whiteSpace: "pre-wrap" }}>
        <div style={{ width: "100%" }}>
          <InputLabel id="avatar">Длительность: {getTime()}</InputLabel>
          <Slider
            size="small"
            value={time}
            onChange={(e, v) => setTime(v as any)}
            step={1}
            min={0}
            max={2}
            valueLabelDisplay="off"
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
        <Button
          color="primary"
          size="medium"
          type="submit"
          variant="text"
          startIcon={<Icon24ShoppingCartOutline />}
          endIcon={
            <Typography
              variant="body1"
              sx={{
                color: (theme: Theme) => theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {
                donateItems.filter((item) => item.type === premium[time])[0]
                  .cost
              }
              <Icon24RoubleBadgeOutline style={{ marginLeft: "4px" }} />
            </Typography>
          }
          onClick={() => {
            buy({
              variables: {
                server: server,
                item: premium[time],
              },
            });
          }}
          disabled={loading}
          fullWidth
          sx={{ justifyContent: "start" }}
        >
          <Typography
            variant="body1"
            sx={{ textTransform: "none", flex: 1, textAlign: "left" }}
          >
            Купить
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DonateFormPremium;
