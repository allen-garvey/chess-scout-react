import React from 'react';
import {
  useParams,
  useLocation,
} from 'react-router-dom';
import Results from './results';

interface ResultsParams {
  userName: string;
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResultsRoute() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { userName } = useParams<ResultsParams>();
  const query = useQuery();
  const selectedGameTypes=query.get('gameTypes') || '';

  return (
    <Results userName={userName} selectedGameTypes={selectedGameTypes} />
  );
}

export default ResultsRoute;
