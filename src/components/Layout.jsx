import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Footer from "./basic/Footer";
import Header from "./basic/Header";

const Layout = ({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: `${theme}` }}>
      <Header theme={theme} setTheme={setTheme} />

      <main>{children}</main>
      <Footer>
        <p>Copyright 2024. By Hong</p>
      </Footer>
    </div>
  );
};
export default Layout;
