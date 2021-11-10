import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Paper,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Icon24CrownOutline,
  Icon24RoubleBadgeOutline,
  Icon24WalletOutline,
} from "@vkontakte/icons";
import React from "react";
import { Permissions, User } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import DonateForm from "./DonateForm";
import DonateFormTrefs from "./DonateFormTrefs";

const DonateHeader = () => {
  const userID = useAppSelector((state) => state.userData.userId);
  const mobile = useMediaQuery("(max-width: 600px)");
  const { data } = useQuery<{ user: User }>(
    gql`
      query getUser($user: ObjectID!) {
        user(id: $user) {
          permissions
          money
          endSubscriptionAt
        }
      }
    `,
    { variables: { user: userID }, pollInterval: 5000 }
  );

  const { data: trefData } = useQuery<{ getTref: number }>(
    gql`
      query getTrefs {
        getTref
      }
    `,
    { pollInterval: 5000 }
  );
  const openTrefDonate = () => dispatch(setModal(<DonateFormTrefs />));

  const dispatch = useAppDispatch();

  const openDonate = () => dispatch(setModal(<DonateForm />));

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
        gap: (theme) => theme.spacing(2),
      }}
    >
      <Tooltip placement="bottom" title="Нажмите, чтобы пополнить">
        <Box>
          <Cell
            fullWidth
            size="large"
            variant="outlined"
            onClick={openDonate}
            endIcon={
              <Box sx={{ color: "rgb(255, 128, 102)" }}>
                <Icon24WalletOutline />
              </Box>
            }
            sx={{ borderColor: `rgb(255, 128, 102)` }}
          >
            Баланс: {data?.user.money} <Icon24RoubleBadgeOutline />
          </Cell>
        </Box>
      </Tooltip>
      <Tooltip
        placement="bottom"
        title="Нажмите, чтобы конвертировать монеты в трефы"
      >
        <Box>
          <Cell fullWidth size="large" onClick={openTrefDonate}>
            Баланс треф: {trefData?.getTref}
          </Cell>
        </Box>
      </Tooltip>
      <Cell
        size="large"
        startIcon={
          (checkPermissions(
            Permissions.LiteSubscription,
            data?.user.permissions
          ) ||
            checkPermissions(
              Permissions.PremiumSubscription,
              data?.user.permissions
            )) &&
          (checkPermissions(
            Permissions.PremiumSubscription,
            data?.user.permissions
          ) ? (
            <Icon24CrownOutline
              style={{
                color: process.env.REACT_APP_PREMIUM_COLOR,
                marginLeft: "4px",
              }}
            />
          ) : (
            <Icon24CrownOutline
              style={{
                color: process.env.REACT_APP_LITE_COLOR,
                marginLeft: "4px",
              }}
            />
          ))
        }
        endIcon={
          <Typography
            variant="body2"
            sx={{
              color: (theme: Theme) => theme.palette.text.disabled,
              fontSize: "0.875rem !important",
            }}
          >
            {(checkPermissions(
              Permissions.LiteSubscription,
              data?.user.permissions
            ) ||
              checkPermissions(
                Permissions.PremiumSubscription,
                data?.user.permissions
              )) &&
              (new Date().getTime() -
                new Date(data?.user.endSubscriptionAt).getTime() >=
              0
                ? "Никогда"
                : `${new Date(data?.user.endSubscriptionAt)
                    .toLocaleTimeString("ru-RU")
                    .substr(0, 5)} ${new Date(data?.user.endSubscriptionAt)
                    .toLocaleDateString("ru-RU")
                    .substr(0, 6)}${new Date(data?.user.endSubscriptionAt)
                    .toLocaleDateString("ru-RU")
                    .substr(8)}`)}
          </Typography>
        }
      >
        {checkPermissions(
          Permissions.LiteSubscription,
          data?.user.permissions
        ) ||
        checkPermissions(
          Permissions.PremiumSubscription,
          data?.user.permissions
        )
          ? checkPermissions(
              Permissions.PremiumSubscription,
              data?.user.permissions
            )
            ? "Premium"
            : "Lite"
          : "Обычный"}
      </Cell>
    </Paper>
  );
};

export default DonateHeader;
