import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Search from "./client/components/search/Search";
import Results from "./client/components/results/Results";
import Detail from "./client/components/detail/Detail";
import "./client/styles.scss";
import { render } from "react-dom";

const AppLayout = () => (
  <>
    <Search />
    <main className="ml-container">
      <Route exact path="/items" component={Results} />
      <Route exact path="/items/:id" component={Detail} />
    </main>
  </>
);

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
serviceWorker.unregister();
