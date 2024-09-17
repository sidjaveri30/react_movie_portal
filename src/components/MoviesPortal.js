import { useState } from "react";
import { fetchMovies } from "../api/fetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetail from "./MovieDetail";

function MoviesPortal() {
    const [searchInputText, setSearchInputText] = useState('');
    const [enteredSearchText, setEnteredSearchText] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);  // Track the current page
    const [totalResults, setTotalResults] = useState(0);  // Track the total number of movies

    const moviesPerPage = 10;  // Fixed movies per page

    const onSearchTextEnter = (e) => {
        e.preventDefault();
        setPage(1);  // Reset page to 1 on new search
        fetchMovies(searchInputText, 1, handleMoviesResponse, setError);
        setEnteredSearchText(searchInputText);
    };

    const handleMoviesResponse = (movies, totalResults) => {
        setMovies(movies);
        setTotalResults(totalResults);  // Set total number of movies found
    };

    const goToNextPage = () => {
        if (page < Math.ceil(totalResults / moviesPerPage)) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMovies(searchInputText, nextPage, handleMoviesResponse, setError);
        }
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            const prevPage = page - 1;
            setPage(prevPage);
            fetchMovies(searchInputText, prevPage, handleMoviesResponse, setError);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={onSearchTextEnter}>
                        <input
                            type="text"
                            placeholder="Search Movie"
                            className="form-control"
                            value={searchInputText}
                            onChange={(e) => setSearchInputText(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <br />
            {error && <ErrorAlert error={error} searchTerm={enteredSearchText} />}
            {movies.length > 0 && (
                <>
                    <p className='text-light'>
                        Showing {movies.length} Movies for '{enteredSearchText}' (Page {page} of {Math.ceil(totalResults / moviesPerPage)})
                    </p>
                    {movies.map((movie) => (
                        <MovieDetail key={movie.imdbID} movie={movie} />
                    ))}
                </>
            )}
            {movies.length > 0 && (
                <div className="pagination-buttons">
                    <button
                        onClick={goToPreviousPage}
                        disabled={page === 1}
                        className="btn btn-secondary"
                    >
                        Previous
                    </button>
                    <button
                        onClick={goToNextPage}
                        disabled={page >= Math.ceil(totalResults / moviesPerPage)}
                        className="btn btn-primary"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}




export default MoviesPortal;