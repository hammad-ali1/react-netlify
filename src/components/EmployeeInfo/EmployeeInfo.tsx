//Styles
import { Wrapper, Image, Text } from "./EmployeeInfo.styles";
//Types
import type { Employee } from "../../api/employees.api";
type EmployeeInfoProps = {
  employee: Employee;
};
function EmployeeInfo({ employee }: EmployeeInfoProps) {
  return (
    <Wrapper>
      <Image src={"https://lahore.comsats.edu.pk" + employee.imgURL} />
      <Text>
        <h1>{employee.name}</h1>
        <span>{`(${employee.designation})`}</span>
        <h3>{employee.department}</h3>
      </Text>
    </Wrapper>
  );
}

export default EmployeeInfo;
