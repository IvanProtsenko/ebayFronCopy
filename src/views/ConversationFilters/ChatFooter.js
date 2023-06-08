import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiService } from '../../services/ApiService';
import { Row, Col } from 'react-bootstrap';

export default class ChatFooter extends Component {
  state = {
    convChosenId: this.props.convChosenId,
    type: this.props.type,
  };

  constructor(props) {
    console.log(props);
    super(props);
  }

  async componentDidMount() {}

  async updateCustomStatus() {
    await apiService.updateCustomStatus(
      this.state.convChosenId,
      this.state.type
    );
  }

  render() {
    return (
      <Row>
        <Col sm={3}>
          <Button className="modalButtonConv" variant="primary" type="submit">
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
              <option value="Диалог (обработано)">Диалог (обработано)</option>
              <option value="Запрос отправлен">Запрос отправлен</option>
              <option value="Запрос отклонён">Запрос отклонён</option>
              <option value="Запрос принят">Запрос принят</option>
              <option value="Оплачено">Оплачено</option>
              <option value="Посылка отправлена">Посылка отправлена</option>
              <option value="Запрос просрочен">Запрос просрочен</option>
              <option value="Посылка не доставлена">
                Посылка не доставлена
              </option>
              <option value="Получено">Получено</option>
              <option value="Возврат средств">Возврат средств</option>
              <option value="Платеж не прошел">Платеж не прошел</option>
              <option value="Нераспределенные">Нераспределенные</option>
              <option value="Отложенные">Отложенные</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Button
            className="modalButtonConv"
            onClick={() => this.updateCustomStatus()}
            variant="primary"
            type="submit"
          >
            Назначить
          </Button>
        </Col>
      </Row>
    );
  }
}
