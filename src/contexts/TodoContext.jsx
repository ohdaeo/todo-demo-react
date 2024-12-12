import { createContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

// 1. Context 생성
export const TodoContext = createContext();

//local storage 여러가지 값이 보관되므로 구분용 Key가 필요
const TODO_LS_KEY = "todos";

const TO_COOKIE_NAME = "todosCookie";

const TODO_SESSION_KEY = "todosSession";

//2. Context를 활용할 Provider(공급) 생성
export const TodoProvider = ({ children }) => {
  //쿠키 라이브러리 사용
  const [cookies, setCookie, removeCookie] = useCookies([TO_COOKIE_NAME], {});

  //3. 관리하고자하는 state 및 state를 업데이트하는 기능들
  //const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);

  // 1. todolist 를 추가하는 기능
  const addTodo = formData => {
    // console.log("formData ", formData);
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    //로컬 저장
    //setCountId(prev => prev + 1);
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));

    //세션 저장 (웹브라우저 임시 보관)
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));

    //쿠키에 저장함 (서버 연동 보관이 아님 (비추천))
    setCookie(TO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  //2. todolist에서 특정 todo를 제거
  const deleteTodo = id => {
    // 할일 목록 한개를 삭제하기
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);

    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));

    //세션 삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newList]));
    setCookie(TO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
    alert(`${id} 삭제했어요`);
  };

  //3. todolist 에서 특정 todo를 수정
  const updateTodo = formData => {
    console.log("formData ", formData);

    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });

    setTodoList(newTodoData);
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    //세션 저장 (웹브라우저 임시 보관)
    sessionStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    setCookie(TO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const resetTodo = () => {
    setTodoList([]);
    localStorage.clear(TODO_LS_KEY);
    removeCookie(TO_COOKIE_NAME);
    //세션 리셋
    sessionStorage.clear(TODO_SESSION_KEY);
  };
  //todoList state상태가 바뀌면 실행한다

  //Context에서 화면이 출력될때, local Storage에서 값을 읽어온다.
  //이때 Key는 TODO_LS_KEY에 담긴 값을 이용해서 가져온다.
  useEffect(() => {
    //웹브라우저 Local Storage에 값을 읽어들인다.
    const todos = localStorage.getItem(TODO_LS_KEY);
    const todosSession = sessionStorage.getItem(TODO_SESSION_KEY);
    const todosCookie = cookies[TO_COOKIE_NAME];
    {
      //로컬 초기화
      /*if (todos) {
      //있을 때

      //글자를 js에서 사용할수있도록 변환
      const datas = JSON.parse(todos);
      //console.log(datas);
      setTodoList(datas);
    } else {
      //없을 때
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
    }*/
    }

    //세션 초기화
    if (todosSession) {
      //있을 때

      //글자를 js에서 사용할수있도록 변환
      const datas = JSON.parse(todosSession);
      //console.log(datas);
      setTodoList(datas);
    } else {
      //없을 때
      sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(todoList));
    }
    //쿠키 초기화
    if (todosCookie) {
      setTodoList(todosCookie);
    } else {
      setCookie(TO_COOKIE_NAME, [], {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }

    return () => {};
  }, []);

  //4. provider에 valu에 원하는 기능 및 state를 전달
  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {/* 컴포넌트를 children으로 주입 */}
      {children}
    </TodoContext.Provider>
  );
};
