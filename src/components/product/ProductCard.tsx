import { useMutation } from "@apollo/client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Icon24CrownOutline,
  Icon24DoneOutline,
  Icon28DeleteOutlineAndroid,
  Icon28EditOutline,
  Icon28InfoOutline,
  Icon28MessageOutline,
} from "@vkontakte/icons";
import dayjs from "dayjs";
import gql from "graphql-tag";
import { useSnackbar } from "notistack";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Permissions, Product } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { checkPermissions, getLastOnline } from "../../redux/userData/types";
import LinkR from "../ui/LinkR";
import ProductCardMessageForm from "./ProductCardMessageForm";
import ProductEdit from "./ProductEdit";

interface props {
  product: Product;
  removeProduct: () => void;
  isProfile?: boolean;
  isChat?: boolean;
}

const ProductCard: React.FC<props> = ({
  product,
  removeProduct: removeProductFromArray,
  isProfile,
  isChat,
}) => {
  const profileId = useAppSelector((state) => state.userData.profileId);
  const permissions = useAppSelector((state) => state.userData.permissions);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showDescription, setShowDescription] = React.useState(false);
  const [removeProduct, { data: removeSuccess, error: removeError }] =
    useMutation(
      gql`
        mutation removeProduct($id: ObjectID!) {
          removeProduct(id: $id) {
            id
          }
        }
      `,
      {
        variables: {
          id: product.id,
        },
      }
    );

  React.useEffect(() => {
    if (!removeSuccess) return;
    enqueueSnackbar("Удачно!", { variant: "success" });
    removeProductFromArray();
    dispatch(setModal(null));
  }, [removeSuccess, dispatch, enqueueSnackbar, removeProductFromArray]);

  React.useEffect(() => {
    if (!removeError) return;
    enqueueSnackbar(removeError?.message, { variant: "error" });
  }, [removeError, enqueueSnackbar, dispatch]);

  const openConfirmToDelete = () => {
    dispatch(
      setModal(
        <Dialog
          open={true}
          onClose={() => dispatch(setModal(null))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">
            Удаление товара {product.icon.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы уверены, что хотите удалить товар?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={() => dispatch(setModal(null))}
              autoFocus
              size="medium"
            >
              Отмена
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                dispatch(setModal(null));
                removeProduct();
              }}
              size="medium"
            >
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  };

  const openConfirmToMessage = () => {
    dispatch(setModal(<ProductCardMessageForm product={product} />));
  };

  const openEditForm = () =>
    dispatch(setModal(<ProductEdit product={product} />));

  return (
    <Paper
      elevation={isProfile ? 3 : 0}
      sx={{
        padding: (theme) => theme.spacing(1.5),
        border: "2px solid",
        borderColor: product.isHighlighted
          ? product.icon.category.color
          : "transparent",
        display: "flex",
        height: "252px",
      }}
    >
      {showDescription && (
        <Box
          sx={{ overflowY: "scroll", width: "1px", flex: 1 }}
          className="hide-scrollbar"
        >
          <Tooltip placement="bottom" title="ID">
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: (theme) => theme.palette.text.disabled,
              }}
              variant="body2"
            >
              {product.id}
            </Typography>
          </Tooltip>
          <Stack spacing={1}>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: (theme) => theme.palette.text.secondary,
              }}
              variant="body2"
            >
              Создан:{" " + dayjs(product.createdAt).format("HH:mm DD.MM.YYYY")}
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
          </Stack>
        </Box>
      )}
      {!showDescription && (
        <Stack sx={{ width: "1px", flex: 1 }} spacing={1}>
          <Typography
            sx={{
              color: product.icon.category.color,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            variant="body2"
          >
            {product.icon.category.name}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="h6"
          >
            {product.icon.name}
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "min-content",
              overflow: "hidden",
              "&:after": {
                content: `'${
                  product.amount
                    ? product.amount !== 1
                      ? product.amount
                      : ""
                    : ""
                }'`,
                position: "absolute",
                bottom: 0,
                right: 0,
                fontWeight: "medium",
                fontSize: "1.75rem",
              },
            }}
          >
            <LazyLoadImage
              src={product.icon.image}
              alt={product.icon.name}
              style={{
                imageRendering: "pixelated",
                userSelect: "none",
              }}
              placeholder={<div style={{ width: "128px", height: "128px" }} />}
              height="128"
              width="128"
            />
          </Box>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: "medium",
            }}
            variant="body2"
          >
            {product.cost === 0 ? "Договорная" : `${product.cost} $`}
          </Typography>
        </Stack>
      )}
      <Box sx={{ overflowY: "scroll" }} className="hide-scrollbar">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Tooltip title="Информация" placement="left">
            <IconButton
              onClick={() => setShowDescription((prev) => !prev)}
              sx={{
                marginBottom: (theme) => theme.spacing(1),
                aspectRatio: "1 / 1",
              }}
              color="primary"
            >
              <Icon28InfoOutline />
            </IconButton>
          </Tooltip>
          {profileId !== product.owner.id && !isChat && (
            <Tooltip title="Написать" placement="left">
              <IconButton
                sx={{
                  marginBottom: (theme) => theme.spacing(1),
                  aspectRatio: "1 / 1",
                }}
                color="inherit"
                onClick={openConfirmToMessage}
              >
                <Icon28MessageOutline />
              </IconButton>
            </Tooltip>
          )}
          {profileId !== product.owner.id &&
            checkPermissions(
              Permissions.All,
              product.owner.user.permissions
            ) && (
              <Tooltip title="Администратор сайта" placement="left">
                <LinkR to="/donate">
                  <IconButton
                    sx={{
                      marginBottom: (theme) => theme.spacing(1),
                      aspectRatio: "1 / 1",
                    }}
                    color="secondary"
                  >
                    <Icon24DoneOutline />
                  </IconButton>
                </LinkR>
              </Tooltip>
            )}
          {profileId !== product.owner.id &&
            !checkPermissions(
              Permissions.All,
              product.owner.user.permissions
            ) &&
            checkPermissions(
              Permissions.PremiumSubscription,
              product.owner.user.permissions
            ) && (
              <Tooltip title="Premium пользователь" placement="left">
                <LinkR to="/donate">
                  <IconButton
                    sx={{
                      marginBottom: (theme) => theme.spacing(1),
                      aspectRatio: "1 / 1",
                    }}
                    color="inherit"
                  >
                    <Icon24CrownOutline
                      style={{
                        color: process.env.REACT_APP_PREMIUM_COLOR,
                      }}
                    />
                  </IconButton>
                </LinkR>
              </Tooltip>
            )}
          {profileId !== product.owner.id &&
            !checkPermissions(
              Permissions.All,
              product.owner.user.permissions
            ) &&
            checkPermissions(
              Permissions.LiteSubscription,
              product.owner.user.permissions
            ) && (
              <Tooltip title="Lite пользователь" placement="left">
                <IconButton
                  sx={{
                    marginBottom: (theme) => theme.spacing(1),
                    aspectRatio: "1 / 1",
                  }}
                  href="/donate"
                  color="inherit"
                >
                  <Icon24CrownOutline
                    style={{
                      color: process.env.REACT_APP_LITE_COLOR,
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          {profileId === product.owner.id && (
            <Tooltip title="Редактировать" placement="left">
              <IconButton
                sx={{
                  marginBottom: (theme) => theme.spacing(1),
                  aspectRatio: "1 / 1",
                }}
                color="inherit"
                onClick={openEditForm}
              >
                <Icon28EditOutline />
              </IconButton>
            </Tooltip>
          )}
          {(profileId === product.owner.id ||
            checkPermissions(Permissions.ProductRemove, permissions)) && (
            <Tooltip title="Удалить" placement="left">
              <IconButton
                sx={{
                  marginBottom: (theme) => theme.spacing(1),
                  aspectRatio: "1 / 1",
                }}
                color="error"
                onClick={openConfirmToDelete}
              >
                <Icon28DeleteOutlineAndroid />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Профиль " + product.owner.nickname} placement="left">
            <LinkR to={"/profile/" + product.owner.id}>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
                badgeContent={
                  getLastOnline(product.owner.lastOnline) === "Онлайн" ? " " : 0
                }
                overlap="circular"
                color={"success"}
              >
                <Avatar src={product.owner.avatar}>
                  {product.owner.nickname.substring(0, 2)}
                </Avatar>
              </Badge>
            </LinkR>
          </Tooltip>
        </div>
      </Box>
    </Paper>
  );
};

export default ProductCard;
