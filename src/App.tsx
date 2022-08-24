import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";

import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Navbar from "./components/Navbar/Navbar";
import Dialog from "./components/Dialog/Dialog";
import SignUpForm from "./components/SignUpForm/SignUpForm";
//Redux
import { useAppDispatch } from "./app/hooks";
import { setIsOpen, setDialogContent } from "./components/Dialog/dialogSlice";

function App() {
  const dispatch = useAppDispatch();
  const renderSignUpDialog = () => {
    dispatch(setDialogContent(<SignUpForm />));
    dispatch(setIsOpen(true));
  };
  const renderLoginDialog = () => {
    dispatch(setDialogContent(<>LOGIN</>));
    dispatch(setIsOpen(true));
  };
  const navLinks = [
    { text: "Login", onClickHandler: renderLoginDialog },
    { text: "SignUp", onClickHandler: renderSignUpDialog },
  ];
  return (
    <div>
      <Navbar navLinks={navLinks} title="Rate Yor Professor" />
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
