import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
import "./GlobalCSS.css";
import Home from "./pages/Home";
import Employee from "./pages/Employee";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/employee/:id" element={<Employee />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
