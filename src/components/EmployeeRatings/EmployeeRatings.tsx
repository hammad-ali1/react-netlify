import { Rating, Stack, IconButton, Avatar } from "@mui/material";
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
      <Stack>
        {employee.ratings.map((rating) => (
          <Stack sx={{ border: "1px solid white" }} spacing={0.5}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction="row" spacing={1} alignItems={"center"}>
                <Avatar>{rating.user.name[0]}</Avatar>
                <div>{rating.user.name}</div>
              </Stack>
              <IconButton sx={{ margin: 0 }}>
                <MoreVertIcon fontSize="small" className="textColor" />
              </IconButton>
            </Stack>
            <Rating size="small" readOnly value={rating.value} />
            <div>Rating Details</div>
          </Stack>
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
