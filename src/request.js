const API_KEY = "0d56fff3a5b7599745da48f4335d2ef3";

const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNewReleases: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
    fetchSciFiMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`
}

export default requests;