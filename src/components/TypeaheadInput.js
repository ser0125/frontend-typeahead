import axios from "axios";
import SuggestionsList from "./SuggestionsList";
import { useCallback, useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { useMovies } from "../MoviesContext";

// This endpoint is from TheMovieDB https://developers.themoviedb.org/3/search/search-movies
// There is a missing query string `query` to make the search
const MOVIES_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f";

export default function TypeaheadInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { state: { movies } } = useMovies();

  const fetchApi = useCallback(async () => {
    const { data: { results } } = await axios.get(`${MOVIES_ENDPOINT}&query=${query}`);
    setSuggestions(results.map(({ id, title }) => ({ id, title })))
  }, [query])

  const handleChangeInput = (e) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setShowSuggestions(false)
      setSuggestions([])
    } else {
      setShowSuggestions(true)
    }
  }

  const clearInput = () => {
    setQuery('');
    setSuggestions([])
  }


  useEffect(() => {
    if (query) {
      const timeOutId = setTimeout(() => { fetchApi() }, 250);
      return () => clearTimeout(timeOutId)
    }
  }, [query, fetchApi])



  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        type="text"
        value={query}
        onChange={(e) => handleChangeInput(e)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {/* Should only show this component when searching */}
      {
        showSuggestions &&
        <SuggestionsList suggestions={suggestions} clearInput={clearInput} />
      }
      {
        !!movies.length &&
        <MoviesList movies={movies} />
      }
    </div>
  );
}
