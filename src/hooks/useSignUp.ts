import { useEffect, useState } from "react";
import API from "../api/auth.api";
//Redux
import { useAppDispatch } from "../app/hooks";
import {
  openAccountVerification,
  openLoginForm,
} from "../components/Dialog/dialogSlice";

export interface Values {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

export default function useSignUp() {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleFormSubmit = () => {
    console.log("HEHE");
    dispatch(openAccountVerification());
  };

  return { values, setValues, handleFormSubmit };
}
