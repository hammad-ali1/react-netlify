import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
import "./GlobalCSS.css";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Navbar from "./components/Navbar/Navbar";
import Dialog from "./components/Dialog/Dialog";
//Redux
import { useAppDispatch } from "./app/hooks";
import { setIsOpen } from "./components/Dialog/dialogSlice";
function App() {
  const dispatch = useAppDispatch();
  const navLinks = [
    { text: "Login", onClickHandler: () => 1 },
    { text: "SignUp", onClickHandler: () => 1 },
  ];
  return (
    <div>
      <Navbar navLinks={navLinks} title="Rate Yor Professor" />
      <button onClick={() => dispatch(setIsOpen(true))}>Open Dialog</button>
      <Dialog />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/employee/:id" element={<Employee />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
