import { Employee } from "../api/employees.api";
import Thumb from "./Thumb";
type SearchResultItemProps = {
  employee: Employee;
};

function SearchResultItem({ employee }: SearchResultItemProps) {
  return (
    <div>
      <Thumb imageURL={"https://lahore.comsats.edu.pk/" + employee.imgURL} />
      {employee.name} | {employee.department} | {employee.designation}
    </div>
  );
}

export default SearchResultItem;
