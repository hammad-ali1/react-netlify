import React, { useState } from "react";
import { Wrapper, Form } from "../styles/logIn.styles";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

function LogIn({ setToken }) {
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

    login(userData).then((token) => {
      setToken(token);
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
