import { Fab } from "@mui/material";
import { Icon28ArrowUpOutline } from "@vkontakte/icons";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return isVisible ? (
    <Fab
      size="medium"
      sx={{
        position: "fixed",
        bottom: (theme) => theme.spacing(2),
        left: (theme) => theme.spacing(2),
        zIndex: 1000,
      }}
      onClick={scrollToTop}
    >
      <Icon28ArrowUpOutline />
    </Fab>
  ) : (
    <></>
  );
};

export default ScrollToTop;
