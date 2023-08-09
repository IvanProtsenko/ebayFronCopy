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
    console.log(this.state.convChosenId);
    const conversation = await apiService.getConversationById(
      this.state.convChosenId
    );
    const advert = await apiService.getAdvertById(conversation.adId);
    const messageToAdd = {
      text: this.state.messageText,
      url: advert.link,
    };
    console.log(messageToAdd);
    await apiServiceCustomResolvers.sendMessage(messageToAdd);
  }

  render() {
    return (
      <Row className="chatFooter">
        <Col sm={{ span: 8, offset: 0 }} className="input">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={1}
              value={this.state.messageText}
              onChange={this.handleInputMessageText}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Button
            className="modalButtonConv"
            onClick={() => this.sendMessage()}
            variant="primary"
            type="submit"
          >
            Отправить
          </Button>
        </Col>
      </Row>
    );
  }
}
