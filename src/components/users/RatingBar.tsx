import { Box, BoxProps } from "@mui/material";
import React from "react";
import { UserRating } from "../../graphql/types";

const RatingBar: React.FC<{ rating: UserRating } & BoxProps> = ({
  rating,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        alignSelf: "center",
        minWidth: "28px",
        maxWidth: "128px",
        width: "100%",
        height: "4px",
        borderRadius: "2px",
        backgroundColor: (theme) => theme.palette.text.disabled,
        overflow: "hidden",
      }}
      {...props}
    >
      <Box
        sx={{
          height: "100%",
          backgroundColor: (theme) => theme.palette.success.main,
          flexBasis: `${rating.positive / (rating.total / 100)}%`,
        }}
      />
      <Box
        sx={{
          height: "100%",
          backgroundColor: (theme) => theme.palette.error.main,
          flexBasis: `${rating.negative / (rating.total / 100)}%`,
        }}
      />
    </Box>
  );
};

export default RatingBar;
