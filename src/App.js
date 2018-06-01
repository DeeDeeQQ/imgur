import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Gallery from "./components/Gallery";
import Post from "./components/Post";
import "./App.css";

const App = props => (
  <Router basename={props.path}>
    <div>
      <Route exact path="/" component={Gallery} />
      <Route path="/post" component={Post} />
    </div>
  </Router>
);

export default App;
