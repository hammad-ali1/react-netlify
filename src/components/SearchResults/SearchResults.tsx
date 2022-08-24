import { useNavigate } from "react-router-dom";
import { Employees } from "../../api/employees.api";
import { useAppDispatch } from "../../app/hooks";
import { setSearchTerm } from "../SearchBar/searchSlice";

import SearchResultItem from "../SearchResultItem/SearchResultItem";
//Styles
import { Wrapper } from "./SearchResults.styles";
type SearchResultsProps = {
  employees: Employees;
};
function SearchResults({ employees }: SearchResultsProps) {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default SearchResults;
