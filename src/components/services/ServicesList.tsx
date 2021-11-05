import { Box } from "@mui/system";
import React from "react";
import { Product } from "../../graphql/graphql";
import ServiceCard from "./ServiceCard";

interface props {
  services: Product[];
}
const ServicesList: React.FC<props> = ({ services }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
        gap: (theme) => theme.spacing(2),
      }}
    >
      {services.map((service) => {
        return (
          <ServiceCard
            key={service.id}
            removeService={() => {}}
            product={service}
            isProfile
          />
        );
      })}
    </Box>
  );
};

export default ServicesList;
