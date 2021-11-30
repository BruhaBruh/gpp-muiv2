import { Box } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";

const RichText: React.FC<{
  value: string | undefined;
  onChange: ((content: string) => void) | undefined;
}> = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        "& *": {
          color: (theme) => `${theme.palette.text.primary} !important`,
          stroke: (theme) => `${theme.palette.text.primary} !important`,
          "& .ql-fill": {
            fill: (theme) => `${theme.palette.text.primary} !important`,
          },
          "&.ql-active": {
            color: (theme) => `${theme.palette.primary.main} !important`,
            stroke: (theme) => `${theme.palette.primary.main} !important`,
          },
          "&.ql-active .ql-stroke": {
            color: (theme) => `${theme.palette.primary.main} !important`,
            stroke: (theme) => `${theme.palette.primary.main} !important`,
          },
          "&.ql-active .ql-fill": {
            fill: (theme) => `${theme.palette.primary.main} !important`,
            stroke: (theme) => `${theme.palette.primary.main} !important`,
          },
        },
        "& .quill": {
          borderRadius: (theme) => theme.spacing(1),
          border: (theme) => `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
        },
        "& .ql-toolbar": {
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: (theme) => theme.palette.background.paper,
        },
        "& .ql-container, & .ql-toolbar": {
          border: "none",
        },
        "& .ql-picker-options": {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
    >
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </Box>
  );
};

export default RichText;
