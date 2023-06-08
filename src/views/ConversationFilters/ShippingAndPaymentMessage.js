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
    let messageType = this.state.msg.paymentAndShippingMessageType;

    console.log(messageType);

    const renderShipping = () => {
      if (messageType == 'BUYER_OFFER_MADE_BUYER_MESSAGE') {
        return (
          <Card.Title>
            {this.state.msg.totalInEuroCent / 100}€ (Исходящий запрос)
          </Card.Title>
        );
      } else if (messageType == 'CHARGEBACK_INITIATED_MESSAGE_BUYER_MESSAGE') {
        return (
          <Card.Title>
            {this.state.msg.totalInEuroCent / 100}€ (Возврат средств)
          </Card.Title>
        );
      } else if (messageType == 'TRANSACTION_EXPIRED_MESSAGE') {
        return <Card.Title>Платеж не прошел</Card.Title>;
      } else if (messageType == 'TRANSACTION_CHARGEBACK_MESSAGE') {
        return <Card.Title>Возврат денег начался</Card.Title>;
      } else if (messageType == 'SELLER_REJECTED_OFFER_BUYER_MESSAGE') {
        return <Card.Title>Запрос отклонен</Card.Title>;
      } else if (messageType == 'ITEM_MARKED_AS_RECEIVED_BUYER_MESSAGE') {
        return <Card.Title>Товар получен, все в порядке</Card.Title>;
      } else if (messageType == 'ITEM_DELIVERED_BUYER_MESSAGE') {
        return <Card.Title>Товар доставлен, подтвердите получение</Card.Title>;
      } else if (messageType == 'OFFER_ACCEPTED_BUYER_MESSAGE') {
        return <Card.Title>Запрос принят</Card.Title>;
      } else if (messageType == 'SURVEY_MESSAGE') {
        return <Card.Title>Оставьте отзыв</Card.Title>;
      } else if (
        messageType == 'ITEM_MARKED_AS_SHIPPED_TRACKING_AVAILABLE_BUYER_MESSAGE'
      ) {
        return <Card.Title>Посылка отправлена</Card.Title>;
      } else if (messageType == 'TRANSACTION_PENDING_BUYER_MESSAGE') {
        return <Card.Title>Оплата началась</Card.Title>;
      } else if (messageType == 'TRANSACTION_RESERVED_BUYER_MESSAGE') {
        return <Card.Title>Оплачено</Card.Title>;
      }
    };

    return (
      <Card className="shippingMessage">
        <Card.Body>
          {renderShipping()}
          <Card.Text>{this.state.msg.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
