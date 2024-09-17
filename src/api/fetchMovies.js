export const fetchMovies = async (searchText, page, moviesCallback, errorCallback) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=b1ef107e&type=movie&page=${page}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movieDetailsPromises = data.Search.map((movie) => fetchMovieDetails(movie.imdbID, errorCallback));
            const movieDetails = await Promise.all(movieDetailsPromises);
            
            moviesCallback(movieDetails, data.totalResults); // Return total results as well
            errorCallback(null);
        } else {
            moviesCallback([], 0); // Set total results to 0 on failure
            errorCallback(data.Error);
        }
    } catch (err) {
        errorCallback('An error occurred while fetching data.');
    }
};



const fetchMovieDetails = async (id, errorCallback) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=b1ef107e`);
        const data = await response.json();

        if (data.Response === 'True') {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (err) {
        errorCallback('An error occurred while fetching data.');
    }
};    
