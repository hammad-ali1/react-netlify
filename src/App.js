import { useState, useEffect } from "react";
import SignUp from "./pages/signUp.page";
import { getUser } from "./api/auth.api";

console.log(process.env.REACT_APP_SERVER_URL);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []);

  return (
    <div className="App">
      {user ? <h1>{`Welcome ${user.username}`}</h1> : <SignUp />}
    </div>
  );
}

export default App;
