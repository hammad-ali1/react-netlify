import { Rating, Stack, Avatar } from "@mui/material";
import { ColoredStack } from "../../theme/styledComponents";
import MenuButton from "../MenuButton/MenuButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//Types
import type { Employee } from "../../api/employees.api";
type EmployeeInfoProps = {
  employee: Employee;
};
function EmployeeRatings({ employee }: EmployeeInfoProps) {
  return (
    <div>
      {employee.ratings.length === 0 && "No Ratings yet"}
      <Stack spacing={1}>
        {employee.ratings.map((rating) => (
          <ColoredStack spacing={0.5}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction="row" spacing={1} alignItems={"center"}>
                <Avatar>{rating.user.name[0]}</Avatar>
                <div>{rating.user.name}</div>
              </Stack>
              <MenuButton
                icon={<MoreVertIcon fontSize="small" />}
                items={[{ text: "report" }]}
              />
            </Stack>
            <Rating size="small" readOnly value={rating.value} />
            <div>Rating Details</div>
          </ColoredStack>
        ))}
        <div>Test</div>
        <div>Test</div>

        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
      </Stack>
    </div>
  );
}

export default EmployeeRatings;
