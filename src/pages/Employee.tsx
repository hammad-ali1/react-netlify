import { useParams } from "react-router";
import useEmployeeFetch from "../hooks/useEmployeeFetch";
import Spinner from "../components/Spinner/Spinner";
import EmployeeInfo from "../components/EmployeeInfo/EmployeeInfo";
import Reviews from "../components/Reviews/Reviews";
import EmployeeRatings from "../components/EmployeeRatings/EmployeeRatings";

function Employee() {
  const { id } = useParams();
  const { employee, loading } = useEmployeeFetch(id!);
  return (
    <div>
      {loading && <Spinner />}
      <EmployeeInfo employee={employee} />
      <EmployeeRatings employee={employee} />
      <Reviews employee={employee} />
    </div>
  );
}

export default Employee;
