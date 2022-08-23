import { useEffect, useState } from "react";
import API, { Employees } from "../api/employees.api";
export default function useSearchFetch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(new Employees());
  useEffect(() => {
    if (!searchTerm) return;
    fetchEmployees(searchTerm).then(setEmployees);
  }, [searchTerm]);
  async function fetchEmployees(name: string) {
    const employees = await API.fetchEmployees(name);
    return employees;
  }

  return { setSearchTerm, employees };
}
