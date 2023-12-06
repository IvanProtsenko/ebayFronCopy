import React, { useState, useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';
import {
  apiService,
  client,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
} from '../../services/ApiService';

// DIALOG = 'Диалог',
// OFFER_MADE = 'Запрос отправлен',
// REJECTED_OFFER = 'Запрос отклонён',
// OFFER_ACCEPTED = 'Запрос принят',
// OUTDATED_OFFER = 'Запрос просрочен',
// TRANSACTION_RESERVED = 'Оплачено',
// ITEM_MARKED_AS_SHIPPED = 'Посылка отправлена',
// OUTDATED_SHIPPING = 'Посылка не доставлена',
// ITEM_MARKED_AS_RECEIVED = 'Получено'

const NavsLeft = () => {
  const [dialog, setDialog] = useState(0);
  const [waitingAnswer, setWaitingAnswer] = useState(0);
  const [dialogProcessed, setDialogProcessed] = useState(0);
  const [offerMade, setOfferMade] = useState(0);
  const [rejectedOffer, setRejectedOffer] = useState(0);
  const [offerAccepted, setOfferAccepted] = useState(0);
  const [outdatedOffer, setOutdatedOffer] = useState(0);
  const [transactionReserved, setTransactionReserved] = useState(0);
  const [itemShipped, setItemShipped] = useState(0);
  const [outdatedShipping, setOutdatedShipping] = useState(0);
  const [itemDelivered, setItemDelivered] = useState(0);
  const [itemReceived, setItemReceived] = useState(0);
  const [chargedBack, setChargedBack] = useState(0);
  const [transactionExpired, setTransactionExpired] = useState(0);
  const [wrongValidation, setWrongValidation] = useState(0);
  const [delayed, setDelayed] = useState(0);
  const [blacklist, setBlacklist] = useState(0);

  const [dialogUnread, setDialogUnread] = useState(0);
  const [waitingAnswerUnread, setWaitingAnswerUnread] = useState(0);
  const [dialogProcessedUnread, setDialogProcessedUnread] = useState(0);
  const [offerMadeUnread, setOfferMadeUnread] = useState(0);
  const [rejectedOfferUnread, setRejectedOfferUnread] = useState(0);
  const [offerAcceptedUnread, setOfferAcceptedUnread] = useState(0);
  const [outdatedOfferUnread, setOutdatedOfferUnread] = useState(0);
  const [transactionReservedUnread, setTransactionReservedUnread] = useState(0);
  const [itemShippedUnread, setItemShippedUnread] = useState(0);
  const [outdatedShippingUnread, setOutdatedShippingUnread] = useState(0);
  const [itemDeliveredUnread, setItemDeliveredUnread] = useState(0);
  const [itemReceivedUnread, setItemReceivedUnread] = useState(0);
  const [chargedBackUnread, setChargedBackUnread] = useState(0);
  const [transactionExpiredUnread, setTransactionExpiredUnread] = useState(0);
  const [wrongValidationUnread, setWrongValidationUnread] = useState(0);
  const [delayedUnread, setDelayedUnread] = useState(0);
  const [blacklistUnread, setBlacklistUnread] = useState(0);

  let dialogUnreadFunc = 0;
  let waitingAnswerUnreadFunc = 0;
  let dialogProcessedUnreadFunc = 0;
  let offerMadeUnreadFunc = 0;
  let rejectedOfferUnreadFunc = 0;
  let offerAcceptedUnreadFunc = 0;
  let transactionReservedUnreadFunc = 0;
  let itemShippedUnreadFunc = 0;
  let outdatedOfferUnreadFunc = 0;
  let outdatedShippingUnreadFunc = 0;
  let itemDeliveredUnreadFunc = 0;
  let itemReceivedUnreadFunc = 0;
  let chargedBackUnreadFunc = 0;
  let transactionExpiredUnreadFunc = 0;
  let wrongValidationUnreadFunc = 0;
  let delayedUnreadFunc = 0;
  let blacklistUnreadFunc = 0;

  let dialogToUpdate = [];
  let waitingAnswerToUpdate = [];
  let dialogProcessedToUpdate = [];
  let offerMadeToUpdate = [];
  let rejectedOfferToUpdate = [];
  let offerAcceptedToUpdate = [];
  let transactionReservedToUpdate = [];
  let itemShippedToUpdate = [];
  let outdatedOfferToUpdate = [];
  let outdatedShippingUpdate = [];
  let itemDeliveredToUpdate = [];
  let itemReceivedToUpdate = [];
  let chargedBackToUpdate = [];
  let transactionExpiredToUpdate = [];
  let wrongValidationToUpdate = [];
  let delayedToUpdate = [];
  let blacklistToUpdate = [];

  const markAllStatuses = () => {
    setDialog(dialogToUpdate.length);
    setWaitingAnswer(waitingAnswerToUpdate.length);
    setDialogProcessed(dialogProcessedToUpdate.length);
    setOfferMade(offerMadeToUpdate.length);
    setRejectedOffer(rejectedOfferToUpdate.length);
    setOfferAccepted(offerAcceptedToUpdate.length);
    setTransactionReserved(transactionReservedToUpdate.length);
    setItemShipped(itemShippedToUpdate.length);
    setOutdatedOffer(outdatedOfferToUpdate.length);
    setOutdatedShipping(outdatedShippingUpdate.length);
    setItemDelivered(itemDeliveredToUpdate.length);
    setItemReceived(itemReceivedToUpdate.length);
    setChargedBack(chargedBackToUpdate.length);
    setTransactionExpired(transactionExpiredToUpdate.length);
    setWrongValidation(wrongValidationToUpdate.length);
    setDelayed(delayedToUpdate.length);
    setBlacklist(blacklistToUpdate.length);
  };

  const markAllStatusesUnread = () => {
    setDialogUnread(dialogUnreadFunc);
    setWaitingAnswerUnread(waitingAnswerUnreadFunc);
    setDialogProcessedUnread(dialogProcessedUnreadFunc);
    setOfferMadeUnread(offerMadeUnreadFunc);
    setRejectedOfferUnread(rejectedOfferUnreadFunc);
    setOfferAcceptedUnread(offerAcceptedUnreadFunc);
    setTransactionReservedUnread(transactionReservedUnreadFunc);
    setItemShippedUnread(itemShippedUnreadFunc);
    setOutdatedOfferUnread(outdatedOfferUnreadFunc);
    setOutdatedShippingUnread(outdatedShippingUnreadFunc);
    setItemDeliveredUnread(itemDeliveredUnreadFunc);
    setItemReceivedUnread(itemReceivedUnreadFunc);
    setChargedBackUnread(chargedBackUnreadFunc);
    setTransactionExpiredUnread(transactionExpiredUnreadFunc);
    setWrongValidationUnread(wrongValidationUnreadFunc);
    setDelayedUnread(delayedUnreadFunc);
    setBlacklistUnread(blacklistUnreadFunc);
  };

  const setUnread = async (status) => {
    if (status == 'Диалог') {
      dialogUnreadFunc++;
    } else if (status == 'Ждем ответа продавца') {
      waitingAnswerUnreadFunc++;
    } else if (status == 'Диалог (обработано)') {
      dialogProcessedUnreadFunc++;
    } else if (status == 'Запрос отправлен') {
      offerMadeUnreadFunc++;
    } else if (status == 'Запрос отклонён') {
      rejectedOfferUnreadFunc++;
    } else if (status == 'Запрос принят') {
      offerAcceptedUnreadFunc++;
    } else if (status == 'Оплачено') {
      transactionReservedUnreadFunc++;
    } else if (status == 'Посылка отправлена') {
      itemShippedUnreadFunc++;
    } else if (status == 'Запрос просрочен') {
      outdatedOfferUnreadFunc++;
    } else if (status == 'Посылка не доставлена') {
      outdatedShippingUnreadFunc++;
    } else if (status == 'Подтвердите получение') {
      itemDeliveredUnreadFunc++;
    } else if (status == 'Посылка получена') {
      itemReceivedUnreadFunc++;
    } else if (status == 'Возврат средств') {
      chargedBackUnreadFunc++;
    } else if (status == 'Платеж не прошел') {
      transactionExpiredUnreadFunc++;
    } else if (status == 'Проблема') {
      delayedUnreadFunc++;
    } else if (status == 'Неправильная валидация') {
      wrongValidationUnreadFunc++;
    } else if (status == 'Черный список') {
      blacklistUnreadFunc++;
    }
  };

  const clearAll = () => {
    dialogToUpdate = [];
    waitingAnswerToUpdate = [];
    dialogProcessedToUpdate = [];
    offerMadeToUpdate = [];
    rejectedOfferToUpdate = [];
    offerAcceptedToUpdate = [];
    transactionReservedToUpdate = [];
    itemShippedToUpdate = [];
    outdatedOfferToUpdate = [];
    outdatedShippingUpdate = [];
    itemDeliveredToUpdate = [];
    itemReceivedToUpdate = [];
    chargedBackToUpdate = [];
    transactionExpiredToUpdate = [];
    wrongValidationToUpdate = [];
    delayedToUpdate = [];
    blacklistToUpdate = [];
    markAllStatuses();

    dialogUnreadFunc = 0;
    waitingAnswerUnreadFunc = 0;
    dialogProcessedUnreadFunc = 0;
    offerMadeUnreadFunc = 0;
    rejectedOfferUnreadFunc = 0;
    offerAcceptedUnreadFunc = 0;
    transactionReservedUnreadFunc = 0;
    itemShippedUnreadFunc = 0;
    outdatedOfferUnreadFunc = 0;
    outdatedShippingUnreadFunc = 0;
    itemDeliveredUnreadFunc = 0;
    itemReceivedUnreadFunc = 0;
    chargedBackUnreadFunc = 0;
    transactionExpiredUnreadFunc = 0;
    wrongValidationUnreadFunc = 0;
    delayedUnreadFunc = 0;
    blacklistUnreadFunc = 0;
    markAllStatusesUnread();
  };

  const calculateUnreadMessages = async (conversations) => {
    conversations.forEach(async (conv) => {
      let status = conv.customStatus;
      if (status == 'Диалог') {
        dialogToUpdate.push(conv.id);
      } else if (status == 'Ждем ответа продавца') {
        waitingAnswerToUpdate.push(conv.id);
      } else if (status == 'Диалог (обработано)') {
        dialogProcessedToUpdate.push(conv.id);
      } else if (status == 'Запрос отправлен') {
        offerMadeToUpdate.push(conv.id);
      } else if (status == 'Запрос отклонён') {
        rejectedOfferToUpdate.push(conv.id);
      } else if (status == 'Запрос принят') {
        offerAcceptedToUpdate.push(conv.id);
      } else if (status == 'Оплачено') {
        transactionReservedToUpdate.push(conv.id);
      } else if (status == 'Посылка отправлена') {
        itemShippedToUpdate.push(conv.id);
      } else if (status == 'Запрос просрочен') {
        outdatedOfferToUpdate.push(conv.id);
      } else if (status == 'Посылка не доставлена') {
        outdatedShippingUpdate.push(conv.id);
      } else if (status == 'Подтвердите получение') {
        itemDeliveredToUpdate.push(conv.id);
      } else if (status == 'Посылка получена') {
        itemReceivedToUpdate.push(conv.id);
      } else if (status == 'Возврат средств') {
        chargedBackToUpdate.push(conv.id);
      } else if (status == 'Платеж не прошел') {
        transactionExpiredToUpdate.push(conv.id);
      } else if (status == 'Проблема') {
        delayedToUpdate.push(conv.id);
      } else if (status == 'Неправильная валидация') {
        wrongValidationToUpdate.push(conv.id);
      } else if (status == 'Черный список') {
        blacklistToUpdate.push(conv.id);
      }
      if (conv.customUnread) {
        await setUnread(status);
      }
    });
    markAllStatuses();
    markAllStatusesUnread();
  };

  const getUnreadMessages = async () => {
    const conversations = await apiService.getConversationsWithMessages();
    calculateUnreadMessages(conversations);
    const observer = client.subscribe({
      query: SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
    });
    observer.subscribe({
      next(data) {
        clearAll();
        calculateUnreadMessages(data.data.Conversations);
      },
      error(err) {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    getUnreadMessages();
  }, []);

  return (
    <Nav translate="no" variant="pills" className="flex-column">
      <Nav.Item>
        <Nav.Link href="dialog">
          Диалог ({dialog} / {dialogUnread})
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="waiting_answer">
          Ждем ответа продавца ({waitingAnswer} / {waitingAnswerUnread})
        </Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link href="dialogProcessed">
          Диалог (обработано) ({dialogProcessed} / {dialogProcessedUnread})
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="offer_made">
          Запрос отправлен ({offerMade} / {offerMadeUnread})
        </Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link href="rejected_offer">
          Запрос отклонён ({rejectedOffer} / {rejectedOfferUnread})
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="offer_accepted">
          Запрос принят ({offerAccepted} / {offerAcceptedUnread})
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="outdated_offer">
          Запрос просрочен ({outdatedOffer} / {outdatedOfferUnread})
        </Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link href="transaction_reserved">
          Оплачено ({transactionReserved} / {transactionReservedUnread})
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="item_marked_as_shipped">
          Посылка отправлена ({itemShipped} / {itemShippedUnread})
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="outdated_shipping">
          Посылка не доставлена ({outdatedShipping} / {outdatedShippingUnread})
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="item_delivered">
          Подтвердите получение ({itemDelivered} / {itemDeliveredUnread})
        </Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link href="item_marked_as_received">
          Посылка получена ({itemReceived} / {itemReceivedUnread})
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="charged_back">
          Возврат средств ({chargedBack} / {chargedBackUnread})
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="transaction_expired">
          Платеж не прошел ({transactionExpired} / {transactionExpiredUnread})
        </Nav.Link>
      </Nav.Item>*/}
      <Nav.Item>
        <Nav.Link href="wrongValidation">
          Неправильная валидация ({wrongValidation} / {wrongValidationUnread})
        </Nav.Link>
      </Nav.Item> 
      <Nav.Item>
        <Nav.Link href="later">
          Проблема ({delayed} / {delayedUnread})
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="blacklist">
          Черный список ({blacklist} / {blacklistUnread})
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavsLeft;
