import { useMovies } from "../MoviesContext";

export default function SuggestionsList({ suggestions, clearInput }) {
  const { dispatch } = useMovies();
  const onClickHandler = (id, title) => {
    dispatch({ type: 'storeMovie', payload: { id, title } });
    clearInput()
  }
  return (
    <ul
      data-testid="results-list"
      className="border border-primary rounded-md w-96 text-lg bg-white"
    >
      {suggestions.map((item, i) => (
        <li key={item.id} className="p-1 cursor-pointer hover:bg-slate"
        onMouseDown={() => onClickHandler(item.id, item.title || item.name)}>
          <span className="">{item.title || item.name}</span>
        </li>
      ))}
    </ul>
  );
}
