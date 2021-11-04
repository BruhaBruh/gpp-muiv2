import { useMutation } from "@apollo/client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import {
  Icon20AccessibilityOutline,
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
import { countRating, getSex } from "../../redux/userData/types";
import Cell from "../ui/Cell";
import IconWrapper from "../ui/IconWrapper";
import ProfileCell from "./ProfileCell";

interface props {
  updateProfile: () => void;
}

const ProfileBodyInfo: React.FC<props> = ({ updateProfile }) => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const userId = useAppSelector((state) => state.userData.userId);
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

  const userRating = (): boolean | null => {
    const d = currentProfile?.ratings.filter((el) => el.user === userId);
    if (!d) return null;
    if (d.length === 0) {
      return null;
    } else {
      return d[0].positive;
    }
  };

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
                value={userRating() === null ? "0" : userRating() ? "1" : "-1"}
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
          {currentProfile && countRating(currentProfile.ratings)}
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
