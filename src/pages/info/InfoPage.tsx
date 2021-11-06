import { Paper, Stack } from "@mui/material";
import React from "react";
import NewsList from "../../components/info/NewsList";
import StyledTab from "../../components/ui/StyledTab";
import StyledTabs from "../../components/ui/StyledTabs";

const InfoPage = () => {
  const [section, setSection] = React.useState<"NEWS" | "RULES" | "LAW">(
    "NEWS"
  );

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "auto",
        width: "100%",
        height: "100%",
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <StyledTabs
        value={section}
        onChange={(_, v) => setSection(v)}
        variant="fullWidth"
      >
        <StyledTab label="Новости" value="NEWS" />
        <StyledTab label="Правила" value="RULES" />
        <StyledTab label="Закон" value="LAW" />
      </StyledTabs>
      {section === "NEWS" && <NewsList />}
      {section === "RULES" && (
        <Paper
          sx={{
            overflow: "hidden",
            padding: (theme) => theme.spacing(2),
            flex: 1,
          }}
        >
          <iframe
            title="Правила"
            src="https://docs.google.com/document/d/1oISYSHokk-Jsm8zat-1hYO4LT5wqrFRCeey0UucQy04/view"
            width="100%"
            style={{ border: "none", height: "100%" }}
          />
        </Paper>
      )}
      {section === "LAW" && (
        <Paper
          sx={{
            overflow: "hidden",
            padding: (theme) => theme.spacing(2),
            flex: 1,
          }}
        >
          <iframe
            title="Занон"
            src="https://docs.google.com/document/d/13lxXX4vvUljRJ8AMzdvLOL7A9urCQ2wmvuCAIhMlT-Q/edit"
            width="100%"
            style={{ border: "none", height: "100%" }}
          />
        </Paper>
      )}
    </Stack>
  );
};

export default InfoPage;
