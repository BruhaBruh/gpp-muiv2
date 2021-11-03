import { Link, LinkProps } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export interface LinkRProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkR: React.FC<LinkRProps> = ({ to, ...props }) => {
  return <Link {...(props as any)} component={RouterLink} to={to} />;
};

export default LinkR;
