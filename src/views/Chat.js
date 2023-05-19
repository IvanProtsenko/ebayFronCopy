import React, { Component } from 'react';
import { apiService } from '../services/ApiService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Chat extends Component {
  state = {
    chatId: '',
    messages: [],
    advert: null,
    advertStatus: "",
    advertStatusDesc: "",
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
    const advert = await apiService.getAdvertById(chatId)
    await apiService.updateAdvertByPk({adItemId: chatId, viewed: true})
    this.setState(() => {
      return { messages: messages };
    });
    this.setState(() => {
      return { advert: advert };
    });
    this.setState(() => {
      return { advertStatus: advert.status };
    });
    this.setState(() => {
      return { advertStatusDesc: advert.statusDescription };
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
                // onClick={() => this.openMessage(msg.id)}
              >
                <div className="date">{msg.sent_at}</div>
                <div className="from">{msg.is_owner}</div>
                <div className="subject">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="messageReader">
            {this.state.advert ? (
              <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <a href={this.state.advert.link}>{this.state.advert.link}</a>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"title: " + this.state.advert.title}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"price: " + this.state.advert.price}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"recommended price: " + this.state.advert.recommendedPrice}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={this.state.advertStatus}
                    onChange={this.handleInputStatus}
                    placeholder="Status"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={this.state.advertStatusDesc}
                    onChange={this.handleInputStatusDescription}
                    placeholder="Status description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"location: " + this.state.advert.location}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"controllers count: " + this.state.advert.controllersCount}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"generation: " + this.state.advert.consoleGeneration}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"trade allowed: " + this.state.advert.tradeAllowed}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"buy now allowed: " + this.state.advert.buyNowAllowed}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"delivery allowed: " + this.state.advert.deliveryAllowed}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"offer allowed: " + this.state.advert.offerAllowed}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={"defect: " + this.state.advert.hasDefect}
                    disabled
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button className="modalButton" variant="primary" type="submit">
                    Сохранить
                  </Button>
                </div>
              </Form>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }
}
