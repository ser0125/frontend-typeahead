import React, { createContext } from 'react';

const MoviesContext = createContext('');

const initialState = {
  movies: []
};

function moviesReducer(state, action) {
  switch (action.type) {
    case 'storeMovie': {
      return {
        ...state,
        movies: [
          ...state.movies,
          {id: action.payload.id, title: action.payload.title}
        ]
      };
    }
    case 'removeMovie': {
      const index = state.movies.findIndex(movie => movie.id === action.payload.id);
      return {
        ...state,
        movies: [
          ...state.movies.slice(0,index),
          ...state.movies.slice(index+1)
        ]
      };
    }
   
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MoviesProvider({ children }) {
  const [state, dispatch] = React.useReducer(moviesReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}

function useMovies() {
  const context = React.useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a FormContext');
  }
  return context;
}

export { MoviesProvider, useMovies };