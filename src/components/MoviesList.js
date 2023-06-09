import { useMovies } from "../MoviesContext";

export default function MoviesList({ movies }) {
  const { dispatch } = useMovies()
    return (
      <div className="pt-5">
        {movies.map((item, i) => (
          <li key={item.id} className="p-1">
            <span className="">{item.title || item.name}</span>
            <span className="pl-10 cursor-pointer float-right" onClick={()=> dispatch({type: 'removeMovie', payload: { id: item.id}})}> <b>x</b> </span>
          </li>
        ))}
      </div>
    );
  }
  