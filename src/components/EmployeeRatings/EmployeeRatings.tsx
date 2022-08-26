import { Rating, Stack, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//Types
import type { Employee } from "../../api/employees.api";
type EmployeeInfoProps = {
  employee: Employee;
};
function EmployeeRatings({ employee }: EmployeeInfoProps) {
  return (
    <div>
      <Stack>
        {employee.ratings.map((rating) => (
          <Stack>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <div>{rating.user.name}</div>
              <IconButton sx={{ margin: 0 }}>
                <MoreVertIcon fontSize="small" className="textColor" />
              </IconButton>
            </Stack>
            <Rating size="small" readOnly value={rating.value} />
            <div>Rating Details</div>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

export default EmployeeRatings;
