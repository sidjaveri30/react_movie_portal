function MovieDetail({ movie }) {
    return (
        <>
            <div className="movie-container">
                <div className="movie-image">
                    <img src={movie.Poster} alt={movie.Title} width="150" />
                </div>
                <div className="movie-details">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{movie.Title}</h3>
                            <h6 className="card-subtitle mb-2 text-muted">{movie.Released}</h6>
                            <p className="card-text">{movie.Plot}</p>
                            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer" className="card-link">IMDB</a>
                            <a href={`https://www.youtube.com/results?search_query=${movie.Title} trailer`} target="_blank" rel="noreferrer" className="card-link">Watch Trailer</a>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    );
}


export default MovieDetail;