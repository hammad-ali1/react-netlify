import { useState } from "react";
import API from "../api/auth.api";
//Redux
import { useAppDispatch } from "../app/hooks";
import { setIsOpen } from "../components/Dialog/dialogSlice";

export interface Values {
  email: string;
  password: string;
  showPassword: boolean;
}
export default function useSignUp() {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    showPassword: false,
  });
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const isEmailError =
    values.email !== "" &&
    !new RegExp("^[a-z0-9]{4}-[a-z]{3}-[0-9]{3}$", "i").test(values.email) &&
    values.email.length !== 12;
  const handleChange =
    (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleFormSubmit = async () => {
    if (values.email && values.password) {
      const result = await API.logIn(
        values.email + "@cuilahore.edu.pk",
        values.password
      );
      console.log(result.token);
      dispatch(setIsOpen(false));
    } else {
      setSubmitErrorMessage("Please fill all fields");
    }
  };

  return {
    values,
    handleChange,
    handleFormSubmit,
    handleClickShowPassword,
    isEmailError,
    submitErrorMessage,
  };
}
