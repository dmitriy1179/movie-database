import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import useTheme from "../context/ThemeContext";
import StatusResolver from "../components/StatusResolver";
import buildPersonUrl from "../utils/buildPersonUrl";
import { ImdbIcon } from "../assets/images/ImdbIcon";
import ListItem from "../components/ListItem";
import glyphicons from "../assets/images/glyphicons.svg";

const Person = () => {
  const { isDarkTheme } = useTheme();
  const { id } = useParams();
  const params = [buildPersonUrl(id), buildPersonUrl(id, "/movie_credits")]

  const [data, status] = useFetch(params);
  const person = data ? data[0] : null;
  const movieCast = data ? data[1].cast : null;

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState(false);

  const [moviesCounter, setMoviesCounter] = React.useState(0)

  const loadMore = () => {
    moviesCounter + 6 > movieCast.length ? setMoviesCounter(movieCast.length) : setMoviesCounter(prev => prev + 6)
  }

  const bioRef = React.useRef(null);

  const hasPoster = person?.profile_path !== null;
  const birthday = person?.birthday ? person.birthday.split("-").reverse().join("/") : null;
  const deathday = person?.deathday ? person.deathday.split("-").reverse().join("/") : null;

  React.useEffect(() => {
    if (bioRef.current && bioRef.current.scrollHeight > bioRef.current.clientHeight) {
      setShowReadMore(true);
    }
  }, [person]);

  React.useEffect(() => {
    if (movieCast == null) return;
    setMoviesCounter(Math.min(6, movieCast.length));
  }, [movieCast])

  return (
    <>
      <StatusResolver status={status}>
        {person && (
          <>
            <div className="container h-100 d-flex justify-content-center align-items-center">
              <div className="row g-0 pt-4 mb-4 w-100">
                <div
                  className={`col-md-4 d-flex justify-content-center sticky-md-top align-self-start pe-md-3 ${hasPoster ? "" : "rounded-3"}`}
                  style={{ top: "80px", zIndex: 1 }}>
                  <img
                    src={hasPoster ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : glyphicons}
                    alt={person.name}
                    className={`w-100 rounded-3 object-fit-contain mb-auto img-fluid ${hasPoster ? "" : "bg-secondary-subtle p-5"}`}
                    style={{
                      minHeight: `${hasPoster ? "auto" : "500px"}`,
                      maxHeight: "calc(100vh - 104px)"
                    }}
                  />
                </div>
                <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0">
                  <div className="d-flex">
                    <h2 className="mb-3">
                      {person.name}
                      {birthday ? <span className="text-muted ms-2 fs-5">({birthday}{deathday ? ` - ${deathday}` : null})</span> : ""}
                    </h2>
                    {person.imdb_id &&
                      <a href={`https://www.imdb.com/name/${person.imdb_id}`} target="_blank" className="ms-3 mb-3 d-flex align-self-end" rel="noopener noreferrer" style={{ color: `${isDarkTheme ? "#343A40" : "#212529"}` }}>
                        <ImdbIcon />
                      </a>
                    }
                  </div>
                  <h4>Place of birth</h4>
                  <p>{person.place_of_birth ? person.place_of_birth : `There is no information about ${person.name} place of birth`}
                  </p>
                  <h4>Known for</h4>
                  <p>{person.known_for_department ? person.known_for_department : `There is no information about how ${person.name} is known`}</p>
                  <h3>Biography</h3>
                  <div
                    className={isExpanded ? "" : "biography"}
                    ref={bioRef}>
                    <p className={`${showReadMore ? "mb-0" : ""}`}>
                      {person.biography ? person.biography : `There is no biography for ${person.name}`}
                    </p>
                  </div>
                  {showReadMore && (
                    <div className="d-flex justify-content-end mt-1">
                      <button
                        className={`btn btn-link p-0 text-decoration-none fw-bold ${isDarkTheme ? "text-white-50" : "text-black"}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? (
                          <>
                            collapse <span className="ms-1">&larr;</span>
                          </>
                        ) : (
                          <>
                            read more <span className="ms-1">&rarr;</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  {movieCast.length !== 0 &&
                    <>
                      <h3>Acted in films</h3>
                      <ul className={`p-2 row row-cols-2 row-cols-lg-3 d-flex overflow-x-auto ${moviesCounter > 6 ? "" : "flex-md-nowrap "}`}>
                        {movieCast.slice(0, moviesCounter).map((item) => (
                          <div className="p-1"
                            key={item.id}                         >
                            <ListItem
                              item={item}
                              isHiddenScore={true}
                              className="p-0 h-100"
                              imageClassName="item__image--mod" />
                          </div>
                        ))}
                      </ul>
                      {moviesCounter != movieCast.length && (
                        <div className="d-flex justify-content-end mt-1">
                          <button
                            className={`btn btn-link p-0 text-decoration-none fw-bold ${isDarkTheme ? "text-white-50" : "text-black"}`}
                            onClick={loadMore}
                          >
                            load more <span className="ms-1">&rarr;</span>
                          </button>
                        </div>
                      )}
                    </>
                  }
                </div>
              </div>
            </div>
          </>
        )}
      </StatusResolver >
    </>
  )
}

export default Person;