const CustomStatus = {
  DIALOG: 'Диалог',
  OFFER_MADE: 'Запрос отправлен',
  REJECTED_OFFER: 'Запрос отклонён',
  OFFER_ACCEPTED: 'Запрос принят',
  OUTDATED_OFFER: 'Запрос просрочен',
  TRANSACTION_RESERVED: 'Оплачено',
  ITEM_MARKED_AS_SHIPPED: 'Посылка отправлена',
  OUTDATED_SHIPPING: 'Посылка не доставлена',
  ITEM_MARKED_AS_RECEIVED: 'Получено',
  UNDEFINED: 'Нераспределенные',
  ITEM_CHARGEBACK: 'Возврат средств',
  TRANSACTION_EXPIRED: 'Платеж не прошел',
};

export default function getCustomStatus(conversation) {
  const messages = conversation.Messages;
  const lastMsg = messages[messages.length - 1];

  if (
    // Запрос отправлен
    lastMsg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
    lastMsg.paymentAndShippingMessageType ===
      'BUYER_OFFER_MADE_BUYER_MESSAGE' &&
    lastMsg.active
  ) {
    return isTimePassed(lastMsg.receivedDate, 5)
      ? CustomStatus.OUTDATED_OFFER // 5. Запрос просрочен  !!!
      : CustomStatus.OFFER_MADE;
  }

  if (
    // 2. Запрос отклонён
    lastMsg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
    lastMsg.paymentAndShippingMessageType ===
      'SELLER_REJECTED_OFFER_BUYER_MESSAGE'
  ) {
    return CustomStatus.REJECTED_OFFER;
  }

  if (
    // 3. Запрос принят
    messages.find(
      (msg) =>
        msg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
        msg.paymentAndShippingMessageType === 'OFFER_ACCEPTED_BUYER_MESSAGE' &&
        msg.active
    )
  ) {
    return CustomStatus.OFFER_ACCEPTED;
  }

  if (
    // 4. Оплачено
    messages.find(
      (msg) =>
        msg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
        msg.paymentAndShippingMessageType ===
          'TRANSACTION_RESERVED_BUYER_MESSAGE' &&
        msg.active
    )
  ) {
    return isTimePassed(lastMsg.receivedDate, 7)
      ? CustomStatus.OUTDATED_SHIPPING // 7.Посылка не доставлена !!!
      : CustomStatus.TRANSACTION_RESERVED;
  }

  if (
    // 6. Посылка отправлена
    messages.find(
      (msg) =>
        msg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
        msg.paymentAndShippingMessageType ===
          'ITEM_MARKED_AS_SHIPPED_TRACKING_AVAILABLE_BUYER_MESSAGE' &&
        msg.active
    )
  ) {
    return CustomStatus.ITEM_MARKED_AS_SHIPPED;
  }

  if (
    // 8. Получено!
    messages.find(
      (msg) =>
        msg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
        msg.paymentAndShippingMessageType ===
          'ITEM_MARKED_AS_RECEIVED_BUYER_MESSAGE'
    )
  ) {
    return CustomStatus.ITEM_MARKED_AS_RECEIVED;
  }

  if (
    // 9. Возврат средств!
    messages.find(
      (msg) =>
        msg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
        msg.paymentAndShippingMessageType ===
          'CHARGEBACK_INITIATED_MESSAGE_BUYER_MESSAGE'
    )
  ) {
    return CustomStatus.ITEM_CHARGEBACK;
  }

  if (
    // 10. Платеж не прошел!
    messages.find(
      (msg) =>
        msg.type === 'PAYMENT_AND_SHIPPING_MESSAGE' &&
        msg.paymentAndShippingMessageType === 'TRANSACTION_EXPIRED_MESSAGE'
    )
  ) {
    return CustomStatus.TRANSACTION_EXPIRED;
  }

  if (
    // Диалог
    lastMsg.type === 'MESSAGE' &&
    lastMsg.boundness === 'INBOUND'
  ) {
    return CustomStatus.DIALOG;
  }

  return CustomStatus.UNDEFINED;
}

function isTimePassed(timeshtamp, days) {
  const receivedDate = new Date(timeshtamp);
  const now = new Date();
  const daysLag = Math.ceil(
    Math.abs(now.getTime() - receivedDate.getTime()) / (1000 * 3600 * 24)
  );
  return daysLag > days;
}
