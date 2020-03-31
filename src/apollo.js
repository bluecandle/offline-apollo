import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

import { typeDefs, defaults, resolvers } from "./clientState";

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache, // clientState 를 어디에 저장할 것인지 지정하는 역할. (apollo-boost 를 사용할 때는 자동으로 생성됐었지!)
  typeDefs,
  defaults,
  resolvers
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink])
});

export default client;