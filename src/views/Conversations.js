import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {
  apiService,
  client,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
} from '../services/ApiService';
import Chat from './ConversationFilters/Chat';

// DIALOG = 'Диалог',
// OFFER_MADE = 'Запрос отправлен',
// REJECTED_OFFER = 'Запрос отклонён',
// OFFER_ACCEPTED = 'Запрос принят',
// OUTDATED_OFFER = 'Запрос просрочен',
// TRANSACTION_RESERVED = 'Оплачено',
// ITEM_MARKED_AS_SHIPPED = 'Посылка отправлена',
// OUTDATED_SHIPPING = 'Посылка не доставлена',
// ITEM_MARKED_AS_RECEIVED = 'Получено'

const Conversations = () => {
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
  const [undecided, setUndecided] = useState(0);
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
  const [undecidedUnread, setUndecidedUnread] = useState(0);
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
  let undecidedUnreadFunc = 0;
  let delayedUnreadFunc = 0;
  let blacklistUnreadFunc = 0;

  const dialogToUpdate = [];
  const waitingAnswerToUpdate = [];
  const dialogProcessedToUpdate = [];
  const offerMadeToUpdate = [];
  const rejectedOfferToUpdate = [];
  const offerAcceptedToUpdate = [];
  const transactionReservedToUpdate = [];
  const itemShippedToUpdate = [];
  const outdatedOfferToUpdate = [];
  const outdatedShippingUpdate = [];
  const itemDeliveredToUpdate = [];
  const itemReceivedToUpdate = [];
  const chargedBackToUpdate = [];
  const transactionExpiredToUpdate = [];
  const undecidedToUpdate = [];
  const delayedToUpdate = [];
  const blacklistToUpdate = [];

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
    setUndecided(undecidedToUpdate.length);
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
    setUndecidedUnread(undecidedUnreadFunc);
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
    } else if (status == 'Получено') {
      itemReceivedUnreadFunc++;
    } else if (status == 'Возврат средств') {
      chargedBackUnreadFunc++;
    } else if (status == 'Платеж не прошел') {
      transactionExpiredUnreadFunc++;
    } else if (status == 'Нераспределенные') {
      undecidedUnreadFunc++;
    } else if (status == 'Отложенные') {
      delayedUnreadFunc++;
    } else if (status == 'Черный список') {
      blacklistUnreadFunc++;
    }
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
      } else if (status == 'Получено') {
        itemReceivedToUpdate.push(conv.id);
      } else if (status == 'Возврат средств') {
        chargedBackToUpdate.push(conv.id);
      } else if (status == 'Платеж не прошел') {
        transactionExpiredToUpdate.push(conv.id);
      } else if (status == 'Нераспределенные') {
        undecidedToUpdate.push(conv.id);
      } else if (status == 'Отложенные') {
        delayedToUpdate.push(conv.id);
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
    // <Tab.Container id="left-tabs-example" defaultActiveKey="dialog">
    <Row>
      <Col sm={3}>
        <Nav translate="no" variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="dialog">
              Диалог ({dialog} / {dialogUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="waiting_answer">
              Ждем ответа продавца ({waitingAnswer} / {waitingAnswerUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dialogProcessed">
              Диалог (обработано) ({dialogProcessed} / {dialogProcessedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="offer_made">
              Запрос отправлен ({offerMade} / {offerMadeUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="rejected_offer">
              Запрос отклонён ({rejectedOffer} / {rejectedOfferUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="offer_accepted">
              Запрос принят ({offerAccepted} / {offerAcceptedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="outdated_offer">
              Запрос просрочен ({outdatedOffer} / {outdatedOfferUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="transaction_reserved">
              Оплачено ({transactionReserved} / {transactionReservedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="item_marked_as_shipped">
              Посылка отправлена ({itemShipped} / {itemShippedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="outdated_shipping">
              Посылка не доставлена ({outdatedShipping} /{' '}
              {outdatedShippingUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="item_delivered">
              Подтвердите получение ({itemDelivered} / {itemDeliveredUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="item_marked_as_received">
              Получено ({itemReceived} / {itemReceivedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="charged_back">
              Возврат средств ({chargedBack} / {chargedBackUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="transaction_expired">
              Платеж не прошел ({transactionExpired} /{' '}
              {transactionExpiredUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="undecided">
              Нераспределенные ({undecided} / {undecidedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="later">
              Отложенные ({delayed} / {delayedUnread})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="blacklist" eventKey="blacklist">
              Черный список ({blacklist} / {blacklistUnread})
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default Conversations;
