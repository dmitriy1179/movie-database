import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import StatusResolver from "../components/StatusResolver";
import glyphicons from "../assets/images/glyphicons.svg";
import Score from "../components/Score";

const Show = () => {
  const { id } = useParams();
  const [show, status] = useFetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

  const releaseDate = show?.first_air_date ? show.first_air_date.split("-").reverse().join("/") : null;
  const genreList = show?.genres && show.genres.length > 0 ? show.genres.map((g) => g.name).join(", ") : null;
  const runtime = show?.number_of_seasons ? `number of seasons - ${show.number_of_seasons}` : null;
  const facts = [releaseDate, genreList, runtime].filter(Boolean);
  const createdBy = show?.created_by ? show.created_by.map((author) => author.name).join(", ") : null;

  return (
    <>
      <StatusResolver status={status}>
        {show && (
          <>
            <div className="hero" style={{ backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(224, 224, 224, 0.6)), url(https://image.tmdb.org/t/p/w500${show.backdrop_path})` }}>
              <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row g-0 pt-4 mb-4">
                  <div className={`col-md-4 d-flex justify-content-center ${show.poster_path === null ? "bg-secondary-subtle" : ""}`}>
                    <img src={show.poster_path === null ? glyphicons : `https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.title}
                      className={`img-fluid hero__img ${show.poster_path === null ? "p-5" : ""}`}
                      style={{ height: `${show.poster_path ?? 500 + "px"}` }} />
                  </div>
                  <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0 ps-md-3">
                    <h2 className="mb-0"> {show.name} {show.first_air_date ? <span className="text-muted">({show.first_air_date.slice(0, 4)})</span> : ""}</h2>
                    <p className="">
                      {facts.map((item, index) => (
                        <React.Fragment key={index}>
                          <small>{item}</small>
                          {index < facts.length - 1 && <span className="mx-2">•</span>}
                        </React.Fragment>
                      ))}
                    </p>
                    <Score details={show} />
                    <h3>Overview</h3>
                    <p>{show.overview ? show.overview : "There is no review for this show"}</p>
                    {show.created_by.length === 0 ?
                      null :
                      <div className="d-flex align-items-baseline">
                        <h5>Created by: </h5>
                        <span className="ms-2">{createdBy}</span>
                      </div>
                    }
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

export default Show;