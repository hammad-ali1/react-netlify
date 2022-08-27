import { Employee } from "../../api/employees.api";
import { ColoredStack, HoverEffect } from "../../theme/styledComponents";
import Thumb from "../Thumb/Thumb";
import { Typography } from "@mui/material";
type SearchResultItemProps = {
  employee: Employee;
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
};

function SearchResultItem({ employee, onClickHandler }: SearchResultItemProps) {
  return (
    <HoverEffect sx={{ marginBottom: "5px" }}>
      <ColoredStack spacing={0.5} direction="row" onClick={onClickHandler}>
        <Thumb imageURL={"https://lahore.comsats.edu.pk/" + employee.imgURL} />
        <Typography sx={{ alignSelf: "center" }} className="unselectable text">
          {employee.name} | {employee.department} | {employee.designation}
        </Typography>
      </ColoredStack>
    </HoverEffect>
  );
}

export default SearchResultItem;
