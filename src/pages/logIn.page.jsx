import React, { useState, useContext } from "react";
import { Wrapper, Form } from "../styles/logIn.styles";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
//Context
import { UserContext, SocketContext } from "../context";
import socketio from "socket.io-client";
import { SERVER_URL } from "../config.ts";
function LogIn() {
  const [, setUser] = useContext(UserContext);
  const [, setSocket] = useContext(SocketContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });
  const { userid, password } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userid,
      password,
    };

    login(userData).then((user) => {
      setUser(user);
      const authToken = localStorage.getItem("authtoken");
      const newSocket = socketio.connect(SERVER_URL, {
        auth: { token: authToken },
      });
      setSocket(newSocket);
      navigate("/", { replace: true });
    });
  };

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Wrapper>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          placeholder="user id"
          required
          name="userid"
          value={userid}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </Form>
    </Wrapper>
  );
}

export default LogIn;
