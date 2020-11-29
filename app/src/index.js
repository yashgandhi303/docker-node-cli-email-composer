import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "bootstrap/dist/css/bootstrap.min.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
});

const Loading = () => <div>...loading</div>;

const AsyncRegister = Loadable({
  loader: () => import("./subscribe"),
  loading: Loading,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route path="/" exact component={AsyncRegister} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
