import Box from "@mui/material/Box";
import React from "react";
import JsxParser from "react-jsx-parser";

const ToJSX: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Box
      sx={{
        "& *": {
          listStylePosition: "inside",
          color: (theme) => `${theme.palette.text.primary} !important`,
        },
      }}
    >
      <JsxParser autoCloseVoidElements jsx={value} />
    </Box>
  );
};

export default ToJSX;
