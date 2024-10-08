import makeApolloClient from './utils/makeApolloClient';
import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
  mutation SendMessage($payload: messageRequest) {
    sendMessage(payload: $payload) {
      error
    }
  }
`;

class ApiServiceCustomerResolvers {
  client;

  constructor(client) {
    this.client = client;
  }

  sendMessage = async (payload) => {
    try {
      const result = await this.client.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          payload,
        },
      });
      console.log(result);
      return result.data.sendMessage;
    } catch (err) {
      console.log('ERROR:', err);
      return null;
    }
  };
}

const client = makeApolloClient(
  process.env.REACT_APP_CUSTOM_RESOLVERS_URL,
  null
);
const apiServiceCustomResolvers = new ApiServiceCustomerResolvers(client);
export { apiServiceCustomResolvers };
