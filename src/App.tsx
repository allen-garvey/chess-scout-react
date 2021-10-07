import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom';
import Search from './components/search';
import Results from './components/results';

interface ResultsParams {
  userName: string;
};

interface ChildProps {
  selectedGameTypes: string;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Child({ selectedGameTypes }: ChildProps) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { userName } = useParams<ResultsParams>();

  return (
    <Results userName={userName} selectedGameTypes={selectedGameTypes} />
  );
}

function App() {
  const query = useQuery();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route path="/u/:userName" children={<Child selectedGameTypes={query.get('gameTypes') || ''} />} />
      </Switch>
    </Router>
  );
}

export default App;
