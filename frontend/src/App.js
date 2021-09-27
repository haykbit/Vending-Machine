import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import VendorMachine from "./components/VendorMachine";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={VendorMachine}></Route>
      </Switch>
    </Router>
  );
}

export default App;
