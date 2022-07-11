import React, { useState, useEffect } from "react";
import { Wrapper, Form } from "../styles/signUp.styles";
import { register } from "../api/auth.api";
function SignUp() {
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    password: "",
  });
  const { userid, username, password } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userid,
      username,
      password,
    };
    register(userData);
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
          type="text"
          placeholder="user name"
          required
          name="username"
          value={username}
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
        <input type="submit" value="Submit" />
      </Form>
    </Wrapper>
  );
}

export default SignUp;
