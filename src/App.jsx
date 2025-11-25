import React from 'react'
import SearchForm from './shared/components/SearchForm';
import ListItem from './shared/components/ListItem';
import './App.css'
import StatusResolver from './shared/components/StatusResolver';

function App() {
  const [searchResult, setSearchResult] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [page, setPage] = React.useState(1)
  const [status, setStatus] = React.useState("idle");

  const searchMovie = (search) => {
    setUrl(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`)
  }

  const searchRequest = async (url) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_TMBD_TOKEN
      }
    };
    try {
      setStatus("pending");
      const response = await fetch(url, options);
      if (!response.ok) {
        setStatus("rejected")
        throw new Error(response.statusText)
      }
      const data = await response.json();
      console.log("data", data);
      setSearchResult(data);
      setSearchResult(data);
      setStatus("resolved");
    } catch (e) {
      console.log(e)
      setSearchResult(null)
      setStatus("rejected");
    }
  }

  React.useEffect(() => {
    if (url) searchRequest(url)
  }, [url])


  return (
    <>
      <div className="container container__mod">
        <div className="card mt-4">
          <div className="card-header">
            <h3 className="text-center">Enter the title of the movie</h3>
          </div>
          <div className="card-body">
            <SearchForm onSearch={searchMovie} />
          </div>
        </div>
        <StatusResolver
          noData={searchResult !== null && searchResult.results.length === 0}
          status={status}
        >
          {searchResult === null ?
            null :
            <div className="card mt-4">
              <div className="card-header">
                <h3 className="text-center">Search movie result</h3>
              </div>
              <div className="card-body">

                <ul className="list">
                  {searchResult.results.map((item) => (
                    <ListItem item={item} key={item.id} />
                  ))}
                </ul>
              </div>
            </div>}
        </StatusResolver>
      </div>
    </>
  )
}

export default App
