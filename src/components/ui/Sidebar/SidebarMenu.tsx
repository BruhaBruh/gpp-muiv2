import { Badge, Stack } from "@mui/material";
import {
  Icon20DiamondOutline,
  Icon24AdvertisingOutline,
  Icon24Back,
  Icon24NotificationOutline,
  Icon28ChatsOutline,
  Icon28ChevronRightOutline,
  Icon28DoorArrowLeftOutline,
  Icon28DoorArrowRightOutline,
  Icon28SettingsOutline,
  Icon28StatisticsOutline,
  Icon28UsersOutline,
} from "@vkontakte/icons";
import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import Cell from "../Cell";
import IconWrapper from "../IconWrapper";
import SidebarCell from "./SidebarCell";
interface props {
  showBack?: boolean;
  setShow?: (value: React.SetStateAction<boolean>) => void;
}

const SidebarMenu: React.FC<props> = ({ showBack, setShow }) => {
  const size = 28;
  const isAuthenticated = useAppSelector(
    (state) => state.userData.isAuthenticated
  );
  const notifications = useAppSelector((state) => state.cache.notifications);

  return (
    <Stack
      spacing={1}
      sx={{
        paddingTop: (theme) => theme.spacing(2),
        paddingBottom: (theme) => theme.spacing(2),
      }}
    >
      {isAuthenticated ? (
        <>
          <SidebarCell
            to="/u"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                <Icon28UsersOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Профили
          </SidebarCell>
          <SidebarCell
            to="/f"
            startIcon={
              <IconWrapper size={size}>
                <Icon28ChatsOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Форум
          </SidebarCell>
          <SidebarCell
            to="/r"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.info.main }}
              >
                <Icon24AdvertisingOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Репорты
          </SidebarCell>
          <SidebarCell
            to="/d"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.primary.main }}
              >
                <Icon20DiamondOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Донат
          </SidebarCell>
          <SidebarCell
            to="/t"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                <Icon28StatisticsOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Топы
          </SidebarCell>
          <SidebarCell
            to="/settings"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                <Icon28SettingsOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Настройки
          </SidebarCell>
          <SidebarCell
            to="/n"
            startIcon={
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={notifications.length}
                max={99}
                color={"info"}
                sx={{ "& .MuiBadge-badge": { transform: "scale(0.7)" } }}
              >
                <IconWrapper size={size}>
                  <Icon24NotificationOutline />
                </IconWrapper>
              </Badge>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Оповещения
          </SidebarCell>
          <SidebarCell
            to="/s"
            startIcon={
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={notifications.length}
                max={99}
                color={"info"}
                sx={{ "& .MuiBadge-badge": { transform: "scale(0.7)" } }}
              >
                <IconWrapper
                  size={size}
                  sx={{
                    "& svg": {
                      transform: "scale(1.25)",
                    },
                  }}
                >
                  <svg viewBox="0 0 28 28">
                    <path
                      d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14z"
                      fill="url(#statistic_circle_fill_blue_28_a)"
                    ></path>
                    <path
                      d="M14 11a1 1 0 011 1v7a1 1 0 11-2 0v-7a1 1 0 011-1zm-5 2a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm10-5a1 1 0 011 1v10a1 1 0 11-2 0V9a1 1 0 011-1z"
                      fill="#fff"
                    ></path>
                  </svg>
                </IconWrapper>
              </Badge>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Статистика
          </SidebarCell>
          <Cell
            href={"/api/auth/logout"}
            color="error"
            size="medium"
            sx={{
              justifyContent: "start",
            }}
            startIcon={
              <IconWrapper
                component="span"
                size={size}
                sx={{
                  color: (theme) => theme.palette.error.main,
                }}
              >
                <Icon28DoorArrowRightOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper
                component="span"
                size={size}
                sx={{
                  color: (theme) => theme.palette.info.main,
                }}
              >
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Выйти
          </Cell>
        </>
      ) : (
        <>
          <Cell
            href={"/api/auth/login"}
            color="primary"
            size="medium"
            sx={{
              justifyContent: "start",
            }}
            startIcon={
              <IconWrapper component="span" size={size}>
                <Icon28DoorArrowLeftOutline />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper
                component="span"
                size={size}
                sx={{
                  color: (theme) => theme.palette.info.main,
                }}
              >
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Войти
          </Cell>
        </>
      )}
      {showBack && (
        <Cell
          onClick={() => setShow && setShow(false)}
          color="inherit"
          size="medium"
          sx={{
            justifyContent: "start",
          }}
          startIcon={
            <IconWrapper component="span" size={size}>
              <Icon24Back />
            </IconWrapper>
          }
        >
          Назад
        </Cell>
      )}
    </Stack>
  );
};

export default SidebarMenu;
