import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setHeader, setSidebarHeader } from "../../redux/ui/reducer";

const Head: React.FC<{ name: string; showBack?: boolean }> = ({
  name,
  showBack,
}) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (name === undefined) return;
    document.title = name ? name : "GPPlanet";
    dispatch(setHeader(name));
    dispatch(setSidebarHeader(!!showBack));
  }, [name, dispatch, showBack]);

  return <></>;
};

export default Head;
