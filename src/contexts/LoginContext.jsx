import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const LS_COOKIE = "loginCookie";
const LS_SESSION = "loginSession";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(LS_COOKIE);

  const [isLogin, setIsLogin] = useState(false);
  const handleChange = on => {
    setIsLogin(!on);
    //로컬저장소
    localStorage.setItem("login", JSON.stringify(!on));
    //세션
    sessionStorage.setItem(LS_SESSION, JSON.stringify(!on));
    //쿠키저장소
    setCookie(LS_COOKIE, !on, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    //const on = localStorage.getItem("login");
    const onCookie = cookie[LS_COOKIE];
    const onSS = sessionStorage.getItem(LS_SESSION);

    {
      /*} if (on) {
      setIsLogin(JSON.parse(on));
    } else {
      localStorage.setItem("login", JSON.stringify(false));
  }
  */
    }
    //세션
    if (onSS) {
      setIsLogin(JSON.parse(onSS));
    } else {
      sessionStorage.setItem(LS_SESSION, JSON.stringify(false));
    }
    //쿠키
    if (onCookie) {
      setIsLogin(onCookie);
    } else {
      setCookie(LS_COOKIE, false, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, handleChange }}>
      {children}
    </LoginContext.Provider>
  );
};
