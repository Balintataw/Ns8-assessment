import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Header } from "src/components/Header";
import { Home } from "src/pages/Home";
import { Posts } from "src/pages/Posts";
import { Images } from "src/pages/Images";

const App = () => (
  <div>
    <Header />
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/posts/:id" component={Posts} />
      <Route path="/images/:id" component={Images} />
    </Router>
  </div>
);

export default App;
