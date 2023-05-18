import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import fetch from 'cross-fetch';
import { WebSocketLink } from '@apollo/client/link/ws';

function getToken() {
  return localStorage.getItem('userToken');
}

function getHttpLink(httpURL) {
  const token = getToken();
  console.log(token)
  return new HttpLink({
    uri: httpURL,
    fetch,
    headers: { 'x-hasura-admin-secret': `${token}` },
  });
}

function getWssLink(wsUrl) {
  const token = getToken();
  return new WebSocketLink({
    uri: wsUrl,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': `${token}`,
        },
      },
    },
  });
}

function getSplittedLink(httpLink, wsLink) {
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  return splitLink;
}

export default function makeApolloClient(httpURL, wsURL, token = '') {
  const httpLink = getHttpLink(httpURL, token);
  let splitLink = '';
  if (wsURL == null) {
    splitLink = httpLink;
  } else {
    const wssLink = getWssLink(wsURL);
    splitLink = getSplittedLink(httpLink, wssLink);
  }
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return client;
}
