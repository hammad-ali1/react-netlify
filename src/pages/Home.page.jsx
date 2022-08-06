import { Link } from "react-router-dom";
import { Wrapper } from "../styles/Home.styles";
function Home() {
  return (
    <Wrapper>
      <ul>
        <Link style={{ textDecoration: "none" }} to={"/todo"}>
          <li>ToDo App</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/socket"}>
          <li>Socket App</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/tttgame"}>
          <li>Tic Tac Toe</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/guess-thief"}>
          <li>Guess Thief</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/movie-db"}>
          <li>Movie DB</li>
        </Link>
      </ul>
    </Wrapper>
  );
}

export default Home;
