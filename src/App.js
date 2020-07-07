import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/Header';
import Home from './Home/Home';
import Stock from './Stock/Stock';



export default function App() {


  return (
    <Router>
      <Header />

      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stock" component={Stock} />
        </Switch>
      </div>
    </Router>
  );
}






