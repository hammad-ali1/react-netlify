import { useState } from "react";
//Redux
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../User/userSlice";
import API from "../../api/employees.api";

function useGiveRating(employeeId: string) {
  const user = useAppSelector((state) => selectUser(state));
  const [ratingValue, setRatingValue] = useState<number | null>(3);
  const shouldDisableButton = !user || !user.isEmailVerified;
  const submitRatingHandler = async () => {
    if (ratingValue && !shouldDisableButton) {
      const result = await API.addRating(employeeId, ratingValue);
      console.log(result.message);
    }
  };

  return {
    ratingValue,
    setRatingValue,
    submitRatingHandler,
    shouldDisableButton,
  };
}

export default useGiveRating;
