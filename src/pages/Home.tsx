import { useEffect, useState } from "react";
import API, { Departments } from "../api/employees.api";
//Components
import SearchBar from "../components/SearchBar";
function Home() {
  const [departments, setDepartments] = useState(new Departments());
  useEffect(() => {
    API.fetchEmployeesByDepartment("Computer Science").then(setDepartments);
  }, []);
  return (
    <div>
      <SearchBar />
      {departments.results[0] &&
        departments.results[0].employees.map((employee) => (
          <img
            src={"https://lahore.comsats.edu.pk" + employee.imgURL}
            alt="DP"
            key={employee.empId}
          />
        ))}
    </div>
  );
}

export default Home;
