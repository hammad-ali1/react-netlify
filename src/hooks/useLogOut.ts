import { useAppDispatch } from "../app/hooks";
import { resetUser } from "../components/User/userSlice";
function useLogOut() {
  const dispatch = useAppDispatch();
  function logout() {
    localStorage.removeItem("token");
    dispatch(resetUser());
  }
  return logout;
}

export default useLogOut;
