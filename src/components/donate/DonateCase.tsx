import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { donateItems } from "../../donate/items";
import { Item, ItemType } from "../../donate/types";
import { CaseItem } from "../../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../redux/ui/reducer";
import { LootItem } from "../../utils/lootTable";

interface props {
  item: Item;
}

const DonateCase: React.FC<props> = ({ item }) => {
  const [items, setItems] = React.useState<(LootItem | null)[]>([]);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [lastItems, setLastItems] = React.useState<(LootItem | null)[]>([]);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [afterElement, setAfterElement] = React.useState<ReactElement | null>(
    null
  );
  const dispatch = useAppDispatch();
  const server = useAppSelector((state) => state.userData.serverId);
  const [openCase, { data: caseData, error: caseError }] = useMutation<{
    openCase: CaseItem;
  }>(gql`
    mutation openCase($case: Int!, $server: ObjectID!) {
      openCase(caseType: $case, server: $server) {
        type
        amount
      }
    }
  `);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!caseError) return;
    enqueueSnackbar(caseError.message, { variant: "error" });
  }, [caseError, enqueueSnackbar]);

  React.useEffect(() => {
    if (!item || !item.lootTable) return;
    let is: (LootItem | null)[] = [];
    for (let i = 0; i < Math.floor(Math.random() * 10) + 15; i++) {
      is = [...is, item.lootTable.choose()];
    }
    setItems(is);
    is = [];
    for (let i = 0; i < 5; i++) {
      is = [...is, item.lootTable.choose()];
    }
    setLastItems(is);
  }, [item]);

  const open = () => {
    setIsSpinning(true);
    if (!item || !item.lootTable) return;
    let is: (LootItem | null)[] = [];
    for (let i = 0; i < Math.floor(Math.random() * 10) + 15; i++) {
      is = [...is, item.lootTable.choose()];
    }
    setItems(is);
    is = [];
    for (let i = 0; i < 5; i++) {
      is = [...is, item.lootTable.choose()];
    }
    setLastItems(is);
    openCase({ variables: { case: item.type, server: server } });
  };

  React.useEffect(() => {
    if (!caseData) return;
    if (ref.current === null) return;
    const widthCenter = Math.ceil(
      (document.getElementById("roll") as HTMLElement).clientWidth / 2
    );
    const caseRoll = document.getElementById("case-roll") as HTMLElement;
    caseRoll.style.transform = "translateX(-64px)";
    const offset =
      ref.current.offsetLeft +
      Math.floor(Math.random() * 140) +
      5 -
      widthCenter;
    caseRoll.animate(
      [
        { transform: "translateX(-64px)" },
        {
          transform: `translateX(-${offset}px)`,
        },
      ],
      {
        // timing options
        delay: 1000,
        duration: 5000,
        easing: "cubic-bezier(0.260, 0.000, 0.000, 1.095)", // cubic-bezier(0.260, 0.000, 0.000, 1.095)
      }
    ).onfinish = () => {
      caseRoll.style.transform = `translateX(-${offset}px)`;
      setAfterElement(
        <Button
          color="inherit"
          size="medium"
          variant="text"
          fullWidth
          disableFocusRipple
          disableRipple
          sx={{ cursor: "default" }}
          endIcon={
            caseData.openCase.type !== ItemType.money
              ? donateItems.filter((i) => i.type === caseData.openCase.type)[0]
                  ?.name
              : `${caseData.openCase.amount} монет`
          }
        >
          <Typography
            variant="body1"
            sx={{ flex: 1, textTransform: "none", textAlign: "left" }}
          >
            Вам выпало
          </Typography>
        </Button>
      );
      setIsSpinning(false);
    };
  }, [ref, caseData]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={() => dispatch(setModal(null))}
      sx={{ userSelect: "none" }}
    >
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent className="hide-scrollbar">
        <Stack spacing={2}>
          <Box
            id="roll"
            sx={{ width: "100%", overflow: "hidden", position: "relative" }}
          >
            <Box
              component="span"
              sx={{
                width: 0,
                height: 0,
                position: "absolute",
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "block",
                zIndex: 10,
                borderTop: (theme) =>
                  `15px solid ${theme.palette.primary.main}`,
              }}
            />
            <div
              id={"case-roll"}
              style={{
                display: "flex",
                width: "min-content",
                transform: "translateX(-64px)",
              }}
            >
              {items.map((item) => {
                if (item === null) return <></>;
                if (item.type === ItemType.money) {
                  return (
                    <Box
                      sx={{
                        width: "150px",
                        height: "150px",
                        display: "flex",
                        color: (theme) => theme.palette.text.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                      children={
                        <svg viewBox={"0 0 24 24"} width={96} height={96}>
                          <g
                            clip-rule="evenodd"
                            fill="currentColor"
                            fill-rule="evenodd"
                          >
                            <path d="M9.2 8.2a.9.9 0 01.9-.9h3c1.602 0 2.9 1.198 2.9 2.8a2.9 2.9 0 01-2.9 2.9H11v1h1.886a.9.9 0 010 1.8H11v.6a.9.9 0 11-1.8 0v-.6h-.3a.9.9 0 010-1.8h.3v-1h-.3a.9.9 0 010-1.8h.3zm1.8 3h2.1a1.1 1.1 0 100-2.2H11z"></path>
                            <path d="M9.713 3.072a3.18 3.18 0 014.574 0l.225.233c.3.31.725.464 1.153.42l.302-.032a3.2 3.2 0 013.525 2.958l.022.303c.03.43.256.821.613 1.062l.252.17a3.2 3.2 0 01.799 4.532l-.178.246a1.4 1.4 0 00-.214 1.208l.084.292a3.2 3.2 0 01-2.301 3.986l-.295.073a1.4 1.4 0 00-.94.789l-.123.277a3.2 3.2 0 01-4.325 1.574l-.273-.133a1.4 1.4 0 00-1.226 0l-.273.133a3.2 3.2 0 01-4.325-1.574l-.124-.277a1.4 1.4 0 00-.94-.789l-.294-.073a3.2 3.2 0 01-2.3-3.986l.083-.292A1.4 1.4 0 003 12.964l-.179-.246a3.2 3.2 0 01.8-4.532l.251-.17a1.4 1.4 0 00.613-1.062l.022-.303a3.2 3.2 0 013.525-2.958l.302.031a1.4 1.4 0 001.153-.42zm3.28 1.25a1.38 1.38 0 00-1.985 0l-.226.233a3.2 3.2 0 01-2.634.96l-.302-.032a1.4 1.4 0 00-1.543 1.294l-.021.303A3.2 3.2 0 014.88 9.508l-.251.17a1.4 1.4 0 00-.35 1.983l.178.245a3.2 3.2 0 01.487 2.762l-.084.292a1.4 1.4 0 001.007 1.743l.295.074a3.2 3.2 0 012.148 1.802l.123.277a1.4 1.4 0 001.892.689l.273-.133a3.2 3.2 0 012.804 0l.273.133a1.4 1.4 0 001.892-.689l.123-.277a3.2 3.2 0 012.148-1.802l.295-.074a1.4 1.4 0 001.007-1.743l-.084-.292a3.2 3.2 0 01.487-2.762l.178-.245a1.4 1.4 0 00-.35-1.983l-.25-.17a3.2 3.2 0 01-1.403-2.428l-.021-.303a1.4 1.4 0 00-1.543-1.294l-.301.031a3.2 3.2 0 01-2.635-.959z"></path>
                          </g>
                        </svg>
                      }
                    />
                  );
                }
                return (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      height={150}
                      style={{ objectFit: "contain", position: "absolute" }}
                      src={
                        donateItems.filter((i) => i.type === item.type)[0]
                          ?.images[0]
                      }
                      alt={""}
                    />
                  </div>
                );
              })}
              {caseData && caseData.openCase.type === ItemType.money && (
                <Box
                  ref={ref}
                  sx={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    color: (theme) => theme.palette.text.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                  children={
                    <svg viewBox={"0 0 24 24"} width={96} height={96}>
                      <g
                        clip-rule="evenodd"
                        fill="currentColor"
                        fill-rule="evenodd"
                      >
                        <path d="M9.2 8.2a.9.9 0 01.9-.9h3c1.602 0 2.9 1.198 2.9 2.8a2.9 2.9 0 01-2.9 2.9H11v1h1.886a.9.9 0 010 1.8H11v.6a.9.9 0 11-1.8 0v-.6h-.3a.9.9 0 010-1.8h.3v-1h-.3a.9.9 0 010-1.8h.3zm1.8 3h2.1a1.1 1.1 0 100-2.2H11z"></path>
                        <path d="M9.713 3.072a3.18 3.18 0 014.574 0l.225.233c.3.31.725.464 1.153.42l.302-.032a3.2 3.2 0 013.525 2.958l.022.303c.03.43.256.821.613 1.062l.252.17a3.2 3.2 0 01.799 4.532l-.178.246a1.4 1.4 0 00-.214 1.208l.084.292a3.2 3.2 0 01-2.301 3.986l-.295.073a1.4 1.4 0 00-.94.789l-.123.277a3.2 3.2 0 01-4.325 1.574l-.273-.133a1.4 1.4 0 00-1.226 0l-.273.133a3.2 3.2 0 01-4.325-1.574l-.124-.277a1.4 1.4 0 00-.94-.789l-.294-.073a3.2 3.2 0 01-2.3-3.986l.083-.292A1.4 1.4 0 003 12.964l-.179-.246a3.2 3.2 0 01.8-4.532l.251-.17a1.4 1.4 0 00.613-1.062l.022-.303a3.2 3.2 0 013.525-2.958l.302.031a1.4 1.4 0 001.153-.42zm3.28 1.25a1.38 1.38 0 00-1.985 0l-.226.233a3.2 3.2 0 01-2.634.96l-.302-.032a1.4 1.4 0 00-1.543 1.294l-.021.303A3.2 3.2 0 014.88 9.508l-.251.17a1.4 1.4 0 00-.35 1.983l.178.245a3.2 3.2 0 01.487 2.762l-.084.292a1.4 1.4 0 001.007 1.743l.295.074a3.2 3.2 0 012.148 1.802l.123.277a1.4 1.4 0 001.892.689l.273-.133a3.2 3.2 0 012.804 0l.273.133a1.4 1.4 0 001.892-.689l.123-.277a3.2 3.2 0 012.148-1.802l.295-.074a1.4 1.4 0 001.007-1.743l-.084-.292a3.2 3.2 0 01.487-2.762l.178-.245a1.4 1.4 0 00-.35-1.983l-.25-.17a3.2 3.2 0 01-1.403-2.428l-.021-.303a1.4 1.4 0 00-1.543-1.294l-.301.031a3.2 3.2 0 01-2.635-.959z"></path>
                      </g>
                    </svg>
                  }
                />
              )}
              {caseData && caseData.openCase.type !== ItemType.money && (
                <div
                  ref={ref}
                  style={{
                    width: "150px",
                    height: "150px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    height={150}
                    style={{ objectFit: "contain", position: "absolute" }}
                    src={
                      donateItems.filter(
                        (i) => i.type === caseData.openCase.type
                      )[0]?.images[0]
                    }
                    alt={""}
                  />
                </div>
              )}
              {lastItems.map((item) => {
                if (item === null) return <></>;
                if (item.type === ItemType.money) {
                  return (
                    <Box
                      sx={{
                        width: "150px",
                        height: "150px",
                        display: "flex",
                        color: (theme) => theme.palette.text.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                      children={
                        <svg viewBox={"0 0 24 24"} width={96} height={96}>
                          <g
                            clip-rule="evenodd"
                            fill="currentColor"
                            fill-rule="evenodd"
                          >
                            <path d="M9.2 8.2a.9.9 0 01.9-.9h3c1.602 0 2.9 1.198 2.9 2.8a2.9 2.9 0 01-2.9 2.9H11v1h1.886a.9.9 0 010 1.8H11v.6a.9.9 0 11-1.8 0v-.6h-.3a.9.9 0 010-1.8h.3v-1h-.3a.9.9 0 010-1.8h.3zm1.8 3h2.1a1.1 1.1 0 100-2.2H11z"></path>
                            <path d="M9.713 3.072a3.18 3.18 0 014.574 0l.225.233c.3.31.725.464 1.153.42l.302-.032a3.2 3.2 0 013.525 2.958l.022.303c.03.43.256.821.613 1.062l.252.17a3.2 3.2 0 01.799 4.532l-.178.246a1.4 1.4 0 00-.214 1.208l.084.292a3.2 3.2 0 01-2.301 3.986l-.295.073a1.4 1.4 0 00-.94.789l-.123.277a3.2 3.2 0 01-4.325 1.574l-.273-.133a1.4 1.4 0 00-1.226 0l-.273.133a3.2 3.2 0 01-4.325-1.574l-.124-.277a1.4 1.4 0 00-.94-.789l-.294-.073a3.2 3.2 0 01-2.3-3.986l.083-.292A1.4 1.4 0 003 12.964l-.179-.246a3.2 3.2 0 01.8-4.532l.251-.17a1.4 1.4 0 00.613-1.062l.022-.303a3.2 3.2 0 013.525-2.958l.302.031a1.4 1.4 0 001.153-.42zm3.28 1.25a1.38 1.38 0 00-1.985 0l-.226.233a3.2 3.2 0 01-2.634.96l-.302-.032a1.4 1.4 0 00-1.543 1.294l-.021.303A3.2 3.2 0 014.88 9.508l-.251.17a1.4 1.4 0 00-.35 1.983l.178.245a3.2 3.2 0 01.487 2.762l-.084.292a1.4 1.4 0 001.007 1.743l.295.074a3.2 3.2 0 012.148 1.802l.123.277a1.4 1.4 0 001.892.689l.273-.133a3.2 3.2 0 012.804 0l.273.133a1.4 1.4 0 001.892-.689l.123-.277a3.2 3.2 0 012.148-1.802l.295-.074a1.4 1.4 0 001.007-1.743l-.084-.292a3.2 3.2 0 01.487-2.762l.178-.245a1.4 1.4 0 00-.35-1.983l-.25-.17a3.2 3.2 0 01-1.403-2.428l-.021-.303a1.4 1.4 0 00-1.543-1.294l-.301.031a3.2 3.2 0 01-2.635-.959z"></path>
                          </g>
                        </svg>
                      }
                    />
                  );
                }
                return (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      height={150}
                      style={{ objectFit: "contain", position: "absolute" }}
                      src={
                        donateItems.filter((i) => i.type === item.type)[0]
                          ?.images[0]
                      }
                      alt={""}
                    />
                  </div>
                );
              })}
            </div>
          </Box>
          {afterElement}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            color="primary"
            size="medium"
            type="submit"
            variant="outlined"
            fullWidth
            disabled={isSpinning}
            onClick={open}
          >
            Открыть
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DonateCase;
