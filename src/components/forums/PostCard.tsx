import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Icon12Circle,
  Icon24ChevronDown,
  Icon24CrownOutline,
  Icon24PenOutline,
  Icon28UserStarBadgeOutline,
} from "@vkontakte/icons";
import dayjs from "dayjs";
import React from "react";
import { Post, UserRoleEnum } from "../../graphql/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import {
  checkPermissionsWA,
  getLastOnline,
  getUserRoleString,
  Permissions,
} from "../../redux/userData/types";
import IconWrapper from "../ui/IconWrapper";
import ToJSX from "../utils/ToJSX";
import PostEdit from "./PostEdit";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const userId = useAppSelector((state) => state.userData.userId);
  const dispatch = useAppDispatch();
  const [openInfo, setOpenInfo] = React.useState(false);

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
      <Stack spacing={1} direction="row">
        <Stack spacing={0.5} sx={{ width: 160 }}>
          <Avatar
            src={post.owner?.avatar}
            children={post.owner?.nickname.substr(0, 1)}
            sx={{ width: 128, height: 128, alignSelf: "center" }}
            variant="rounded"
          />
          {post.owner && (
            <Typography
              variant="subtitle2"
              textAlign="center"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {post.owner?.nickname}
            </Typography>
          )}
          {post.owner && (
            <Stack spacing={0.5} direction="row" justifyContent="center">
              {post.owner?.userRole !== UserRoleEnum.None && (
                <Tooltip
                  title={`Персонал (${getUserRoleString(post.owner.userRole)})`}
                  placement="top"
                >
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: (theme) => theme.palette.info.main,
                        alignSelf: "center",
                        marginRight: "2px",
                        marginLeft: "2px",
                      }}
                      size={20}
                    >
                      <Icon28UserStarBadgeOutline />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {checkPermissionsWA(
                Permissions.Premium,
                post.owner.permissions
              ) && (
                <Tooltip title={`Premium`} placement="top">
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: process.env.REACT_APP_PREMIUM_COLOR,
                        alignSelf: "center",
                        marginRight: "2px",
                        marginLeft: "2px",
                      }}
                      size={20}
                    >
                      <Icon24CrownOutline />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {checkPermissionsWA(Permissions.Lite, post.owner.permissions) && (
                <Tooltip title={`Lite`} placement="top">
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: process.env.REACT_APP_LITE_COLOR,
                        alignSelf: "center",
                        marginRight: "2px",
                        marginLeft: "2px",
                      }}
                      size={20}
                    >
                      <Icon24CrownOutline />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {getLastOnline(post.owner.lastOnline) === "Онлайн" && (
                <Tooltip
                  title={getLastOnline(post.owner.lastOnline)}
                  placement="top"
                >
                  <Box sx={{ alignSelf: "center" }}>
                    <IconWrapper
                      sx={{
                        color: (theme) => theme.palette.success.main,
                        alignSelf: "center",
                      }}
                      size={16}
                    >
                      <Icon12Circle />
                    </IconWrapper>
                  </Box>
                </Tooltip>
              )}
              {/*getImageByRole(post.owner.role) !== null && (
                <LazyLoadImage
                  src={getImageByRole(post.owner.role) as any}
                  alt={post.owner.role ? post.owner.role : undefined}
                  style={{
                    imageRendering: "pixelated",
                    userSelect: "none",
                    display: "inline",
                    alignSelf: "center",
                    marginLeft: "2px",
                  }}
                  draggable={false}
                  height="20px"
                />
                )*/}
            </Stack>
          )}
        </Stack>
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          <Stack spacing={0.5} direction="row" justifyContent="space-between">
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Создан: {dayjs(post.createdAt).format("HH:mm DD.MM.YYYY")}
            </Typography>
            {post.updatedAt !== post.createdAt && (
              <Typography
                variant="subtitle2"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                Отредактирован:{" "}
                {dayjs(post.updatedAt).format("HH:mm DD.MM.YYYY")}
              </Typography>
            )}
          </Stack>
          {post.reply && (
            <Box>
              <Accordion
                expanded={openInfo}
                onChange={() => setOpenInfo((prev) => !prev)}
                elevation={1}
              >
                <AccordionSummary
                  expandIcon={
                    <IconWrapper>
                      <Icon24ChevronDown />
                    </IconWrapper>
                  }
                  aria-controls="infopanel"
                  id="infopanel-header"
                >
                  <Typography>
                    {post.reply.owner?.nickname} написал(а):
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ToJSX value={post.reply.message} />
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
          <ToJSX value={post.message} />
        </Stack>

        {post.owner?.userId === userId && (
          <Stack spacing={0.5}>
            <IconButton
              onClick={() => dispatch(setModal(<PostEdit post={post} />))}
            >
              <IconWrapper>
                <Icon24PenOutline />
              </IconWrapper>
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default PostCard;
