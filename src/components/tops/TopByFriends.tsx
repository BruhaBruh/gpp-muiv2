import { Stack, Typography } from "@mui/material";
import {
  Icon201CircleFillGold,
  Icon202CircleFillSilver,
  Icon203CircleFillBronze,
} from "@vkontakte/icons";
import React from "react";
import { User, UserTopEnum } from "../../graphql/types";
import Head from "../ui/Head";
import IconWrapper from "../ui/IconWrapper";
import UserCell from "../users/UserCell";

const TopByFriends: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <Stack spacing={1}>
      <Head name="Топ по друзьям" />
      {users.map((u, i) => (
        <Stack spacing={1} direction="row">
          <Typography
            variant="h6"
            sx={{
              width: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i === 0 && (
              <IconWrapper>
                <Icon201CircleFillGold />
              </IconWrapper>
            )}
            {i === 1 && (
              <IconWrapper>
                <Icon202CircleFillSilver />
              </IconWrapper>
            )}
            {i === 2 && (
              <IconWrapper>
                <Icon203CircleFillBronze />
              </IconWrapper>
            )}
            {i > 2 && i + 1}
          </Typography>
          <UserCell user={u} key={u.userId} type={UserTopEnum.Friends} />
        </Stack>
      ))}
    </Stack>
  );
};

export default TopByFriends;
