import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import useTheme from "../context/ThemeContext";
import StatusResolver from "../components/StatusResolver";
import { ImdbIcon } from "../assets/images/imdbIcon";
import glyphicons from "../assets/images/glyphicons.svg";

const Person = () => {
  const { isDarkTheme } = useTheme();
  const { id } = useParams();
  const [person, status] = useFetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`);

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState(false);

  const bioRef = React.useRef(null);

  const hasPoster = person?.profile_path !== null;
  const birthday = person?.birthday ? person.birthday.split("-").reverse().join("/") : null;
  const deathday = person?.deathday ? person.deathday.split("-").reverse().join("/") : null;

  React.useEffect(() => {
    if (bioRef.current && bioRef.current.scrollHeight > bioRef.current.clientHeight) {
      setShowReadMore(true);
    }
  }, [person]);

  return (
    <>
      <StatusResolver status={status}>
        {person && (
          <>
            {/* <div className="container h-100 d-flex justify-content-center mt-md-4"> */}
            {/* <div className={`container h-100 d-flex justify-content-center ${showReadMore ? "mt-md-5" : "align-items-center"}`}> */}
            <div className="container h-100 d-flex justify-content-center align-items-center">
              <div className="row g-0 pt-4 mb-4 w-100">
                <div className={`col-md-4 d-flex justify-content-center ${hasPoster ? "" : "rounded-3 bg-secondary-subtle"}`}>
                  <img
                    src={hasPoster ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : glyphicons}
                    alt={person.name}
                    className={`sw-100 object-fit-contain mb-auto img-fluid ${hasPoster ? "" : "p-5"}`}
                    style={{
                      minHeight: `${hasPoster ? "auto" : "500px"}`,
                      maxHeight: "calc(100vh - 104px)"
                    }}
                  />
                </div>
                <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0 ps-md-3">
                  <div className="d-flex">
                    <h2 className="mb-3">
                      {person.name}
                      {birthday ? <span className="text-muted ms-2 fs-5">({birthday}{deathday ? ` - ${deathday}` : null})</span> : ""}
                    </h2>
                    <a href={`https://www.imdb.com/find/?s=nm&q=${person.name}`} target="_blank" className="ms-3 mb-3 d-flex align-self-end" rel="noopener noreferrer" style={{ color: `${isDarkTheme ? "#343A40" : "#212529"}` }}>
                      <ImdbIcon />
                    </a>
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
                    <p className="mb-0">
                      {person.biography ? person.biography : `There is no biography for ${person.name}`}
                    </p>
                  </div>
                  {showReadMore && (
                    <div className="d-flex justify-content-end mt-1">
                      <button
                        className={`btn btn-link p-0 text-decoration-none fw-bold ${isDarkTheme ? "text-white-50" : "text-black"}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "collapse" : "read more"}
                        <span className="ms-1">&rarr;</span>
                      </button>
                    </div>
                  )}
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