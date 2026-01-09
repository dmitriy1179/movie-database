import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import useTheme from "../context/ThemeContext";
import StatusResolver from "../components/StatusResolver";
import glyphicons from "../assets/images/glyphicons.svg";
import { ImdbIcon } from "../assets/images/ImdbIcon";
import Score from "../components/Score";

const Movie = () => {
  const { id } = useParams();
  const [details, status] = useFetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
  const { isDarkTheme } = useTheme();

  const hasPoster = details?.poster_path !== null;
  const releaseDate = details?.release_date ? details.release_date.split("-").reverse().join("/") : null;
  const genreList = details?.genres && details.genres.length > 0 ? details.genres.map((g) => g.name).join(", ") : null;
  const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : null;
  const facts = [releaseDate, genreList, runtime].filter(Boolean);

  return (
    <>
      <StatusResolver status={status}>
        {details && (
          <>
            <div className="hero" style={{ backgroundImage: `linear-gradient(to right, ${isDarkTheme ? "rgba(40, 40, 40, 0.7), rgba(30, 30, 30, 0.7)" : "rgba(255, 255, 255, 0.7), rgba(224, 224, 224, 0.7)"}), url(https://image.tmdb.org/t/p/w500${details.backdrop_path})` }}>
              <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row g-0 pt-4 mb-4 w-100">
                  <div className={`col-md-4 d-flex justify-content-center ${hasPoster ? "" : "rouhded-3 bg-secondary-subtle"}`}>
                    <img src={hasPoster ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : glyphicons}
                      alt={details.title}
                      className={`rounded-3 w-100 object-fit-contain mb-auto img-fluid ${hasPoster ? "" : "p-5"}`}
                      style={{
                        minHeight: `${hasPoster ? "auto" : "500px"}`,
                        maxHeight: "calc(100vh - 104px)"
                      }}
                    />
                  </div>
                  <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0 ps-md-3">
                    <div className="d-flex mb-1">
                      <h2 className="mb-0"> {details.title}
                        {details.release_date ? <span className="ms-1 text-muted">({details.release_date.slice(0, 4)})</span> : ""}
                      </h2>
                      <a href={`https://www.imdb.com/find/?s=tt&q=${details.title}`} target="_blank" className="ms-3 d-flex align-self-end" rel="noopener noreferrer" style={{ color: `${isDarkTheme ? "#343A40" : "#212529"}` }}>
                        <ImdbIcon />
                      </a>
                    </div>
                    <p>
                      {facts.map((item, index) => (
                        <React.Fragment key={index}>
                          <small>{item}</small>
                          {index < facts.length - 1 && <span className="mx-2">•</span>}
                        </React.Fragment>
                      ))}
                    </p>
                    <Score details={details} />
                    <h3>Overview</h3>
                    <p>{details.overview ? details.overview : "There is no review for this movie"}</p>
                    {details.homepage && (
                      <div className="d-flex align-items-baseline">
                        <p className="fw-bolder">Homepage:</p>
                        <a href={details.homepage} target="_blank" className="ms-2 text-decoration-none text-break" rel="noopener noreferrer">{details.homepage}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </StatusResolver>
    </>
  )
}

export default Movie;