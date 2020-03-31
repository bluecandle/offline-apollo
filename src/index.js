import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";
import "./globalStyles";

// ReactDOM.render(<App />, document.getElementById("root"));

// #1.2 Offline Apollo Configuration
ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );

