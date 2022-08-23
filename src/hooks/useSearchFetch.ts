import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { Employees } from "../api/employees.api";
import { useAppSelector } from "../app/hooks";
import { selectSearchTerm } from "../components/SearchBar/searchSlice";

export default function useSearchFetch() {
  const searchTerm = useAppSelector((store) => selectSearchTerm(store));
  const [employees, setEmployees] = useState(new Employees());
  const [loading, setLoading] = useState(false);
  //navigate to search component when search term changes
  const navigator = useNavigate();
  useEffect(() => {
    if (searchTerm) navigator("./search", { replace: true });
    else navigator("/", { replace: true });
  }, [searchTerm, navigator]);
  //updat employees when search term is spefcified
  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    fetchEmployees(searchTerm).then((employees) => {
      setEmployees(employees);
      setLoading(false);
    });
  }, [searchTerm]);
  async function fetchEmployees(name: string) {
    console.log(name);
    const employees = await API.fetchEmployees(name);
    return employees;
  }

  return { employees, loading };
}
