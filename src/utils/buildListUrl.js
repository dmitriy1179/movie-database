const buildListUrl = (listName, page, type) => {
  return `https://api.themoviedb.org/3/${listName}/${type}?language=en-US&page=${page}`;
}

export default buildListUrl;