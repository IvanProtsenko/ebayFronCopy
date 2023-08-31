import React, { Component } from 'react';
import {
  apiService,
  client,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES_BY_STATUS,
  SUBSCRIBE_EMAIL_CONVERSATIONS_WITH_MESSAGES_BY_STATUS,
} from '../../services/ApiService';
import Card from 'react-bootstrap/Card';

import MessageSender from './MessageSender';
import Message from './Message';
import ChatFooter from './ChatFooter';
import ShippingAndPaymentMessage from './ShippingAndPaymentMessage';
import NavsLeft from './NavsLeft';

export default class Chat extends Component {
  subscription = null;
  state = {
    chatId: '',
    conversations: [],
    messages: [],
    convChosen: false,
    convChosenId: '',
    type: 'Диалог',
    status: this.props.status,
  };

  constructor(props) {
    super(props);
  }

  async openConversation(convId) {
    await apiService.markConvViewed(convId);
    const messages = await apiService.getMessagesByConvId(convId);
    this.setState(() => {
      return { convChosen: false };
    });
    await this.setState(() => {
      return { convChosenId: '' };
    });
    await this.setState(() => {
      return { convChosenId: convId };
    });
    await this.setState(() => {
      return { messages: [] };
    });
    await this.setState(() => {
      return { messages: messages };
    });
    this.setState(() => {
      return { convChosen: true };
    });
  }

  async operateConversations(conversations) {
    let arrayForSort = [...conversations];
    if (arrayForSort.length > 1)
      arrayForSort.sort((conv1, conv2) => {
        const firstDate = conv1.customLastUpdate;
        const secondDate = conv2.customLastUpdate;
        if (firstDate > secondDate) return -1;
        else return 1;
      });
    this.setState(() => {
      return { conversations: arrayForSort };
    });
  }

  async componentDidMount() {
    const changeRowData = async (data) => {
      this.operateConversations(data);
    };

    let conversations = await apiService.getConversationsByStatus(
      this.state.status
    );
    this.operateConversations(conversations);
    const observer = client.subscribe({
      query: SUBSCRIBE_EMAIL_CONVERSATIONS_WITH_MESSAGES_BY_STATUS,
      variables: {
        status: this.state.status,
      },
    });

    this.subscription = observer.subscribe({
      next(data) {
        changeRowData(data.data.EmailConversations);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  async componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div className="app">
        <div className="mailReader">
          <div className="messageBoxConv">
            {this.state.conversations.map((conv) => (
              <div
                className={
                  'message' +
                  (conv.customUnread ? '-unread' : '') +
                  (conv.adId == this.state.convChosenId ? '-active' : '')
                }
                key={conv.id}
                onClick={() => this.openConversation(conv.adId)}
              >
                <div className="date">{conv.customLastUpdate}</div>
                <div className="from">
                  {conv.sellerName +
                    (conv.adStatus == 'ACTIVE'
                      ? ' (Активно)'
                      : conv.adStatus == 'DELETED'
                      ? ' (Удалено)'
                      : conv.adStatus == 'BANNED'
                      ? ' (Забанен)'
                      : '') +
                    ` (${conv.Account.email})`}
                </div>
                <div className="subject">{conv.adTitle}</div>
              </div>
            ))}
          </div>
          <div className="messageReader">
            <div className="messageBox">
              {this.state.convChosen
                ? this.state.messages.map((msg) =>
                    msg.type == 'PAYMENT_AND_SHIPPING_MESSAGE' ? (
                      <ShippingAndPaymentMessage message={msg} />
                    ) : (
                      <Message message={msg} />
                    )
                  )
                : ''}
            </div>
            {this.state.convChosen ? (
              <MessageSender convId={this.state.convChosenId} />
            ) : (
              ''
            )}
            {this.state.convChosen ? (
              <ChatFooter
                type={this.state.status}
                convChosenId={this.state.convChosenId}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
