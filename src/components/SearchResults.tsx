import { Employees } from "../api/employees.api";
import SearchResultItem from "./SearchResultItem";
type SearchResultsProps = {
  employees: Employees;
};
function SearchResults({ employees }: SearchResultsProps) {
  return (
    <div>
      {employees.results.map((employee) => (
        <SearchResultItem key={employee.empId} employee={employee} />
      ))}
    </div>
  );
}

export default SearchResults;
