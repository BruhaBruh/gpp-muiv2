import { Box, BoxProps } from "@mui/material";
import React from "react";
import { ProfileRating } from "../../graphql/graphql";

const RatingBar: React.FC<{ rating: ProfileRating } & BoxProps> = ({
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
        backgroundColor: "red",
        overflow: "hidden",
      }}
      {...props}
    >
      <Box
        sx={{
          height: "100%",
          backgroundColor: (theme) => theme.palette.success.main,
          flexBasis: `${
            rating.positive / ((rating.positive + rating.negative) / 100)
          }%`,
        }}
      />
    </Box>
  );
};

export default RatingBar;
