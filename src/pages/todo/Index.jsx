import { useContext, useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

function TodoList() {
  //Context 사용
  const { todoList } = useContext(TodoContext);
  console.log(todoList);
  const navigate = useNavigate();
  // useState 를 이용해서 목록을 map 으로 출력하시오.
  // useEffect 를 이용해서 할일 목록을 불러오시오.

  const handleClickAdd = () => {
    navigate("/todo/add");
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        {/* 여기에 목록 출력 */}
        <ul>
          {todoList.map(item => {
            return (
              <li key={item.id}>
                <TodoItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button
          onClick={() => {
            handleClickAdd();
          }}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
export default TodoList;
