import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import gql from "graphql-tag";
import React from "react";
import { Product } from "../../graphql/graphql";
import ProductCard from "../product/ProductCard";

interface props {
  id: string;
}

const ProductChat: React.FC<props> = ({ id }) => {
  const { data, loading } = useQuery<{ product: Product }>(
    gql`
      query getProduct($id: ObjectID!) {
        product(id: $id) {
          id
          description
          cost
          createdAt
          isHighlighted
          amount
          icon {
            name
            image
            category {
              name
              color
            }
          }
          owner {
            id
            avatar
            nickname
            lastOnline
            user {
              permissions
            }
          }
        }
      }
    `,
    { variables: { id: id } }
  );

  return data ? (
    <Box
      sx={{
        padding: (theme) => theme.spacing(1),
        "& > *": {
          maxWidth: "320px",
        },
      }}
    >
      <ProductCard
        isChat
        product={data.product}
        removeProduct={() => {}}
        isProfile
      />
    </Box>
  ) : loading ? (
    <CircularProgress />
  ) : (
    <>![{id}]</>
  );
};

export default ProductChat;
