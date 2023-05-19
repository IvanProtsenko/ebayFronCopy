import makeApolloClient from './utils/makeApolloClient';
import gql from 'graphql-tag';

const GET_ADVERTS = gql`
  query GetAdverts {
    Adverts {
      adItemId
      buyNowAllowed
      consoleGeneration
      controllersCount
      created_at
      deliveryAllowed
      description
      hasDefect
      initialResponse
      isPS4
      link
      location
      offerAllowed
      price
      publishDate
      recommendedPrice
      status
      title
      tradeAllowed
      statusDescription
    }
  }
`;

const GET_ADVERT_BY_ID = gql`
  query GetAdvertById($adItemId: bigint!) {
    Adverts_by_pk(adItemId: $adItemId) {
      adItemId
      buyNowAllowed
      created_at
      description
      initialResponse
      link
      location
      offerAllowed
      price
      recommendedPrice
      status
      statusDescription
      title
    }
  }
`

const SUBSCRIBE_ADVERTS = gql`
  subscription MySubscription {
    Adverts {
      adItemId
      buyNowAllowed
      consoleGeneration
      controllersCount
      created_at
      deliveryAllowed
      description
      hasDefect
      initialResponse
      isPS4
      link
      location
      offerAllowed
      price
      publishDate
      recommendedPrice
      status
      title
      tradeAllowed
      statusDescription
    }
  }
`;

const GET_MESSAGES_BY_ADVERT_ID = gql`
  query GetMessagesByAdvertId($advertId: bigint) {
    Messages(where: {advert_id: {_eq: $advertId}}) {
      id
      is_owner
      text
      advert_id
      sent_at
    }
  }
`

const UPDATE_ADVERT_BY_PK = gql`
  mutation MyMutation2($id: bigint!, $_set: Adverts_set_input) {
    update_Adverts_by_pk(pk_columns: {adItemId: $id}, _set: $_set) {
      adItemId
    }
  }
`

class ApiService {
  client;

  constructor(client) {
    this.client = client;
  }

  getAdverts = async () => {
    try {
      const result = await this.client.query({
        query: GET_ADVERTS,
      });
      return result.data.Adverts;
    } catch (err) {
      console.log('ERROR getAccounts:', err);
    }
  };

  getAdvertById = async (advertId) => {
    try {
      const result = await this.client.query({
        query: GET_ADVERT_BY_ID,
        variables: {
          adItemId: advertId
        }
      });
      return result.data.Adverts_by_pk;
    } catch (err) {
      console.log('ERROR getAccounts:', err);
    }
  };

  getMessagesByAdvertId = async (advertId) => {
    try {
      const result = await this.client.query({
        query: GET_MESSAGES_BY_ADVERT_ID,
        variables: {
          advertId
        }
      });
      return result.data.Messages;
    } catch (err) {
      console.log('ERROR getMessagesByAdvertId:', err);
    }
  };

  updateAdvertByPk = async (data) => {
    try {
      await this.client.mutate({
        mutation: UPDATE_ADVERT_BY_PK,
        variables: {
          id: data.adItemId,
          _set: data
        }
      });
    } catch (err) {
      console.log('ERROR updateAdvertByPk:', err);
    }
  };
}

const client = makeApolloClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_WS_URL
);
const apiService = new ApiService(client);
export { client, apiService, SUBSCRIBE_ADVERTS };
