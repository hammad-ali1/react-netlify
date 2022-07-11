import { Link } from "react-router-dom";
import { Wrapper } from "../styles/Home.styles";
function Home() {
  return (
    <Wrapper>
      <ul>
        <Link style={{ textDecoration: "none" }} to={"/todo"}>
          <li>ToDo App</li>
        </Link>
      </ul>
    </Wrapper>
  );
}

export default Home;
