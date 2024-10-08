import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiService } from '../../services/ApiService';
import { Row, Col } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

export default class ChatFooter extends Component {
  state = {
    convChosenId: this.props.convChosenId,
    convId: null,
    type: this.props.type,
    choosingDenyReason: false,
    denyReason: {},
    advertLink: null,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const conversation = await apiService.getConversationByAdId(
      this.state.convChosenId
    );
    this.setState(() => {
      return { convId: conversation[0].id };
    });
    const advert = await apiService.getAdvertById(this.state.convChosenId);
    this.setState(() => {
      return { advertLink: advert.link };
    });
  }

  async updateCustomStatus() {
    if (this.state.type == 'Черный список') {
      const conversation = await apiService.getConversationById(
        this.state.convId
      );
      const sellerName = conversation.sellerName;
      await apiService.addSellerToBlacklist(sellerName);
    } else if (this.state.type == 'Запрос отклонён') {
      await apiService.updateCustomStatusAndDenyReason(
        this.state.convChosenId,
        this.state.type,
        this.state.denyReason.value
      );
    } else {
      await apiService.updateCustomStatus(
        this.state.convChosenId,
        this.state.type
      );
    }
  }

  render() {
    return (
      <Row className="chatFooter">
        <Col sm={2}>
          <Button className="modalButtonConv" variant="primary" type="submit">
            <a
              target="_blank"
              className="conversationLink"
              href={`https://www.kleinanzeigen.de/m-nachrichten.html?conversationId=${this.state.convId}`}
            >
              В диалог
            </a>
          </Button>
        </Col>
        <Col sm={2}>
          <Button variant="primary" type="submit">
            <a
              target="_blank"
              className="conversationLink"
              href={`${this.state.advertLink}`}
            >
              К консоли
            </a>
          </Button>
        </Col>
        <Col sm={3}>
          <Form.Group controlId="formBasicSelect">
            <Form.Control
              as="select"
              value={this.state.type}
              onChange={(e) => {
                this.setState(() => {
                  return { type: e.target.value };
                });
                if (e.target.value == 'Запрос отклонён') {
                  this.setState(() => {
                    return { choosingDenyReason: true };
                  });
                } else {
                  this.setState(() => {
                    return { choosingDenyReason: false };
                  });
                }
              }}
            >
              <option value="Диалог">Диалог</option>
              <option value="Диалог (обработано)">Диалог (обработано)</option>
              {/* <option value="Запрос отправлен">Запрос отправлен</option> */}
              <option value="Запрос отклонён">Запрос отклонён</option>
              {/* <option value="Запрос принят">Запрос принят</option> */}
              <option value="Оплачено">Оплачено</option>
              <option value="Посылка отправлена">Посылка отправлена</option>
              {/* <option value="Запрос просрочен">Запрос просрочен</option>
              <option value="Посылка не доставлена">
                Посылка не доставлена
              </option>
              <option value="Подтвердите получение">
                Подтвердите получение
              </option>
              <option value="Получено">Получено</option> */}
              <option value="Возврат средств">Возврат средств</option>
              {/* <option value="Платеж не прошел">Платеж не прошел</option>
              <option value="Нераспределенные">Нераспределенные</option> */}
              <option value="Проблема">Проблема</option>
              <option value="Черный список">Черный список</option>
            </Form.Control>
          </Form.Group>
        </Col>
        {this.state.choosingDenyReason ? (
          <Col sm={3}>
            <CreatableSelect
              isClearable={true}
              menuPlacement="top"
              onChange={(choice) => {
                this.setState(() => {
                  return { denyReason: choice };
                });
              }}
              options={[
                { value: 'Цена', label: 'Цена' },
                { value: 'Самовывоз', label: 'Самовывоз' },
                { value: 'Оплата Ебей', label: 'Оплата Ебей' },
                { value: 'Оплата нал', label: 'Оплата нал' },
                { value: 'Продано', label: 'Продано' },
                { value: 'Без причины', label: 'Без причины' },
              ]}
            />
          </Col>
        ) : (
          ''
        )}
        <Col sm={2}>
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
