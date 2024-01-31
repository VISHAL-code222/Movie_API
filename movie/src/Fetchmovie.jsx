import React, { useState } from "react";
import Loading from "./Loading";
import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

function Fetchmovie() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const TMDB_API_KEY = "43c75a11c7629e2c9e96fac74d568063";
  const searchMovies = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          setError(null);
        } else {
          setMovies([]);
          setError("No movies found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Movie Search App</h1>
      <form className="form" onSubmit={searchMovies}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <TextField
              type="text"
              name="query"
              label="Search for a movie..."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </Grid>
      </form>
      {loading && (
        <p style={{ textAlign: "center" }}>
          <Loading />
        </p>
      )}

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            <div className="card">
              <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title + " poster"}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Fetchmovie;