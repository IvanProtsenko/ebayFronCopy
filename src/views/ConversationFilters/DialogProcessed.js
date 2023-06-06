import React, { Component } from 'react';
import { apiService } from '../../services/ApiService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

export default class DialogProcessed extends Component {
  state = {
    chatId: '',
    conversations: [],
    advert: null,
    advertStatus: '',
    advertStatusDesc: '',
    messages: [],
    convChosen: false,
    convChosenId: '',
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
    };
    await apiService.updateAdvertByPk(data);
  };

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

  async updateCustomStatus(convId) {
    await apiService.updateCustomStatus(convId, this.state.type);
  }

  async openConversation(convId) {
    await apiService.markMessagesInConvViewed(convId);
    const messages = await apiService.getMessagesByConvId(convId);
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
    const conversations = await apiService.getConversationsByStatus(
      'Диалог (обработано)'
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
                ? this.state.messages.map((msg) => (
                    <div
                      className={
                        'message' +
                        (msg.boundness == 'OUTBOUND' ? '-right' : '')
                      }
                      key={msg.messageId}
                    >
                      <div className="date">{msg.receivedDate}</div>
                      <div className="from">{msg.title}</div>
                      <div className="subject">
                        {msg.type == 'MESSAGE'} ? {msg.textShort} : {msg.text})
                      </div>
                    </div>
                  ))
                : ''}
            </div>
            {this.state.convChosen ? (
              <Row>
                <Col sm={3}>
                  <Button
                    className="modalButtonConv"
                    variant="primary"
                    type="submit"
                  >
                    <a
                      target="_blank"
                      className="conversationLink"
                      href={`https://www.kleinanzeigen.de/m-nachrichten.html?conversationId=${this.state.convChosenId}`}
                    >
                      Перейти в диалог
                    </a>
                  </Button>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Control
                      as="select"
                      value={this.state.type}
                      onChange={(e) => {
                        this.setState(() => {
                          return { type: e.target.value };
                        });
                      }}
                    >
                      <option value="Диалог">Диалог</option>
                      <option value="Диалог (обработано)">
                        Диалог (обработано)
                      </option>
                      <option value="Запрос отправлен">Запрос отправлен</option>
                      <option value="Запрос отклонён">Запрос отклонён</option>
                      <option value="Запрос принят">Запрос принят</option>
                      <option value="Оплачено">Оплачено</option>
                      <option value="Посылка отправлена">
                        Посылка отправлена
                      </option>
                      <option value="Запрос просрочен">Запрос просрочен</option>
                      <option value="Посылка не доставлена">
                        Посылка не доставлена
                      </option>
                      <option value="Получено">Получено</option>
                      <option value="Нераспределенные">Нераспределенные</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Button
                    className="modalButtonConv"
                    onClick={() =>
                      this.updateCustomStatus(this.state.convChosenId)
                    }
                    variant="primary"
                    type="submit"
                  >
                    Назначить
                  </Button>
                </Col>
              </Row>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
