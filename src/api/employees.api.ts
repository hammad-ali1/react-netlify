import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
//set axios configuration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
  }
);

//TYPES
export class Departments {
  results: Department[] = [];
}
export class Employees {
  results: Employee[] = [];
}
class Department {
  name: string = "";
  employees: Employee[] = [];
}

class Employee {
  empId: number = -1;
  imgURL: string = "";
  namePrefix: string = "";
  name: string = "";
  subject: string = "";
  designation: string = "";
  department: string = "";
  qualifications: Qualification[] = [];
  experience: Experience[] = [];
}

class Qualification {
  degree: string = "";
  institute: string = "";
  date: string = "";
}
class Experience {
  designation: string = "";
  institue: string = "";
  date: string = "";
}

const API = {
  fetchEmployees: async (name: string): Promise<Employees> => {
    return await (
      await axios.get(`employees?name=${name}`)
    ).data;
  },
  fetchEmployeesByDepartment: async (
    department?: string
  ): Promise<Departments> => {
    return await (
      await axios.get(`departments?department=${department}`)
    ).data;
  },
};

export default API;
