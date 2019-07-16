import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home'
import Posts from './Posts'
import Post from './Post'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/post/:postId" component={Post} />
      <Route path="/posts/:userId" component={Posts} />
  </Router>
  );
}

export default App;
