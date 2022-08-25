import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser } from "../components/User/userSlice";
import { openAccountVerification } from "../components/Dialog/dialogSlice";
import Button from "../components/Button/Button";
function Account() {
  const user = useAppSelector((state) => selectUser(state));
  const dispatch = useAppDispatch();
  return (
    <div>
      {!user.isEmailVerified && (
        <>
          {`${user.name}'s account verification is still pending`}
          <Button
            text="Verify Account"
            callback={() => {
              dispatch(openAccountVerification());
            }}
          />
        </>
      )}
    </div>
  );
}

export default Account;
