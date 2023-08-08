import makeApolloClient from './utils/makeApolloClient';
import gql from 'graphql-tag';

const GET_ADVERTS = gql`
  query GetAdverts {
    Adverts(limit: 100, order_by: { created_at: desc }) {
      adItemId
      buyNowAllowed
      consoleGeneration
      controllersCount
      created_at
      deliveryAllowed
      description
      hasDefect
      initialResponse
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
      viewed
    }
  }
`;

const GET_ADVERT_BY_ID = gql`
  query GetAdvertById($adItemId: bigint!) {
    Adverts_by_pk(adItemId: $adItemId) {
      adItemId
      buyNowAllowed
      consoleGeneration
      controllersCount
      created_at
      deliveryAllowed
      description
      hasDefect
      initialResponse
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
      viewed
    }
  }
`;

const GET_SELLERS_BLACKLIST = gql`
  query GetSellersBlacklist {
    sellers_blacklist {
      created_at
      name
    }
  }
`;

const GET_CONVERSATIONS = gql`
  query GetConversations($status: String) {
    Conversations(where: { customStatus: { _eq: $status } }) {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      buyerName
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
      Messages(order_by: { receivedDate: asc }) {
        viewed
        receivedDate
      }
    }
  }
`;

const GET_CONVERSATIONS_BY_AD_ID = gql`
  query GetConversations($adId: String) {
    Conversations(where: { adId: { _eq: $adId } }) {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      buyerName
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
      Messages(order_by: { receivedDate: asc }) {
        viewed
        receivedDate
      }
    }
  }
`;

const GET_MESSAGES_BY_CONV_ID = gql`
  query GetMessagesByConvId($convId: String) {
    Messages(
      where: { conversationId: { _eq: $convId } }
      order_by: { receivedDate: asc }
    ) {
      viewed
      active
      boundness
      messageId
      paymentAndShippingMessageType
      paymentMethod
      receivedDate
      text
      textShort
      title
      totalInEuroCent
      type
    }
  }
`;

const SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES = gql`
  subscription ConversationsWithMessages {
    Conversations {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      buyerName
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
      Messages(order_by: { receivedDate: asc }) {
        viewed
        active
        boundness
        messageId
        paymentAndShippingMessageType
        paymentMethod
        receivedDate
        text
        textShort
        title
        totalInEuroCent
        type
      }
    }
  }
`;

const SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES_BY_STATUS = gql`
  subscription ConversationsWithMessages($status: String) {
    Conversations(where: { customStatus: { _eq: $status } }) {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      buyerName
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
      Messages(order_by: { receivedDate: asc }) {
        viewed
        active
        boundness
        messageId
        paymentAndShippingMessageType
        paymentMethod
        receivedDate
        text
        textShort
        title
        totalInEuroCent
        type
      }
    }
  }
`;

const GET_CONVERSATION_BY_ID = gql`
  query GetConversationById($id: String!) {
    Conversations_by_pk(id: $id) {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      buyerName
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
    }
  }
`;

const GET_CONVERSATIONS_BY_SELLER_NAME = gql`
  query GetConversationsBySellerName($sellerName: String) {
    Conversations(where: { sellerName: { _eq: $sellerName } }) {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
      customStatus
      Messages(order_by: { receivedDate: asc }) {
        viewed
        receivedDate
      }
    }
  }
`;

const GET_CONVERSATIONS_WITH_MESSAGES = gql`
  query ConversationsWithMessages {
    Conversations {
      adId
      adStatus
      attachmentsEnabled
      buyNowPossible
      id
      numUnread
      role
      sellerName
      customStatus
      manualUpdatedDate
      Messages(order_by: { receivedDate: asc }) {
        viewed
        active
        boundness
        messageId
        paymentAndShippingMessageType
        paymentMethod
        receivedDate
        text
        textShort
        title
        totalInEuroCent
        type
      }
    }
  }
`;

const UPDATE_CUSTOM_STATUS_MANY = gql`
  mutation UpdateCustomStatusMany($ids: [String], $status: String) {
    update_Conversations_many(
      updates: { where: { id: { _in: $ids } }, _set: { customStatus: $status } }
    ) {
      affected_rows
    }
  }
`;

const MARK_MESSAGES_AS_VIEWED = gql`
  mutation MarkMessagesAsViewed($conversationId: String) {
    update_Messages(
      where: { conversationId: { _eq: $conversationId } }
      _set: { viewed: true }
    ) {
      affected_rows
    }
  }
`;

const MARK_CONV_AS_PROCESSED = gql`
  mutation MarkConvAsProcessed($id: String!) {
    update_Conversations_by_pk(
      pk_columns: { id: $id }
      _set: { customStatus: "Диалог (обработано)" }
    ) {
      id
    }
  }
`;

const UPDATE_CUSTOM_STATUS = gql`
  mutation UpdateCustomStatus($id: String!, $status: String, $date: String) {
    update_Conversations_by_pk(
      pk_columns: { id: $id }
      _set: { customStatus: $status, manualUpdatedDate: $date }
    ) {
      id
    }
  }
`;

const UPDATE_CUSTOM_STATUS_AND_REASON = gql`
  mutation UpdateCustomStatus(
    $id: String!
    $status: String
    $date: String
    $reason: String
  ) {
    update_Conversations_by_pk(
      pk_columns: { id: $id }
      _set: {
        customStatus: $status
        manualUpdatedDate: $date
        deny_reason: $reason
      }
    ) {
      id
    }
  }
`;

const ADD_BLACKLIST_SELLER = gql`
  mutation AddBlacklistSeller($name: String) {
    insert_sellers_blacklist_one(object: { name: $name }) {
      name
    }
  }
`;

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
      viewed
    }
  }
