import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Icon24Add, Icon24Gallery, Icon24Tag } from "@vkontakte/icons";
import React from "react";
import { Category, Permissions } from "../../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setModal } from "../../../redux/ui/reducer";
import { checkPermissions } from "../../../redux/userData/types";
import CreateCategory from "./CreateCategory";
import CreateIcon from "./CreateIcon";
import EditCategory from "./EditCategory";
import EditIcon from "./EditIcon";

interface props {
  categories: Category[];
}

const AdminActions: React.FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const permissions = useAppSelector((state) => state.userData.permissions);

  const openCreateCategory = () => dispatch(setModal(<CreateCategory />));
  const openCreateIcon = () =>
    dispatch(setModal(<CreateIcon categories={categories} />));
  const openEditCategory = () =>
    dispatch(setModal(<EditCategory categories={categories} />));
  const openEditIcon = () =>
    dispatch(setModal(<EditIcon categories={categories} />));

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
    >
      <DialogTitle>Админ-действия</DialogTitle>
      <DialogContent className="hide-scrollbar">
        <Stack spacing={2}>
          {checkPermissions(Permissions.CategoryModify, permissions) && (
            <Button
              onClick={openCreateCategory}
              startIcon={<Icon24Add />}
              endIcon={<Icon24Tag />}
              color="success"
              size="medium"
              variant="outlined"
              fullWidth
            >
              Создать Категорию
            </Button>
          )}
          {checkPermissions(Permissions.IconModify, permissions) && (
            <Button
              onClick={openCreateIcon}
              startIcon={<Icon24Add />}
              endIcon={<Icon24Gallery />}
              color="success"
              size="medium"
              variant="outlined"
              fullWidth
            >
              Создать Иконку
            </Button>
          )}
          {checkPermissions(Permissions.CategoryModify, permissions) && (
            <Button
              onClick={openEditCategory}
              startIcon={<Icon24Add />}
              endIcon={<Icon24Tag />}
              color="primary"
              size="medium"
              variant="outlined"
              fullWidth
            >
              Редактирование Категории
            </Button>
          )}
          {checkPermissions(Permissions.IconModify, permissions) && (
            <Button
              onClick={openEditIcon}
              startIcon={<Icon24Add />}
              endIcon={<Icon24Gallery />}
              color="primary"
              size="medium"
              variant="outlined"
              fullWidth
            >
              Редактирование Иконки
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AdminActions;
