import { Stack } from "@mui/material";
import {
  Icon24AdvertisingOutline,
  Icon24Back,
  Icon28ChevronRightOutline,
  Icon28DoorArrowLeftOutline,
  Icon28DoorArrowRightOutline,
  Icon28SettingsOutline,
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
            to="/r"
            startIcon={
              <IconWrapper
                size={size}
                sx={{ color: (theme) => theme.palette.primary.main }}
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
            href={"api/auth/logout"}
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
