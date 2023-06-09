import React, { Component } from 'react';
import { apiService } from '../../services/ApiService';
import Card from 'react-bootstrap/Card';
import Message from './Message';
import ChatFooter from './ChatFooter';
import ShippingAndPaymentMessage from './ShippingAndPaymentMessage';

export default class Chat extends Component {
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
    await apiService.markMessagesInConvViewed(convId);
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

  async componentDidMount() {
    const conversations = await apiService.getConversationsByStatus(
      this.state.status
    );
    this.setState(() => {
      return { conversations: conversations };
    });
  }

  render() {
    return (
      <div className="app">
        <div className="mailReader">
          <div className="messageBox">
            {this.state.conversations.map((conv) => (
              <div
                className={
                  'message' +
                  (conv.Messages.filter((msg) => msg.viewed == false).length > 0
                    ? '-unread'
                    : '') +
                  (conv.id == this.state.convChosenId ? '-active' : '')
                }
                key={conv.id}
                onClick={() => this.openConversation(conv.id)}
              >
                <div className="date">{conv.id}</div>
                <div className="from">{conv.sellerName}</div>
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
