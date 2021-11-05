import { Box } from "@mui/system";
import React from "react";
import { Product } from "../../graphql/graphql";
import ProductCard from "./ProductCard";

interface props {
  products: Product[];
}
const ProductsList: React.FC<props> = ({ products }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
        gap: (theme) => theme.spacing(2),
      }}
    >
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            removeProduct={() => {}}
            product={product}
            isProfile
          />
        );
      })}
    </Box>
  );
};

export default ProductsList;
