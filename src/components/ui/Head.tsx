import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setHeader } from "../../redux/ui/reducer";

const Head: React.FC<{ name: string }> = ({ name }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (name === undefined) return;
    document.title = name ? name : "GPPlanet";
    dispatch(setHeader(name));
  }, [name, dispatch]);

  return <></>;
};

export default Head;
