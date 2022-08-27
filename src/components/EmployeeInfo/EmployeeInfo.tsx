import { useState } from "react";
import { Rating, Button, Stack, Box, Typography } from "@mui/material";
import { ColoredStack, Thumb } from "../../theme/styledComponents";
import { StarBorder } from "@mui/icons-material";
//Hooks
import useGiveRating from "./useGiveRating";
//Types
import type { Employee } from "../../api/employees.api";
type EmployeeInfoProps = {
  employee: Employee;
};
const labels: { [index: string]: string } = {
  0.5: "Should not even teach",
  1: "Guzaara hu raha bus",
  1.5: "Won't reccommend to anyone",
  2: "There's still little room for imporvement",
  2.5: "Alright",
  3: "Good",
  3.5: "Buhat khoob",
  4: "Teacher hu tu aesa",
  4.5: "Kaash app mere waalid/waalida hute",
  5: "Wah! Kia kehne hain inn ke",
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
function EmployeeInfo({ employee }: EmployeeInfoProps) {
  const {
    ratingValue,
    setRatingValue,
    submitRatingHandler,
    shouldDisableButton,
  } = useGiveRating(employee._id);
  const [hover, setHover] = useState(-1);
  return (
    <ColoredStack direction="row" spacing={1}>
      <Thumb>
        <img
          src={"https://lahore.comsats.edu.pk" + employee.imgURL}
          alt="profile-pic"
        />
      </Thumb>
      <Stack justifyContent="center" spacing={0.5}>
        <Typography variant="h4">
          {employee.name}
          <Typography variant="caption">{`(${employee.designation})`}</Typography>
        </Typography>
        <Typography sx={{ fontWeight: "bold" }} variant="body1">
          {employee.department}
        </Typography>
        <Typography variant="body1">
          {employee.averageRating === 0 || !employee.averageRating
            ? "No ratings yet"
            : `Average Rating: ${employee.averageRating} (${
                labels[employee.averageRating]
              })`}
        </Typography>

        <Stack direction="row" alignItems="center">
          <Rating
            emptyIcon={<StarBorder fontSize="inherit" className="textColor" />}
            getLabelText={getLabelText}
            value={ratingValue}
            onChange={(event, newValue) => setRatingValue(newValue)}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            precision={0.5}
          />
          {ratingValue !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : ratingValue]}
            </Box>
          )}
        </Stack>

        {shouldDisableButton ? (
          <Box>*You must have an account to use rating feature</Box>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={submitRatingHandler}
            sx={{ alignSelf: "baseline" }}
          >
            Rate
          </Button>
        )}
      </Stack>
    </ColoredStack>
  );
}

export default EmployeeInfo;
