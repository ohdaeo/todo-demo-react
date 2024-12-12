import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaHome } from "react-icons/fa";

const Header = () => {
  const { hanedleChangeTheme } = useContext(ThemeContext);
  const { isLogin, handleChange } = useContext(LoginContext);
  return (
    <header>
      <Link to={"/"}>
        <FaHome />
        Home
      </Link>
      | <Link to={"/"}>About</Link> | <Link to={"/member"}>회원가입</Link> |{" "}
      <Link to={"/todo"}>Todo</Link>
      <button
        onClick={() => {
          handleChange(isLogin);
        }}
      >
        {isLogin ? "logout" : "login"}
      </button>
      <button
        onClick={() => {
          hanedleChangeTheme();
        }}
      >
        테마변경
      </button>
    </header>
  );
};
export default Header;
