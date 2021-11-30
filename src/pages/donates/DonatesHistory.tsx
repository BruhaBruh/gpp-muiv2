import { gql, useQuery } from "@apollo/client";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { Icon24ClockOutline, Icon24DoneOutline } from "@vkontakte/icons";
import dayjs from "dayjs";
import React from "react";
import Cell from "../../components/ui/Cell";
import IconWrapper from "../../components/ui/IconWrapper";
import { User } from "../../graphql/types";

const DonatesHistory = () => {
  const { data, loading } = useQuery<{ me: User }>(gql`
    query mybills {
      me {
        userId
        bills {
          billId
          status
          amount
          createdAt
          completedAt
        }
      }
    }
  `);

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "auto",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      {loading && <LinearProgress />}
      {data?.me.bills && data?.me.bills.length === 0 && (
        <Typography variant="subtitle2">Вам еще не пополняли баланс</Typography>
      )}
      {data?.me.bills && data?.me.bills.length !== 0 && (
        <Paper
          sx={{ overflow: "hidden", padding: (theme) => theme.spacing(2) }}
        >
          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Пополнения
            </Typography>
            {data.me.bills
              .map((b) => b)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((b) => (
                <Cell
                  key={b.billId}
                  sx={{ textTransform: "none" }}
                  startIcon={<Typography>Cчет #{b.billId}</Typography>}
                  endIcon={
                    b.status === "PAID" ? (
                      <IconWrapper
                        size={20}
                        sx={{ color: (theme) => theme.palette.success.main }}
                      >
                        <Icon24DoneOutline />
                      </IconWrapper>
                    ) : (
                      <IconWrapper
                        size={20}
                        sx={{ color: (theme) => theme.palette.info.main }}
                      >
                        <Icon24ClockOutline />
                      </IconWrapper>
                    )
                  }
                >
                  Сумма: {b.amount}
                  <span style={{ marginLeft: "auto" }}>
                    Создан: {dayjs(b.createdAt).format("HH:mm DD.MM.YYYY")}{" "}
                    {b.completedAt &&
                      `Оплачен: ${dayjs(b.completedAt).format(
                        "HH:mm DD.MM.YYYY"
                      )}`}
                  </span>
                </Cell>
              ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default DonatesHistory;
