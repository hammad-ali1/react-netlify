import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
//set axios configuration
axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers!["Authorization"] = `Bearer ${token}`;
  return request;
});
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

export class Employee {
  _id: string = "";
  empId: number = -1;
  imgURL: string = "";
  namePrefix: string = "";
  name: string = "";
  subject: string = "";
  designation: string = "";
  department: string = "";
  qualifications: Qualification[] = [];
  experience: Experience[] = [];
  averageRating: number = 0;
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
  fetchEmployee: async (id: string): Promise<Employee> => {
    return await (
      await axios.get(`employees/${id}`)
    ).data;
  },
  fetchEmployeesByDepartment: async (
    department?: string
  ): Promise<Departments> => {
    return await (
      await axios.get(`departments?department=${department}`)
    ).data;
  },
  addRating: async (
    employeeId: string,
    ratingValue: number
  ): Promise<{ message: string }> => {
    return await (
      await axios.post("employees/ratings", { employeeId, ratingValue })
    ).data;
  },
};

export default API;
