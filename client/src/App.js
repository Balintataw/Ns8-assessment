import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Header } from "src/components/Header";
import { Home } from "src/pages/Home";

const App = () => (
  <div>
    <Header />
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </div>
);

export default App;
