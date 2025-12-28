import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import StatusResolver from "../components/StatusResolver";
import glyphicons from "../assets/images/glyphicons.svg";

const Person = () => {
  const { id } = useParams();
  const [person, status] = useFetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`);

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState(false);

  const bioRef = React.useRef(null);

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
            <div className="container h-100 d-flex justify-content-center align-items-center">
              <div className="row g-0 pt-4 mb-4">
                <div className={`col-md-4 d-flex justify-content-center ${person.profile_path === null ? "bg-secondary-subtle" : ""}`}>
                  <img
                    src={person.profile_path === null ? glyphicons : `https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person.name}
                    className={`img-fluid hero__img ${person.profile_path === null ? "p-5" : ""}`}
                    style={{ height: `${person.profile_path ? "auto" : "500px"}` }}
                  />
                </div>
                <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0 ps-md-3">
                  <h2 className="mb-3">
                    {person.name}
                    {birthday ? <span className="text-muted ms-2 fs-5">({birthday}{deathday ? ` - ${deathday}` : null})</span> : ""}
                  </h2>
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
                        className="btn btn-link p-0 text-decoration-none fw-bold text-black"
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
      </StatusResolver>
    </>
  )
}

export default Person;