import React from "react";
import { useSearchParams } from "react-router";
import useFetch from "../hooks/use-fetch";
import StatusResolver from "../components/StatusResolver";
import SearchForm from "../components/SearchForm";
import ListItem from "../components/ListItem";
import PaginationButtons from "../components/PaginationButtons";
import buildSearchUrl from "../utils/buildSearchUrl";
import buildListUrl from "../utils/buildListUrl";

const People = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const query = queryParams.get("query");
  const type = queryParams.get("type");
  const currentPage = +queryParams.get("page") || 1;

  const url = query ? buildSearchUrl("person", query, currentPage) : buildListUrl("person", currentPage, "popular");

  const [people, status] = useFetch(url);

  React.useEffect(() => {
    if (!query && !type) {
      setQueryParams(
        { type: "popular", page: currentPage },
        { replace: true }
      );
    }
  }, []);

  const searchPerson = (search) => {
    if (!search) {
      setQueryParams({ type: "popular", page: 1 });
    } else {
      setQueryParams({ query: search, page: 1 });
    }
  };

  const updatePage = (newPage) => {
    setQueryParams({
      ...(query ? { query } : { type: type }),
      page: newPage
    });
  };

  return (
    <div className="container h-100 d-flex flex-column">
      <div className="w-100 my-4">
        <SearchForm
          onSearch={searchPerson}
          placeholder="Enter the name of person"
          initialValue={query ?? ""} />
      </div>
      <h3 className="mb-3 text-center">
        {query ? "Person search result" : "Popular people"}
      </h3>
      <StatusResolver
        status={status}
        noData={people?.results?.length === 0}>
        {people && (
          <>
            <ul className="list mb-3">
              {people.results.map((item) => (
                <ListItem
                  item={item}
                  poster="profile_path"
                  title="name"
                  isHiddenScore={true}
                  path="people"
                  key={item.id} />
              ))}
            </ul>
            <PaginationButtons
              currentPage={currentPage}
              totalPages={people.total_pages > 500 ? 500 : people.total_pages}
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

export default People;