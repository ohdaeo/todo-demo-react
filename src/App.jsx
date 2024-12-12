import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoProvider } from "./contexts/TodoContext";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import { LoginProvider } from "./contexts/LoginContext";
import Join from "./member/Join";

// 내일 우리는 LocalStrage 와 React Context 로 알면 됨.

function App() {
  return (
    <TodoProvider>
      <Router>
        <ThemeProvider>
          <LoginProvider>
            <Layout>
              <Routes>
                {/* 소개 */}
                <Route path="/" element={<About />} />
                {/* 회원가입 */}
                <Route path="/member" element={<Join />} />
                {/* Todo 중첩 */}
                <Route path="/todo">
                  <Route index element={<TodoIndex />}></Route>
                  <Route path="add" element={<TodoAdd />}></Route>
                  <Route path="detail" element={<TodoDetail />}></Route>
                  <Route path="edit/:id" element={<TodoEdit />}></Route>
                </Route>
                {/* 잘못된 패스 */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Layout>
          </LoginProvider>
        </ThemeProvider>
      </Router>
    </TodoProvider>
  );
}
export default App;
