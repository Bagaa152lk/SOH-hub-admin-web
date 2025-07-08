import { ApolloClient, InMemoryCache, ApolloLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

// 🔐 Auth Link (CSRF Headers орсон)
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      "x-apollo-operation-name": operation.operationName || "Unknown",
      "apollo-require-preflight": "true", // CSRF хамгаалалт
    },
  }));

  return forward(operation);
});

// 📤 Upload Link
const uploadLink = createUploadLink({
  uri: "https://api.shieldnirun.io/graphql",
  // uri: "http://192.168.1.9:4000/graphql",
  // uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://api.shieldnirun.io/graphql",
    // url: "ws://192.168.1.9:4000/graphql",
    // url: "ws://localhost:4000/graphql",

    connectionParams: () => {
      const token = localStorage.getItem("token");
      return {
        headers: {
          authorization: token ? `${token}` : "",
        },
      };
    },
  })
);

// 🔀 Split HTTP vs WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(uploadLink) // Queries + Mutations (upload-д зориулагдсан)
);

// 🚀 Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
