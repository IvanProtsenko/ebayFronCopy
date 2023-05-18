import makeApolloClient from './utils/makeApolloClient';
import gql from 'graphql-tag';

const REGISTER = gql`
  mutation Register($payload: AccountPayload!) {
    Register(payload: $payload)
  }
`;

const LOGIN = gql`
  mutation Login($payload: AccountPayload!) {
    Login(payload: $payload)
  }
`;

const STOP_ACC = gql`
  mutation StopAcc($payload: AccountPayload!) {
    StopAcc(payload: $payload)
  }
`;

const EXPORT_ACCS_TO_CSV = gql`
  mutation SendCommandHttp($payload: [AccountToExport]) {
    ExportAccsToCSV(payload: $payload)
  }
`;

const FETCH_MAIL = gql`
  mutation FetchMail($payload: AccountPayload!) {
    FetchMail(payload: $payload)
  }
`;

const GET_USER_JWT = gql`
  query GetUserJwt($token: String!) {
    getUserJWT(token: $token)
  }
`;

const GET_USER_ID_BY_SECRET_KEY = gql`
  query GetUserIdBySecretKey($token: String!) {
    getUserIdBySecretKey(token: $token)
  }
`;

class ApiServiceCustomerResolvers {
  client;

  constructor(client) {
    this.client = client;
  }

  register = async (payload) => {
    try {
      const result = await this.client.mutate({
        mutation: REGISTER,
        variables: {
          payload,
        },
      });
      console.log(result);
      return result.data;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  signIn = async (payload) => {
    try {
      const result = await this.client.mutate({
        mutation: LOGIN,
        variables: {
          payload,
        },
      });
      console.log(result);
      return result.data;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  stopAcc = async (payload) => {
    try {
      const result = await this.client.mutate({
        mutation: STOP_ACC,
        variables: {
          payload,
        },
      });
      console.log(result);
      return result.data;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  exportAccsToCSV = async (accs) => {
    console.log(accs);
    try {
      const result = await this.client.mutate({
        mutation: EXPORT_ACCS_TO_CSV,
        variables: {
          payload: accs,
        },
      });
      console.log(result);
      return result.data.ExportAccsToCSV;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  fetchMail = async (payload) => {
    try {
      const result = await this.client.mutate({
        mutation: FETCH_MAIL,
        variables: {
          payload,
        },
      });
      console.log(result);
      return result.data;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  getUserJWT = async (token) => {
    try {
      const result = await this.client.query({
        query: GET_USER_JWT,
        variables: {
          token,
        },
      });
      console.log(result);
      return result.data.getUserJWT;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  getUserIdBySecretKey = async (token) => {
    try {
      const result = await this.client.query({
        query: GET_USER_ID_BY_SECRET_KEY,
        variables: {
          token,
        },
      });
      console.log(result);
      return result.data.getUserIdBySecretKey;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };
}

const client = makeApolloClient(
  process.env.REACT_APP_CUSTOM_RESOLVERS_URL,
  null
);
const apiServiceCustomResolvers = new ApiServiceCustomerResolvers(client);
export { apiServiceCustomResolvers };
