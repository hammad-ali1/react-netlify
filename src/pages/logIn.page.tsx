import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import socketio, { Socket } from "socket.io-client";
//Styles
import { Wrapper, Form } from "../styles/logIn.styles";
//Api
import { login } from "../api/auth.api";
//Config
import { SERVER_URL } from "../config";
//Context
import {
  UserContext,
  SocketContext,
  UserContextType,
  SocketContextType,
} from "../context";
//Types
export type LogInType = {
  userid: string;
  password: string;
};

function LogIn() {
  //Context hooks
  const [, setUser] = useContext<UserContextType>(UserContext);
  const [, setSocket] = useContext<SocketContextType>(SocketContext);
  //router navigator
  const navigate = useNavigate();
  //States
  const [formData, setFormData] = useState<LogInType>({
    userid: "",
    password: "",
  });
  const { userid, password } = formData;

  //handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: LogInType = {
      userid,
      password,
    };

    login(userData).then((user: User) => {
      setUser!(user);
      const authToken = localStorage.getItem("authtoken");
      const newSocket = socketio(SERVER_URL!, {
        auth: { token: authToken },
      });
      setSocket!(newSocket);
      navigate("/", { replace: true });
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
