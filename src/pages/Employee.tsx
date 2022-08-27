import { useParams } from "react-router";
//Mui
import { CircularProgress, Box } from "@mui/material";
import useEmployeeFetch from "../hooks/useEmployeeFetch";
import EmployeeInfo from "../components/EmployeeInfo/EmployeeInfo";
import Reviews from "../components/Reviews/Reviews";
import EmployeeRatings from "../components/EmployeeRatings/EmployeeRatings";
import TabView from "../components/TabView/TabView";
function Employee() {
  const { id } = useParams();
  const { employee, loading } = useEmployeeFetch(id!);
  return (
    <div>
      {loading && <CircularProgress />}
      <EmployeeInfo employee={employee} />
      <Box sx={{ p: 1 }}>
        <TabView
          tabs={["Ratings", "Reviews"]}
          panels={[
            <EmployeeRatings employee={employee} />,
            <Reviews employee={employee} />,
          ]}
        />
      </Box>
    </div>
  );
}

export default Employee;
