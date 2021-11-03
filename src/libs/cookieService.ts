export const getCookies = (): { key: string; value: string }[] => {
  return document.cookie
    .split("; ")
    .filter((el) => !!el)
    .map((cookie) => {
      return {
        key: cookie.split("=")[0],
        value: cookie.split("=")[1],
      };
    });
};

export const getCookie = (key: string): string | undefined => {
  return getCookies().filter((c) => c.key === key)[0]?.value;
};
