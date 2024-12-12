import { useEffect, useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";

const THEME_COOKIE = "themeCookie";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(THEME_COOKIE);

  const [theme, setTheme] = useState("black");
  const hanedleChangeTheme = () => {
    const nowTheme = theme === "black" ? "white" : "black";
    setTheme(nowTheme);
    localStorage.setItem("theme", JSON.stringify(nowTheme));

    setCookie(THEME_COOKIE, theme, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    setCookie(THEME_COOKIE, theme, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
    const nowtheme = localStorage.getItem("theme");
    const themeCookie = cookies[THEME_COOKIE];
    if (nowtheme) {
      setTheme(JSON.parse(nowtheme));
    } else {
      localStorage.setItem("theme", JSON.stringify(theme));

      setCookie(THEME_COOKIE, theme, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
    if (themeCookie) {
      setCookie(themeCookie);
    } else {
      setCookie(THEME_COOKIE, theme, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hanedleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
