import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Homepage from './components/homepage';
import ResultsRoute from './components/results-route';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/u/:userName" children={<ResultsRoute />} />
      </Switch>
    </Router>
  );
}

export default App;
