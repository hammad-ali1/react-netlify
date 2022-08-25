import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";

import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Navbar from "./components/Navbar/Navbar";
import Dialog from "./components/Dialog/Dialog";

//Redux
import { useAppDispatch } from "./app/hooks";
import { openLoginForm, openSignUpForm } from "./components/Dialog/dialogSlice";
import { setUser } from "./components/User/userSlice";
import API from "./api/auth.api";

function App() {
  const dispatch = useAppDispatch();
  const renderSignUpDialog = () => {
    dispatch(openSignUpForm());
  };
  const renderLoginDialog = () => {
    dispatch(openLoginForm());
  };
  const navLinks = [
    { text: "Login", onClickHandler: renderLoginDialog },
    { text: "SignUp", onClickHandler: renderSignUpDialog },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getUserFromToken(token).then((user) => {
        dispatch(setUser(user));
      });
    }
  }, []);
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
