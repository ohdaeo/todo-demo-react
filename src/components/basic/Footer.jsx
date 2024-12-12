import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";

const Footer = ({ children }) => {
  const { resetTodo } = useContext(TodoContext);
  return (
    <div>
      <button
        onClick={() => {
          resetTodo();
        }}
      >
        reset
      </button>
      {children}
    </div>
  );
};
export default Footer;
