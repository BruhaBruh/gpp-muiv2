import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = (host: string, protocol: string) =>
  new HttpLink({
    uri: `${protocol}//${host}/graphql`,
  });

const wsLink = (host: string, protocol: string) =>
  new WebSocketLink({
    uri: `ws${protocol.substr(4)}//${host}/graphql`,
    options: {
      reconnect: true,
    },
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = (host: string, protocol: string) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink(host, protocol),
    httpLink(host, protocol)
  );

export const client = (host: string, protocol: string) =>
  new ApolloClient({
    link: from([errorLink, splitLink(host, protocol)]),
    cache: new InMemoryCache(),
    name: "GPPlanetSite",
    version: "1.0",
    defaultOptions: {
      query: {},
    },
  });
