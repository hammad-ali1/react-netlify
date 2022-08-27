import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser } from "../components/User/userSlice";
import { openAccountVerification } from "../components/Dialog/dialogSlice";
//Mui
import { RoundedButton } from "../theme/styledComponents";
function Account() {
  const user = useAppSelector((state) => selectUser(state));
  const dispatch = useAppDispatch();
  return (
    <div>
      {!user.isEmailVerified && (
        <>
          {`${user.name}'s account verification is still pending`}
          <RoundedButton
            onClick={() => {
              dispatch(openAccountVerification());
            }}
          >
            Verify Account
          </RoundedButton>
        </>
      )}
    </div>
  );
}

export default Account;
