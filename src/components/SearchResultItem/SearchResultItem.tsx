import { Employee } from "../../api/employees.api";
//Styles
import { Wrapper } from "./SearchResultItem.styles";
import Thumb from "../Thumb/Thumb";
type SearchResultItemProps = {
  employee: Employee;
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
};

function SearchResultItem({ employee, onClickHandler }: SearchResultItemProps) {
  return (
    <Wrapper onClick={onClickHandler}>
      <Thumb imageURL={"https://lahore.comsats.edu.pk/" + employee.imgURL} />
      <div className="unselectable text">
        {employee.name} | {employee.department} | {employee.designation}
      </div>
    </Wrapper>
  );
}

export default SearchResultItem;
