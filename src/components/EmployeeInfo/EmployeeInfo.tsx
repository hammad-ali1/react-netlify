import { useState } from "react";
import { Rating, Button, Stack, Box } from "@mui/material";
import { StarBorder } from "@mui/icons-material";
//Hooks
import useGiveRating from "./useGiveRating";
//Styles
import { Wrapper, Image } from "./EmployeeInfo.styles";
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
    <Wrapper>
      <Image src={"https://lahore.comsats.edu.pk" + employee.imgURL} />
      <Stack justifyContent="center" spacing={1}>
        <h1>{employee.name}</h1>
        <span>{`(${employee.designation})`}</span>
        <h3>{employee.department}</h3>
        <h3>
          {employee.averageRating === 0 || !employee.averageRating
            ? "No ratings yet"
            : `Average Rating: ${employee.averageRating} (${
                labels[employee.averageRating]
              })`}
        </h3>

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
          <Button onClick={submitRatingHandler} sx={{ alignSelf: "baseline" }}>
            Rate
          </Button>
        )}
        {employee.ratings.map((rating) => (
          <div>{rating.user.name}</div>
        ))}
      </Stack>
    </Wrapper>
  );
}

export default EmployeeInfo;
