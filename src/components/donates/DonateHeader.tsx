import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Icon24CrownOutline,
  Icon24HistoryBackwardOutline,
  Icon24RoubleBadgeOutline,
} from "@vkontakte/icons";
import dayjs from "dayjs";
import React from "react";
import { User } from "../../graphql/types";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissionsWA, Permissions } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import CellR from "../ui/CellR";
import IconWrapper from "../ui/IconWrapper";
import DonateConvertToTref from "./DonateConvertToTref";
import DonateTopUp from "./DonateTopUp";

const DonateHeader = () => {
  const dispatch = useAppDispatch();
  const { data } = useQuery<{ me: User }>(
    gql`
      query me {
        me {
          money
          permissions
          subscriptionEndAt
          trefs
        }
      }
    `,
    { fetchPolicy: "no-cache", pollInterval: 5000 }
  );
  const lowerSM = useMediaQuery("(max-width: 600px)");

  const getIcon = () => {
    if (!data) return;
    if (checkPermissionsWA(Permissions.Premium, data.me.permissions)) {
      return (
        <IconWrapper
          sx={{
            color: process.env.REACT_APP_PREMIUM_COLOR,
          }}
          size={20}
        >
          <Icon24CrownOutline />
        </IconWrapper>
      );
    } else if (checkPermissionsWA(Permissions.Lite, data.me.permissions)) {
      return (
        <IconWrapper
          sx={{
            color: process.env.REACT_APP_LITE_COLOR,
          }}
          size={20}
        >
          <Icon24CrownOutline />
        </IconWrapper>
      );
    }
  };

  const getStatus = () => {
    if (!data) return "Без подписки";
    if (checkPermissionsWA(Permissions.Premium, data.me.permissions)) {
      return "Premium";
    } else if (checkPermissionsWA(Permissions.Lite, data.me.permissions)) {
      return "Lite";
    } else {
      return "Без подписки";
    }
  };

  const getTime = () => {
    if (!data) return;
    if (
      checkPermissionsWA(Permissions.Premium, data.me.permissions) ||
      checkPermissionsWA(Permissions.Lite, data.me.permissions)
    ) {
      if (data.me.subscriptionEndAt) {
        return dayjs(data.me.subscriptionEndAt).format("HH:mm DD.MM.YYYY");
      } else {
        return "Никогда";
      }
    }
  };

  const openBalance = () => {
    dispatch(setModal(<DonateTopUp />));
  };

  const openConvert = () => {
    dispatch(setModal(<DonateConvertToTref />));
  };

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      {data && (
        <Stack spacing={1}>
          <Stack spacing={1} direction={lowerSM ? "column" : "row"}>
            <Tooltip title="Нажмите, чтобы пополнить монеты" placement="bottom">
              <Box sx={{ flex: 1 }}>
                <Cell
                  fullWidth
                  onClick={openBalance}
                  startIcon={
                    <IconWrapper
                      sx={{
                        color: (theme) => theme.palette.info.main,
                      }}
                      size={20}
                    >
                      <Icon24RoubleBadgeOutline />
                    </IconWrapper>
                  }
                >
                  Баланс: {data.me.money}
                </Cell>
              </Box>
            </Tooltip>
            <Tooltip
              title="Нажмите, чтобы конвертировать монеты в трефы"
              placement="bottom"
            >
              <Box sx={{ flex: 1 }}>
                <Cell
                  fullWidth
                  onClick={openConvert}
                  startIcon={
                    <IconWrapper
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        display: "flex",
                        alignItems: "center",
                      }}
                      size={16}
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
                  }
                >
                  Баланс: {data.me.trefs}
                </Cell>
              </Box>
            </Tooltip>
          </Stack>
          <Stack spacing={1} direction={lowerSM ? "column" : "row"}>
            <Cell
              startIcon={getIcon()}
              sx={{ flex: 1 }}
              endIcon={
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {getTime()}
                </Typography>
              }
            >
              {getStatus()}
            </Cell>
            <CellR
              to={"/d/h"}
              sx={{ flex: 1 }}
              startIcon={
                <IconWrapper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  size={16}
                >
                  <Icon24HistoryBackwardOutline />
                </IconWrapper>
              }
            >
              История
            </CellR>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default DonateHeader;
