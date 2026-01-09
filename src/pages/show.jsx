import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import useTheme from "../context/ThemeContext";
import StatusResolver from "../components/StatusResolver";
import glyphicons from "../assets/images/glyphicons.svg";
import { ImdbIcon } from "../assets/images/ImdbIcon";
import Score from "../components/Score";

const Show = () => {
  const { isDarkTheme } = useTheme();
  const { id } = useParams();
  const [show, status] = useFetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

  const hasPoster = show?.poster_path !== null;
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
            <div className="hero" style={{ backgroundImage: `linear-gradient(to right, ${isDarkTheme ? "rgba(40, 40, 40, 0.7), rgba(30, 30, 30, 0.7)" : "rgba(255, 255, 255, 0.7), rgba(224, 224, 224, 0.7)"}), url(https://image.tmdb.org/t/p/w500${show.backdrop_path})` }}>
              <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row g-0 pt-4 mb-4 w-100">
                  <div className={`col-md-4 d-flex justify-content-center ${hasPoster ? "" : "rounded-3 bg-secondary-subtle"}`}>
                    <img src={show.poster_path === null ? glyphicons : `https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.title}
                      className={`rounded-3 w-100 object-fit-contain mb-auto img-fluid ${hasPoster ? "" : "p-5"}`}
                      style={{
                        minHeight: `${hasPoster ? "auto" : "500px"}`,
                        maxHeight: "calc(100vh - 104px)"
                      }}
                    />
                  </div>
                  <div className="col-md-8 pt-4 pt-md-0 px-2 px-md-0 ps-md-3">
                    <div className="d-flex mb-1">
                      <h2 className="mb-0"> {show.name} {show.first_air_date ? <span className="text-muted">({show.first_air_date.slice(0, 4)})</span> : ""}
                      </h2>
                      <a href={`https://www.imdb.com/find/?s=tt&q=${show.name}`} target="_blank" className="ms-3 d-flex align-self-end" rel="noopener noreferrer" style={{ color: `${isDarkTheme ? "#343A40" : "#212529"}` }}>
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