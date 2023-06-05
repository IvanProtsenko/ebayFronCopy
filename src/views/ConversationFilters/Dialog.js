import React, { Component } from 'react';
import { apiService } from '../../services/ApiService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Dialog extends Component {
  state = {
    chatId: '',
    conversations: [],
    advert: null,
    advertStatus: "",
    advertStatusDesc: "",
    messages: [],
    convChosen: false,
    convChosenId: ''
  };

  constructor(props) {
    super(props);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        adItemId: this.state.chatId,
        status: this.state.advertStatus,
        statusDescription: this.state.advertStatusDesc,
    }
    await apiService.updateAdvertByPk(data);
  }

  handleInputStatus = (event) => {
    this.setState(() => {
      return { advertStatus: event.target.value };
    });
  };

  handleInputStatusDescription = (event) => {
    this.setState(() => {
      return { advertStatusDesc: event.target.value };
    });
  };

  async markAsProcessed(convId) {
    await apiService.markConvAsProcessed(convId)
  }

  async openConversation(convId) {
    await apiService.markMessagesInConvViewed(convId)
    const messages = await apiService.getMessagesByConvId(convId)
    this.setState(() => {
      return { messages: messages };
    });
    this.setState(() => {
      return { convChosen: true };
    });
    this.setState(() => {
      return { convChosenId: convId };
    });
  }

  async componentDidMount() {
    const conversations = await apiService.getConversationsByStatus('Диалог')
    console.log(conversations)
    // let chatId = window.location.href.substring(
    //   window.location.href.lastIndexOf('/') + 1
    // );
    // console.log(chatId)
    // this.setState(() => {
    //   return { chatId: chatId };
    // });
    // const messages = await apiService.getMessagesByAdvertId(chatId);
    // const advert = await apiService.getAdvertById(chatId)
    // await apiService.updateAdvertByPk({adItemId: chatId, viewed: true})
    this.setState(() => {
      return { conversations: conversations };
    });
    // this.setState(() => {
    //   return { advert: advert };
    // });
    // this.setState(() => {
    //   return { advertStatus: advert.status };
    // });
    // this.setState(() => {
    //   return { advertStatusDesc: advert.statusDescription };
    // });
  }

  render() {
    return (
      <div className="app">
        <div className="mailReader">
          <div className="messageBox">
            {this.state.conversations.map((conv) => (
              <div
                className={"message"+(conv.Messages.filter(msg => msg.viewed == false).length > 0 ? '-unread' : '')
                + (conv.id == this.state.convChosenId ? '-active' : '')}
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
              {this.state.convChosen ? (
                this.state.messages.map((msg) => (
                  <div
                    className={"message"+(msg.boundness == "OUTBOUND" ? '-right' : '')}
                    key={msg.messageId}
                  >
                    <div className="date">{msg.receivedDate}</div>
                    <div className="from">{msg.title}</div>
                    <div className="subject">{msg.type == 'MESSAGE'} ? {msg.textShort} : {msg.text})</div>
                  </div>
                ))
              ) : ''}
            </div>
            {this.state.convChosen ? 
              <div>
                <Button className="modalButtonConv" variant="primary" type="submit">
                  <a target='_blank' className="conversationLink"
                  href={`https://www.kleinanzeigen.de/m-nachrichten.html?conversationId=${this.state.convChosenId}`}>Перейти в диалог</a>
                </Button>
                <Button className="modalButtonConv" onClick={() => this.markAsProcessed(this.state.convChosenId)} variant="primary" type="submit">
                  Пометить обработанным
                </Button>
              </div>
             : ''}
          </div>
        </div>
      </div>
    );
  }
}
