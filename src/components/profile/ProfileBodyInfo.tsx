import { useMutation } from "@apollo/client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import {
  Icon20AccessibilityOutline,
  Icon20PhoneOutline,
  Icon24FavoriteOutline,
  Icon24UserOutline,
  Icon24ViewOutline,
} from "@vkontakte/icons";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import alchemist from "../../assets/images/roles/alchemist.png";
import blacksmith from "../../assets/images/roles/blacksmith.png";
import builder from "../../assets/images/roles/builder.png";
import crafter from "../../assets/images/roles/crafter.png";
import farmer from "../../assets/images/roles/farmer.png";
import fisherman from "../../assets/images/roles/fisherman.png";
import hunter from "../../assets/images/roles/hunter.png";
import lumberjack from "../../assets/images/roles/lumberjack.png";
import miner from "../../assets/images/roles/miner.png";
import { useAppSelector } from "../../hooks/redux";
import { getSex } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";
import ProfileCell from "./ProfileCell";

interface props {
  updateProfile: () => void;
}

const ProfileBodyInfo: React.FC<props> = ({ updateProfile }) => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const currentProfile = useAppSelector(
    (state) => state.currentProfile.profile
  );
  const { enqueueSnackbar } = useSnackbar();

  const [
    setRating,
    { data: ratingSuccess, loading: ratingLoading, error: ratingError },
  ] = useMutation(gql`
    mutation setRating($id: ObjectID!, $positive: Boolean) {
      setRating(id: $id, input: { positive: $positive }) {
        id
      }
    }
  `);

  React.useEffect(() => {
    if (!ratingSuccess) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    updateProfile();
    // eslint-disable-next-line
  }, [ratingSuccess, enqueueSnackbar]);

  React.useEffect(() => {
    if (!ratingError) return;
    enqueueSnackbar(ratingError?.message, { variant: "error" });
  }, [ratingError, enqueueSnackbar]);

  const getImageByRole = () => {
    switch (currentProfile?.role) {
      case "Ремесленник":
        return crafter;
      case "Шахтёр":
        return miner;
      case "Охотник":
        return hunter;
      case "Строитель":
        return builder;
      case "Кузнец":
        return blacksmith;
      case "Плотник":
        return lumberjack;
      case "Повар":
        return alchemist;
      case "Рыбак":
        return fisherman;
      case "Фермер":
        return farmer;
      default:
        return null;
    }
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="body1">Номер телефона</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon20PhoneOutline />
            </IconWrapper>
          }
          sx={{
            textTransform: "none",
          }}
          onClick={() =>
            currentProfile?.phone
              ? navigator.clipboard.writeText(currentProfile?.phone.toString())
              : {}
          }
        >
          {currentProfile?.phone ? currentProfile?.phone : "Нет"}
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Мессенджер</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{
                color: (theme) => theme.palette.primary.main,
                alignItems: "center",
                display: "flex",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 71 55"
                fill="none"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="71" height="55" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </IconWrapper>
          }
          sx={{ textTransform: "none" }}
          onClick={() =>
            currentProfile
              ? navigator.clipboard.writeText(currentProfile?.discriminator)
              : {}
          }
        >
          {currentProfile?.discriminator}
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Лет в городе</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24FavoriteOutline />
            </IconWrapper>
          }
        >
          {currentProfile?.level}
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Роль</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon20AccessibilityOutline />
            </IconWrapper>
          }
          sx={{ textTransform: "none" }}
        >
          {currentProfile?.role ? currentProfile.role : "Нет"}{" "}
          {!!getImageByRole() && (
            <LazyLoadImage
              src={getImageByRole() as string}
              style={{
                imageRendering: "pixelated",
                userSelect: "none",
                display: "inline",
                margin: "auto 0 auto 4px",
              }}
              draggable={false}
              height="100%"
            />
          )}
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Пол</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24UserOutline />
            </IconWrapper>
          }
          sx={{ textTransform: "none" }}
        >
          {currentProfile && getSex(currentProfile.sex)}
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Просмотров</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24ViewOutline />
            </IconWrapper>
          }
          sx={{ textTransform: "none" }}
        >
          {currentProfile?.views}
        </Cell>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body1">Рейтинг</Typography>
        <Cell
          disableRipple
          startIcon={
            <IconWrapper
              size={24}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <Icon24ViewOutline />
            </IconWrapper>
          }
          endIcon={
            profileId !== currentProfile?.id && (
              <Select
                defaultValue="0"
                onChange={(e) => {
                  switch (e.target.value) {
                    case "0": {
                      setRating({
                        variables: {
                          id: currentProfile?.id,
                          positive: null,
                        },
                      });
                      break;
                    }
                    default: {
                      setRating({
                        variables: {
                          id: currentProfile?.id,
                          positive: e.target.value === "1",
                        },
                      });
                    }
                  }
                }}
                size={"small"}
                disabled={ratingLoading}
                displayEmpty
              >
                <MenuItem value="1">Положительно</MenuItem>
                <MenuItem value="0">Нейтрально</MenuItem>
                <MenuItem value="-1">Отрицательно</MenuItem>
              </Select>
            )
          }
          sx={{ textTransform: "none" }}
        >
          {currentProfile && currentProfile.ratings}
        </Cell>
      </Stack>
      {currentProfile && currentProfile.roles.length !== 0 && (
        <Stack spacing={1}>
          <Typography variant="body1">Роли</Typography>
          <Box
            sx={{
              overflowX: "scroll",
            }}
            className="hide-scrollbar"
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: "max-content",
              }}
            >
              {currentProfile?.roles &&
                currentProfile.roles.map((role) => {
                  return (
                    <Cell
                      key={role.id}
                      disableRipple
                      startIcon={
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 999,
                            backgroundColor: role.color,
                            alignSelf: "center",
                          }}
                        />
                      }
                    >
                      {role.name}
                    </Cell>
                  );
                })}
            </Stack>
          </Box>
        </Stack>
      )}
      {currentProfile && currentProfile.friends.length !== 0 && (
        <Stack spacing={1}>
          <Typography variant="body1">Друзья</Typography>
          <Box
            sx={{
              overflowX: "scroll",
            }}
            className="hide-scrollbar"
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: "max-content",
              }}
            >
              {currentProfile.friends.map((p) => (
                <ProfileCell minWidth profile={p} key={p.id} />
              ))}
            </Stack>
          </Box>
        </Stack>
      )}
      {currentProfile && currentProfile.subscribers.length !== 0 && (
        <Stack spacing={1}>
          <Typography variant="body1">Подписчики</Typography>
          <Box
            sx={{
              overflowX: "scroll",
            }}
            className="hide-scrollbar"
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: "max-content",
              }}
            >
              {currentProfile.subscribers.map((p) => (
                <ProfileCell minWidth profile={p} key={p.id} />
              ))}
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default ProfileBodyInfo;
