import { useNavigate } from "react-router-dom";
import { Employees } from "../../api/employees.api";
import { useAppDispatch } from "../../app/hooks";
import { setSearchTerm } from "../SearchBar/searchSlice";
import { CenteredSpinner } from "../../theme/styledComponents";

import SearchResultItem from "../SearchResultItem/SearchResultItem";

type SearchResultsProps = {
  employees: Employees;
  loading: boolean;
};
function SearchResults({ employees, loading }: SearchResultsProps) {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  if (loading) return <CenteredSpinner />;
  return (
    <div style={{ padding: "10px" }}>
      {employees.results.map((employee) => (
        <SearchResultItem
          key={employee.empId}
          employee={employee}
          onClickHandler={() => {
            dispatch(setSearchTerm(""));
            navigator(`/employee/${employee._id}`, { replace: true });
          }}
        />
      ))}
    </div>
  );
}

export default SearchResults;
