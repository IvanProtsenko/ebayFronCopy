import React, { Component } from 'react';
import { apiService } from '../services/ApiService';
import DOMPurify from 'dompurify';

export default class Chat extends Component {
  state = {
    chatId: '',
    messages: [],
    currentMessage: null,
    messageChosen: false,
  };

  constructor(props) {
    super(props);
  }

  async openMessage(messageId) {
    const currentMessage = await apiService.getMessageByPk(messageId);
    this.setState(() => {
      return { currentMessage: currentMessage };
    });
    this.setState(() => {
      return { messageChosen: true };
    });
  }

  async componentDidMount() {
    let chatId = window.location.href.substring(
      window.location.href.lastIndexOf('/') + 1
    );
    console.log(chatId)
    this.setState(() => {
      return { chatId: chatId };
    });
    const messages = await apiService.getMessagesByAdvertId(chatId);
    console.log(messages)
    this.setState(() => {
        return { messages: messages };
    });
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <h3>
            Chat for {this.state.chatId}
          </h3>
        </div>
        <div className="mailReader">
          <div className="messageBox">
            {this.state.messages.map((msg, i) => (
              <div
                className={"message"+(msg.is_owner ? '-right' : '')}
                key={msg.id + i}
                onClick={() => this.openMessage(msg.id)}
              >
                <div className="date">{msg.sent_at}</div>
                <div className="from">{msg.is_owner}</div>
                <div className="subject">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="messageReader">
            {this.state.messageChosen ? (
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(this.state.currentMessage.text),
                }}
              ></div>
            ) : this.state.currentMessage ? (
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(this.state.currentMessage.text),
                }}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
