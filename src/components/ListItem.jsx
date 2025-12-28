import { NavLink } from "react-router";
import glyphicons from "../assets/images/glyphicons.svg";
import Score from "./Score";

const ListItem = ({ item, poster = "poster_path", title = "title", date = "release_date", path = "movies", isHiddenScore = false }) => {
  const hasPoster = item[poster] !== null;
  const releaseDate = item?.[date] ? item[date].split("-").reverse().join("/") : null;
  const movieList = item?.known_for && item.known_for.length > 0 ? item.known_for.map((movie) => movie.name ?? movie.title).join(", ") : null;

  return (
    <li className="card item">
      <img
        src={hasPoster ? `https://image.tmdb.org/t/p/w500${item[poster]}` : glyphicons}
        className={`card-img-top bg-secondary-subtle border item__image ${hasPoster ? "" : "p-5"}`}
        alt={item[title]}
        style={{ objectFit: hasPoster ? "cover" : "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <Score
          isHidden={isHiddenScore}
          classScore="score"
          details={item}
          isHiddenTitle={true} />
        <h5 className="card-title text-center">{item[title]}</h5>
        {item[date] || item[date] == "" ?
          <p className="card-text text-end flex-grow-1">{releaseDate}</p> :
          null}
        {item.known_for ?
          <p className="card-text flex-grow-1">{movieList}</p> :
          null}
        <NavLink to={`/${path}/${item.id}`} className="btn btn-secondary btn-sm align-self-center">Details</NavLink>
      </div>
    </li>
  )
}

export default ListItem;