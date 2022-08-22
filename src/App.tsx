import { useEffect, useState } from "react";
import { getTeacherByName } from "./firebase/handlers/teachers.handler";
function App() {
  const [teachers, setTeachers] = useState<any[]>([]);
  useEffect(() => {
    getTeacherByName("Sana").then(setTeachers);
  }, []);
  return (
    <div className="App">
      {teachers.map((teacher: any) => (
        <div>{teacher.name}</div>
      ))}
      <h1>Welcome to Hammad's React projects</h1>
    </div>
  );
}

export default App;
