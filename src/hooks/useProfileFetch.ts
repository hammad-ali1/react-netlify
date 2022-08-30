import { useEffect, useState } from "react";
import API, { RatingGivenByUser } from "../api/employees.api";

function useProfileFetch(userid: string) {
  const [ratings, setRatings] = useState<RatingGivenByUser[]>([]);
  useEffect(() => {
    if (userid) {
      API.getRatingsGivenByUser(userid).then((fetchedRatings) =>
        setRatings(fetchedRatings)
      );
    }
  }, [userid]);
  return { ratings };
}

export default useProfileFetch;