`;

const GET_MESSAGES_BY_ADVERT_ID = gql`
  query GetMessagesByAdvertId($advertId: bigint) {
    Messages(where: { advert_id: { _eq: $advertId } }) {
      id
      is_owner
      text
      advert_id
      sent_at
    }
  }
`;

const UPDATE_ADVERT_BY_PK = gql`
  mutation MyMutation2($id: bigint!, $_set: Adverts_set_input) {
    update_Adverts_by_pk(pk_columns: { adItemId: $id }, _set: $_set) {
      adItemId
    }
  }
`;

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
          adItemId: advertId,
        },
      });
      return result.data.Adverts_by_pk;
    } catch (err) {
      console.log('ERROR getAccounts:', err);
    }
  };

  getConversationsByStatus = async (status) => {
    try {
      const result = await this.client.query({
        query: GET_CONVERSATIONS,
        variables: {
          status,
        },
      });
      return result.data.Conversations;
    } catch (err) {
      console.log('ERROR getConversationsByStatus:', err);
    }
  };

  getConversationByAdId = async (adId) => {
    try {
      const result = await this.client.query({
        query: GET_CONVERSATIONS_BY_AD_ID,
        variables: {
          adId,
        },
      });
      return result.data.Conversations;
    } catch (err) {
      console.log('ERROR getConversationsByAdId:', err);
    }
  };

  getConversationById = async (id) => {
    try {
      const result = await this.client.query({
        query: GET_CONVERSATION_BY_ID,
        variables: {
          id,
        },
      });
      return result.data.Conversations_by_pk;
    } catch (err) {
      console.log('ERROR getConversationById:', err);
    }
  };

  getBlacklistSellerNames = async () => {
    try {
      const result = await this.client.query({
        query: GET_SELLERS_BLACKLIST,
      });
      return result.data.sellers_blacklist;
    } catch (err) {
      console.log('ERROR getBlacklistSellerNames:', err);
    }
  };

  getMessagesByConvId = async (convId) => {
    try {
      const result = await this.client.query({
        query: GET_MESSAGES_BY_CONV_ID,
        variables: {
          convId,
        },
      });
      return result.data.Messages;
    } catch (err) {
      console.log('ERROR getMessagesByConvId:', err);
    }
  };

  getConversationsWithMessages = async () => {
    try {
      const result = await this.client.query({
        query: GET_CONVERSATIONS_WITH_MESSAGES,
      });
      return result.data.Conversations;
    } catch (err) {
      console.log('ERROR getConversationsWithMessage:', err);
    }
  };

  getConversationsBySellerName = async (sellerName) => {
    try {
      const result = await this.client.query({
        query: GET_CONVERSATIONS_BY_SELLER_NAME,
        variables: {
          sellerName,
        },
      });
      return result.data.Conversations;
    } catch (err) {
      console.log('ERROR getConversationsBySellerName:', err);
    }
  };

  getMessagesByAdvertId = async (advertId) => {
    try {
      const result = await this.client.query({
        query: GET_MESSAGES_BY_ADVERT_ID,
        variables: {
          advertId,
        },
      });
      return result.data.Messages;
    } catch (err) {
      console.log('ERROR getMessagesByAdvertId:', err);
    }
  };

  markMessagesInConvViewed = async (convId) => {
    try {
      await this.client.mutate({
        mutation: MARK_MESSAGES_AS_VIEWED,
        variables: {
          conversationId: convId,
        },
      });
    } catch (err) {
      console.log('ERROR markMessagesInConvViewed:', err);
    }
  };

  markConvAsProcessed = async (convId) => {
    try {
      await this.client.mutate({
        mutation: MARK_CONV_AS_PROCESSED,
        variables: {
          id: convId,
        },
      });
    } catch (err) {
      console.log('ERROR markConvAsProcessed:', err);
    }
  };

  addSellerToBlacklist = async (name) => {
    try {
      await this.client.mutate({
        mutation: ADD_BLACKLIST_SELLER,
        variables: {
          name,
        },
      });
    } catch (err) {
      console.log('ERROR addSellerToBlacklist:', err);
    }
  };

  updateCustomStatus = async (convId, status) => {
    try {
      const date = new Date();
      const dateInFormat = date.toISOString();
      const result = await this.client.mutate({
        mutation: UPDATE_CUSTOM_STATUS,
        variables: {
          id: convId,
          status,
          date: dateInFormat,
        },
      });
      console.log(result);
    } catch (err) {
      console.log('ERROR updateCustomStatus:', err);
    }
  };

  updateCustomStatusAndDenyReason = async (convId, status, reason) => {
    try {
      const date = new Date();
      const dateInFormat = date.toISOString();
      const result = await this.client.mutate({
        mutation: UPDATE_CUSTOM_STATUS_AND_REASON,
        variables: {
          id: convId,
          status,
          date: dateInFormat,
          reason,
        },
      });
      console.log(result);
    } catch (err) {
      console.log('ERROR updateCustomStatusAndDenyReason:', err);
    }
  };

  updateCustomStatusMany = async (convIds, status) => {
    try {
      await this.client.mutate({
        mutation: UPDATE_CUSTOM_STATUS_MANY,
        variables: {
          ids: convIds,
          status,
        },
      });
    } catch (err) {
      console.log('ERROR updateCustomStatusMany:', err);
    }
  };

  updateAdvertByPk = async (data) => {
    try {
      await this.client.mutate({
        mutation: UPDATE_ADVERT_BY_PK,
        variables: {
          id: data.adItemId,
          _set: data,
        },
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
export {
  client,
  apiService,
  SUBSCRIBE_ADVERTS,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES_BY_STATUS,
};
