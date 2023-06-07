import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class ShippingAndPaymentMessage extends Component {
  state = {
    msg: this.props.message,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <Card className="shippingMessage">
        <Card.Body>
          {this.state.msg.paymentAndShippingMessageType ==
          'BUYER_OFFER_MADE_BUYER_MESSAGE' ? (
            <Card.Title>
              {this.state.msg.totalInEuroCent / 100}€ (Исходящий запрос)
            </Card.Title>
          ) : (
            ''
          )}
          <Card.Text>{this.state.msg.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
