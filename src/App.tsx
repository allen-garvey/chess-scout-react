import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Search from './components/search';
import ResultsRoute from './components/results-route';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route path="/u/:userName" children={<ResultsRoute />} />
      </Switch>
    </Router>
  );
}

export default App;
