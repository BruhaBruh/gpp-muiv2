import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export interface ButtonRProps extends ButtonProps {
  to: string;
  replace?: boolean;
}

const ButtonR: React.FC<ButtonRProps> = ({ to, ...props }) => {
  return <Button {...(props as any)} to={to} component={Link} />;
};

export default ButtonR;
