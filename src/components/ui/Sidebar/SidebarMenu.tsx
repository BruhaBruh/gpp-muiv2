import { Stack } from "@mui/material";
import {
  Icon24Back,
  Icon28AdvertisingOutline,
  Icon28ChevronRightOutline,
  Icon28DiamondOutline,
  Icon28DoorArrowLeftOutline,
  Icon28DoorArrowRightOutline,
  Icon28Newsfeed,
  Icon28ServicesOutline,
  Icon28SettingsOutline,
  Icon28ShoppingCartOutline,
  Icon28UserCircleOutline,
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
  const isLoggedIn = useAppSelector((state) => state.userData.isLoggedIn);
  const profileId = useAppSelector((state) => state.userData.profileId);
  const chats = useAppSelector((state) => state.chats.chats.map((c) => c.chat));

  return (
    <Stack
      spacing={1}
      sx={{
        paddingTop: (theme) => theme.spacing(2),
        paddingBottom: (theme) => theme.spacing(2),
      }}
    >
      {isLoggedIn ? (
        <>
          {!!profileId && (
            <SidebarCell
              to={"/profile/" + profileId}
              startIcon={
                <IconWrapper
                  size={size}
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  <Icon28UserCircleOutline />
                </IconWrapper>
              }
              endIcon={
                <IconWrapper size={size}>
                  <Icon28ChevronRightOutline />
                </IconWrapper>
              }
            >
              Мой профиль
            </SidebarCell>
          )}
          {!!profileId && (
            <SidebarCell
              to="/shop"
              startIcon={
                <IconWrapper
                  size={size}
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  <Icon28ShoppingCartOutline />
                </IconWrapper>
              }
              endIcon={
                <IconWrapper size={size}>
                  <Icon28ChevronRightOutline />
                </IconWrapper>
              }
            >
              Товары
            </SidebarCell>
          )}
          {!!profileId && (
            <SidebarCell
              to="/services"
              startIcon={
                <IconWrapper
                  size={size}
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  <Icon28ServicesOutline />
                </IconWrapper>
              }
              endIcon={
                <IconWrapper size={size}>
                  <Icon28ChevronRightOutline />
                </IconWrapper>
              }
            >
              Услуги
            </SidebarCell>
          )}
          {/*!!profileId && (
            <SidebarCell
              to="/chats"
              startIcon={
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    chats.filter((chat) => !chat.lastMessage.readed).length
                  }
                  max={99}
                  color={"primary"}
                  sx={{ "& .MuiBadge-badge": { transform: "scale(0.75)" } }}
                >
                  <IconWrapper
                    size={size}
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    <Icon28MessagesOutline />
                  </IconWrapper>
                </Badge>
              }
              endIcon={
                <IconWrapper size={size}>
                  <Icon28ChevronRightOutline />
                </IconWrapper>
              }
            >
              Чаты
            </SidebarCell>
            )*/}
          {!!profileId && (
            <SidebarCell
              to="/profiles"
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
              Все профили
            </SidebarCell>
          )}
          {!!profileId && (
            <SidebarCell
              to="/donate"
              startIcon={
                <IconWrapper
                  size={size}
                  sx={{ color: process.env.REACT_APP_PREMIUM_COLOR }}
                >
                  <Icon28DiamondOutline />
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
          )}
          <SidebarCell
            to="/info"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                <Icon28Newsfeed />
              </IconWrapper>
            }
            endIcon={
              <IconWrapper size={size}>
                <Icon28ChevronRightOutline />
              </IconWrapper>
            }
          >
            Информация
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
          {!!profileId && (
            <SidebarCell
              to="/report"
              startIcon={
                <IconWrapper
                  size={size}
                  sx={{ color: (theme) => theme.palette.info.main }}
                >
                  <Icon28AdvertisingOutline />
                </IconWrapper>
              }
              endIcon={
                <IconWrapper size={size}>
                  <Icon28ChevronRightOutline />
                </IconWrapper>
              }
            >
              Репорт
            </SidebarCell>
          )}
          <Cell
            href={"/auth/logout"}
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
            Выход
          </Cell>
        </>
      ) : (
        <>
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
          <Cell
            href={"/auth/login"}
            color="primary"
            size="medium"
            sx={{
              justifyContent: "start",
            }}
            startIcon={
              <IconWrapper
                component="span"
                size={size}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
              >
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
