import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import StatusResolver from "../components/StatusResolver";
import glyphicons from "../assets/images/glyphicons.svg";
import Score from "../components/Score";

const Movie = () => {
  const { id } = useParams();
  const [details, status] = useFetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

  const releaseDate = details?.release_date ? details.release_date.split("-").reverse().join("/") : null;
  const genreList = details?.genres && details.genres.length > 0 ? details.genres.map((g) => g.name).join(", ") : null;
  const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : null;
  const facts = [releaseDate, genreList, runtime].filter(Boolean);

  return (
    <>
      <StatusResolver status={status}>
        {details && (
          <>
            <div className="hero" style={{ backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(224, 224, 224, 0.6)), url(https://image.tmdb.org/t/p/w500${details.backdrop_path})` }}>
              <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row g-0 pt-4 mb-4">
                  <div className={`col-md-4 d-flex justify-content-center ${details.poster_path === null ? "bg-secondary-subtle" : ""}`}>
                    <img src={details.poster_path === null ? glyphicons : `https://image.tmdb.org/t/p/w500${details.poster_path}`}
                      alt={details.title}
                      className={`img-fluid hero__img ${details.poster_path === null ? "p-5" : ""}`}
                      style={{ height: `${details.poster_path ?? 500 + "px"}` }} />
                  </div>
                  <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0 ps-md-3">
                    <h2 className="mb-0"> {details.title} {details.release_date ? <span className="text-muted">({details.release_date.slice(0, 4)})</span> : ""}</h2>
                    <p className="">
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
                    {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
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