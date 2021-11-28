import { gql, useLazyQuery } from "@apollo/client";
import { Box, lighten, LinearProgress, Paper, Stack } from "@mui/material";
import { Icon24CrownOutline, Icon28CubeBoxOutline } from "@vkontakte/icons";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  DonateitemFilterInput,
  DonateItemsConnection,
} from "../../graphql/types";
import IconWrapper from "../ui/IconWrapper";
import DonateCard from "./DonateCard";

const DonateList = () => {
  const [donateFilter, setDonateFilter] = React.useState<0 | 1 | 2 | 3 | -1>(0);
  const [where, setWhere] = React.useState<DonateitemFilterInput | null>(null);
  const [getItems, { data, loading }] = useLazyQuery<{
    donateItems: DonateItemsConnection;
  }>(gql`
    query donateItems($where: DonateitemFilterInput) {
      donateItems(first: 50, where: $where) {
        nodes {
          donateitemId
          name
          description
          type
          amount
          cost
          icon
        }
      }
    }
  `);

  React.useEffect(() => {
    switch (donateFilter) {
      case -1:
        return setWhere({ type: { nlte: 3 } });
      case 1:
        return setWhere({ type: { eq: 0 } });
      case 2:
        return setWhere({ type: { eq: 1 } });
      case 3:
        return setWhere({ type: { eq: 3 } });
    }
    setWhere({ type: { neq: 2 } });
  }, [donateFilter]);

  React.useEffect(() => {
    getItems({ variables: { where } });
  }, [where, getItems]);

  return (
    <Stack spacing={2}>
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
      >
        <ScrollContainer vertical={false} hideScrollbars>
          <Stack direction="row" spacing={2} sx={{ width: "max-content" }}>
            <Box
              onClick={() => setDonateFilter(0)}
              sx={{
                color: (theme) =>
                  donateFilter === 0
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
              }}
            >
              Все
            </Box>
            <Box
              onClick={() => setDonateFilter(1)}
              sx={{
                color: (theme) =>
                  donateFilter === 1
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
                display: "flex",
              }}
            >
              <Box sx={{ alignSelf: "center", marginRight: "4px" }}>
                <IconWrapper
                  sx={{
                    color:
                      donateFilter === 1
                        ? lighten(
                            process.env.REACT_APP_PREMIUM_COLOR as string,
                            0.15
                          )
                        : process.env.REACT_APP_PREMIUM_COLOR,
                  }}
                  size={20}
                >
                  <Icon24CrownOutline />
                </IconWrapper>
              </Box>
              Premium
            </Box>
            <Box
              onClick={() => setDonateFilter(2)}
              sx={{
                color: (theme) =>
                  donateFilter === 2
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
                display: "flex",
              }}
            >
              <Box sx={{ alignSelf: "center", marginRight: "4px" }}>
                <IconWrapper
                  sx={{
                    color:
                      donateFilter === 2
                        ? lighten(
                            process.env.REACT_APP_LITE_COLOR as string,
                            0.15
                          )
                        : process.env.REACT_APP_LITE_COLOR,
                  }}
                  size={20}
                >
                  <Icon24CrownOutline />
                </IconWrapper>
              </Box>
              Lite
            </Box>
            <Box
              onClick={() => setDonateFilter(3)}
              sx={{
                color: (theme) =>
                  donateFilter === 3
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
                display: "flex",
              }}
            >
              <Box sx={{ alignSelf: "center", marginRight: "4px" }}>
                <IconWrapper
                  sx={{
                    color: (theme) =>
                      donateFilter === 3
                        ? theme.palette.info.main
                        : theme.palette.info.dark,
                  }}
                  size={20}
                >
                  <Icon28CubeBoxOutline />
                </IconWrapper>
              </Box>
              Кейсы
            </Box>
            {/*<Box
              onClick={() => setDonateFilter(-1)}
              sx={{
                color: (theme) =>
                  donateFilter === -1
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                cursor: "pointer",
                display: "flex",
              }}
            >
              Остальное
            </Box>*/}
          </Stack>
        </ScrollContainer>
      </Paper>
      {loading && <LinearProgress />}
      {data?.donateItems.nodes && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))",
            gap: (theme) => theme.spacing(2),
          }}
        >
          {data.donateItems.nodes.map((item) => (
            <DonateCard item={item} key={item.donateitemId} />
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default DonateList;
