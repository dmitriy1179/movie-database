const buildSearchUrl = (search, query, page) => {
  return `https://api.themoviedb.org/3/search/${search}?query=${query}&include_adult=false&language=en-US&page=${page}`;
}

export default buildSearchUrl;