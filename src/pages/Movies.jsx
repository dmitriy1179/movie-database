import React from "react";
import { useSearchParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import StatusResolver from "../components/StatusResolver";
import SearchForm from "../components/SearchForm";
import ListItem from "../components/ListItem";
import PaginationButtons from "../components/PaginationButtons";
import ListTypeButtons from "../components/ListTypeButtons";
import buildSearchUrl from "../utils/buildSearchUrl";
import buildListUrl from "../utils/buildListUrl";
import heromovies from '../assets/images/heromovies.jpg';

const Movies = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const query = queryParams.get("query");
  const type = queryParams.get("type");
  const currentPage = +queryParams.get("page") || 1;

  const url = query ? buildSearchUrl("movie", query, currentPage) : buildListUrl("movie", currentPage, type ?? "popular");

  const [movie, status] = useFetch(url);

  React.useEffect(() => {
    if (!query && !type) {
      setQueryParams(
        { type: "popular", page: currentPage },
        { replace: true }
      );
    }
  }, []);

  const changeType = (e) => {
    const targetValue = e.target.value;
    setQueryParams({ type: targetValue, page: 1 });
  }

  const searchMovie = (search) => {
    if (!search) {
      setQueryParams({ type: "popular", page: 1 });
    } else {
      setQueryParams({ query: search, page: 1 });
    }
  };

  const updatePage = (newPage) => {
    setQueryParams({
      ...(query ? { query } : { type }),
      page: newPage
    });
  };

  return (
    <>
      <div className="hero hero--mod" style={{ backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(224, 224, 224, 0.3)), url(${heromovies})` }}>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div className="w-100">
            <SearchForm
              onSearch={searchMovie}
              placeholder="Enter the title of the movie"
              initialValue={query ?? ""} />
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column flex-grow-1">
        <ListTypeButtons
          title="Movies"
          changeHandler={changeType}
          type={type}
          query={query}
          isHidden={query}
        />
        {query ? <h3 className="mb-3 mt-4 text-center">Movie search result </h3> : null}
        <StatusResolver
          status={status}
          noData={movie?.results?.length === 0}>
          {movie && (
            <>
              <ul className="list mb-3">
                {movie.results.map((item) => (
                  <ListItem
                    item={item}
                    key={item.id} />
                ))}
              </ul>
              <PaginationButtons
                currentPage={currentPage}
                totalPages={movie.total_pages > 500 ? 500 : movie.total_pages}
                getPrevPage={() => updatePage(currentPage - 1)}
                getNextPage={() => updatePage(currentPage + 1)}
                getPage={(e) => updatePage(+e.target.value)}
              />
            </>
          )}
        </StatusResolver>
      </div >
    </>
  );
};

export default Movies;