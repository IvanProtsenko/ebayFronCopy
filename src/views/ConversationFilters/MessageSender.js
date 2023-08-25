import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiService } from '../../services/ApiService';
import { Row, Col } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import makeid from '../../services/utils/makeRandomString';
import { apiServiceCustomResolvers } from '../../services/ApiCustomResolvers';

export default class MessageSender extends Component {
  state = {
    convChosenId: this.props.convId,
    messageText: '',
    messageResponse: '',
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  handleInputMessageText = async (event) => {
    this.setState(() => {
      return { messageText: event.target.value };
    });
  };

  async sendMessage() {
    const messageToAdd = {
      text: this.state.messageText,
      adId: this.props.convId,
    };
    console.log(messageToAdd);
    this.setState(() => {
      return { messageResponse: 'Отправляется...' };
    });
    const response = await apiServiceCustomResolvers.sendMessage(messageToAdd);
    if (response && response.error) {
      this.setState(() => {
        return { messageResponse: 'Ошибка отправки' };
      });
    } else {
      this.setState(() => {
        return { messageResponse: 'Успешно отправлено' };
      });
    }
  }

  render() {
    return (
      <Row className="chatFooter">
        <Col sm={{ span: 6, offset: 0 }} className="input">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={2}
              value={this.state.messageText}
              onChange={this.handleInputMessageText}
            />
          </Form.Group>
        </Col>

        <Col sm={2}>
          <Button
            disabled={
              this.state.messageResponse == 'Отправляется...' ? true : false
            }
            className="modalButtonConv"
            onClick={() => this.sendMessage()}
            variant="primary"
            type="submit"
          >
            Отправить
          </Button>
        </Col>
        {this.state.messageResponse ? (
          <Col sm={{ span: 3, offset: 0 }} className="input">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                value={this.state.messageResponse}
                disabled={true}
              />
            </Form.Group>
          </Col>
        ) : (
          ''
        )}
      </Row>
    );
  }
}
