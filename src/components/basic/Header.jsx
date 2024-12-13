import { useContext } from "react";
import { BsCalendar3RangeFill } from "react-icons/bs";
import { FaHome, FaInfoCircle, FaUser } from "react-icons/fa";
import {
  RiCalendarScheduleFill,
  RiLoginBoxFill,
  RiTodoFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
  const { hanedleChangeTheme } = useContext(ThemeContext);
  const { isLogin, handleChange } = useContext(LoginContext);
  return (
    <header>
      <Link to={"/"}>
        <FaHome />
        Home
      </Link>{" "}
      |{" "}
      <Link to={"/"}>
        <FaInfoCircle />
        About
      </Link>{" "}
      |{" "}
      <Link to={"/member"}>
        <FaUser />
        회원가입
      </Link>{" "}
      |{" "}
      <Link to={"/login"}>
        <RiLoginBoxFill />
        로그인
      </Link>{" "}
      |{" "}
      <Link to={"/todo"}>
        <RiTodoFill />
        Todo
      </Link>{" "}
      |{" "}
      <Link to={"/schedule"}>
        <RiCalendarScheduleFill />
        스케줄
      </Link>{" "}
      |{" "}
      <Link to={"/range"}>
        <BsCalendar3RangeFill />
        일정
      </Link>{" "}
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
