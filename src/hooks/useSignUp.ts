import { useEffect, useState } from "react";
import API from "../api/auth.api";

export interface Values {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

export default function useSignUp() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    if (shouldSubmit) {
      console.log("Submitting");
    }
  }, [shouldSubmit]);
  return { values, setValues, setShouldSubmit };
}
