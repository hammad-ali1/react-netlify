import {
  Wrapper,
  TMDBLogoImg,
} from "../../styles/MovieDB/TMDBAttribution.styles";
import TMDB_LOGO from "../../images/tmdb_logo.svg";
function TMDBAtribution() {
  return (
    <Wrapper>
      <div className="text">
        <p>
          *This product uses the TMDB API but is not endorsed or certifed by
          TMDB
        </p>
      </div>
      <a target="_blank" href="https://www.themoviedb.org/" rel="noreferrer">
        <TMDBLogoImg src={TMDB_LOGO} />
      </a>
    </Wrapper>
  );
}

export default TMDBAtribution;
