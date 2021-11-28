import { Link } from "@mui/material";
import React from "react";

const Linkify: React.FC<{ children: string }> = ({ children }) => {
  const [contents, setContents] = React.useState<any[]>([]);

  React.useEffect(() => {
    let tokens = children.split(/\s/);

    setContents(
      tokens.map((token, i) => {
        let hasSpace = i !== tokens.length - 1;
        let maybeSpace = hasSpace ? " " : "";

        if (
          token.match(
            // eslint-disable-next-line
            /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/
          )
        ) {
          return (
            <Link key={i} href={token}>
              {token}
              {maybeSpace}
            </Link>
          );
        } else {
          return token + maybeSpace;
        }
      })
    );
  }, [children]);

  return <>{contents}</>;
};

export default Linkify;
