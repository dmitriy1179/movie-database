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

const Tv = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const query = queryParams.get("query");
  const type = queryParams.get("type");
  const currentPage = +queryParams.get("page") || 1;

  const url = query ? buildSearchUrl("tv", query, currentPage) : buildListUrl("tv", currentPage, type ?? "popular");

  const [tv, status] = useFetch(url);

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

  const searchTv = (search) => {
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
    <div className="container h-100 d-flex flex-column">
      <div className="w-100 mt-4">
        <SearchForm
          onSearch={searchTv}
          placeholder="Enter the title of the TV show"
          initialValue={query ?? ""} />
      </div>
      <ListTypeButtons
        title="TV series"
        changeHandler={changeType}
        type={type}
        query={query}
        isHidden={query}
      />
      {query ? <h3 className="mb-3 mt-4 text-center">TV show search result</h3> : null}
      <StatusResolver
        status={status}
        noData={tv?.results?.length === 0}>
        {tv && (
          <>
            <ul className="list mb-3">
              {tv.results.map((item) => (
                <ListItem
                  item={item}
                  title="name"
                  date="first_air_date"
                  path="tv"
                  key={item.id} />
              ))}
            </ul>
            <PaginationButtons
              currentPage={currentPage}
              totalPages={tv.total_pages > 500 ? 500 : tv.total_pages}
              getPrevPage={() => updatePage(currentPage - 1)}
              getNextPage={() => updatePage(currentPage + 1)}
              getPage={(e) => updatePage(+e.target.value)}
            />
          </>
        )}
      </StatusResolver>
    </div>
  );
};

export default Tv;