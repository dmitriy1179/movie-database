const buildPersonUrl = (id, movieCredits="") => {
  return `https://api.themoviedb.org/3/person/${id}${movieCredits}?language=en-US`
}

export default buildPersonUrl;