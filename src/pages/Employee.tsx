import { useParams } from "react-router";
//Mui
import { Box } from "@mui/material";
import { CenteredSpinner } from "../theme/styledComponents";
import useEmployeeFetch from "../hooks/useEmployeeFetch";
import EmployeeInfo from "../components/EmployeeInfo/EmployeeInfo";
import Reviews from "../components/Reviews/Reviews";
import EmployeeRatings from "../components/EmployeeRatings/EmployeeRatings";
import TabView from "../components/TabView/TabView";
function Employee() {
  const { id } = useParams();
  const { employee, loading } = useEmployeeFetch(id!);

  if (loading || !employee._id) return <CenteredSpinner />;
  return (
    <div>
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
