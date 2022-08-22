import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export const addUser = async (
  email: string,
  password: string
): Promise<any> => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  sendEmailVerification(credential.user).then(() =>
    console.log(credential.user.emailVerified)
  );
};
