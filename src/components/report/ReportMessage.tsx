import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon24ReplyOutline } from "@vkontakte/icons";
import React from "react";
import Linkify from "react-linkify";
import { Reportmessage } from "../../graphql/types";
import { getLastOnline } from "../../redux/userData/types";
import IconWrapper from "../ui/IconWrapper";
import LinkR from "../ui/LinkR";

const ReportMessage: React.FC<{
  isLeft: boolean;
  message: Reportmessage;
  prev: Reportmessage | undefined;
  next: Reportmessage | undefined;
  setReplied: React.Dispatch<React.SetStateAction<Reportmessage | null>>;
}> = ({ isLeft, message, prev, next, setReplied }) => {
  const [seeButton, setSeeButton] = React.useState(false);

  return (
    <Stack spacing={0.5}>
      {message.replymessage && (
        <Stack
          spacing={0.5}
          direction={isLeft ? "row" : "row-reverse"}
          sx={{ padding: (theme) => `0 ${theme.spacing(1)}` }}
        >
          <Box sx={{ minWidth: 16, minHeight: 16, width: 16, height: 16 }} />
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            badgeContent={
              getLastOnline(message.replymessage.owner.lastOnline) === "Онлайн"
                ? " "
                : 0
            }
            overlap="circular"
            color={"success"}
            sx={{
              height: "min-content",
              alignSelf: "center",
              ".MuiBadge-dot": {
                border: (theme) =>
                  `2px solid ${theme.palette.background.paper}`,
                minWidth: "auto",
                width: "4px",
                height: "4px",
                borderRadius: "100px",
                boxSizing: "content-box",
              },
            }}
          >
            <Avatar
              src={message.replymessage.owner.avatar}
              children={message.replymessage.owner.nickname.substr(0, 1)}
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </Badge>
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              alignSelf: "center",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              "& a": {
                color: "currentColor",
              },
            }}
          >
            <Linkify>{message.replymessage.message}</Linkify>
          </Typography>
        </Stack>
      )}
      <Stack
        onMouseEnter={() => setSeeButton(true)}
        onMouseLeave={() => setSeeButton(false)}
        spacing={0.5}
        direction={isLeft ? "row" : "row-reverse"}
      >
        {!(prev && prev.ownerId === message.ownerId) ? (
          <LinkR to={`/u/${message.ownerId}`} sx={{ alignSelf: "end" }}>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              badgeContent={
                getLastOnline(message.owner.lastOnline) === "Онлайн" ? " " : 0
              }
              overlap="circular"
              color={"success"}
              sx={{
                height: "min-content",
                ".MuiBadge-dot": {
                  border: (theme) =>
                    `2px solid ${theme.palette.background.paper}`,
                  minWidth: "auto",
                  width: "4px",
                  height: "4px",
                  borderRadius: "100px",
                  boxSizing: "content-box",
                },
              }}
            >
              <Avatar
                src={message.owner.avatar}
                children={message.owner.nickname.substr(0, 1)}
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </Badge>
          </LinkR>
        ) : (
          <Box sx={{ minWidth: 16, minHeight: 16, width: 16, height: 16 }} />
        )}
        <Paper
          sx={{
            padding: (theme) => `${theme.spacing(1)} ${theme.spacing(1.5)}`,
            borderEndStartRadius: (theme) =>
              isLeft && prev && prev.ownerId === message.ownerId
                ? theme.spacing(0.5)
                : undefined,
            borderStartStartRadius: (theme) =>
              isLeft && next && next.ownerId === message.ownerId
                ? theme.spacing(0.5)
                : undefined,
            borderEndEndRadius: (theme) =>
              !isLeft && prev && prev.ownerId === message.ownerId
                ? theme.spacing(0.5)
                : undefined,
            borderStartEndRadius: (theme) =>
              !isLeft && next && next.ownerId === message.ownerId
                ? theme.spacing(0.5)
                : undefined,
            whiteSpace: "pre-wrap",
            backgroundColor: (theme) =>
              !isLeft ? theme.palette.primary.main : undefined,
            color: (theme) =>
              !isLeft
                ? theme.palette.getContrastText(theme.palette.primary.main)
                : undefined,
            "& .MuiLink-root": {
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.primary.main),
              fontStyle: "italic",
            },
            "& a": {
              color: "currentColor",
            },
          }}
          elevation={2}
        >
          <Linkify>{message.message}</Linkify>
        </Paper>
        {seeButton ? (
          <IconButton
            color="inherit"
            sx={{
              alignSelf: "end",
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => setReplied(message)}
          >
            <IconWrapper size={16}>
              <Icon24ReplyOutline />
            </IconWrapper>
          </IconButton>
        ) : (
          <Box sx={{ minWidth: 26, minHeight: 26, width: 26, height: 26 }} />
        )}
      </Stack>
    </Stack>
  );
};

export default ReportMessage;
