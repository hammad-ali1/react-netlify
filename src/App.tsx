import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";

import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Account from "./pages/Account";
import Navbar from "./components/Navbar/Navbar";
import Dialog from "./components/Dialog/Dialog";
import SnackBar from "./components/SnackBar/SnackBar";
//Redux
import { useAppDispatch } from "./app/hooks";
import { openLoginForm, openSignUpForm } from "./components/Dialog/dialogSlice";
import { setSearchTerm } from "./components/SearchBar/searchSlice";
import { setUser } from "./components/User/userSlice";
import API from "./api/auth.api";

function App() {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const renderSignUpDialog = () => {
    dispatch(openSignUpForm());
  };
  const renderLoginDialog = () => {
    dispatch(openLoginForm());
  };
  const navLinks = [
    {
      text: "Home",
      onClickHandler: () => {
        dispatch(setSearchTerm(""));
        navigator("/", { replace: true });
      },
    },
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
  }, [dispatch]);
  return (
    <div>
      <Navbar navLinks={navLinks} title="Rate Yor Professor" />
      <Dialog />
      <SnackBar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
