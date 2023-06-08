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
import getCustomStatus from '../services/utils/getCustomStatus';
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
  const [dialogProcessed, setDialogProcessed] = useState(0);
  const [offerMade, setOfferMade] = useState(0);
  const [rejectedOffer, setRejectedOffer] = useState(0);
  const [offerAccepted, setOfferAccepted] = useState(0);
  const [outdatedOffer, setOutdatedOffer] = useState(0);
  const [transactionReserved, setTransactionReserved] = useState(0);
  const [itemShipped, setItemShipped] = useState(0);
  const [outdatedShipping, setOutdatedShipping] = useState(0);
  const [itemReceived, setItemReceived] = useState(0);
  const [chargedBack, setChargedBack] = useState(0);
  const [transactionExpired, setTransactionExpired] = useState(0);
  const [undecided, setUndecided] = useState(0);
  const [delayed, setDelayed] = useState(0);

  const [dialogUnread, setDialogUnread] = useState(0);
  const [dialogProcessedUnread, setDialogProcessedUnread] = useState(0);
  const [offerMadeUnread, setOfferMadeUnread] = useState(0);
  const [rejectedOfferUnread, setRejectedOfferUnread] = useState(0);
  const [offerAcceptedUnread, setOfferAcceptedUnread] = useState(0);
  const [outdatedOfferUnread, setOutdatedOfferUnread] = useState(0);
  const [transactionReservedUnread, setTransactionReservedUnread] = useState(0);
  const [itemShippedUnread, setItemShippedUnread] = useState(0);
  const [outdatedShippingUnread, setOutdatedShippingUnread] = useState(0);
  const [itemReceivedUnread, setItemReceivedUnread] = useState(0);
  const [chargedBackUnread, setChargedBackUnread] = useState(0);
  const [transactionExpiredUnread, setTransactionExpiredUnread] = useState(0);
  const [undecidedUnread, setUndecidedUnread] = useState(0);
  const [delayedUnread, setDelayedUnread] = useState(0);

  let dialogUnreadFunc = 0;
  let dialogProcessedUnreadFunc = 0;
  let offerMadeUnreadFunc = 0;
  let rejectedOfferUnreadFunc = 0;
  let offerAcceptedUnreadFunc = 0;
  let transactionReservedUnreadFunc = 0;
  let itemShippedUnreadFunc = 0;
  let outdatedOfferUnreadFunc = 0;
  let outdatedShippingUnreadFunc = 0;
  let itemReceivedUnreadFunc = 0;
  let chargedBackUnreadFunc = 0;
  let transactionExpiredUnreadFunc = 0;
  let undecidedUnreadFunc = 0;
  let delayedUnreadFunc = 0;

  const dialogToUpdate = [];
  const dialogProcessedToUpdate = [];
  const offerMadeToUpdate = [];
  const rejectedOfferToUpdate = [];
  const offerAcceptedToUpdate = [];
  const transactionReservedToUpdate = [];
  const itemShippedToUpdate = [];
  const outdatedOfferToUpdate = [];
  const outdatedShippingUpdate = [];
  const itemReceivedToUpdate = [];
  const chargedBackToUpdate = [];
  const transactionExpiredToUpdate = [];
  const undecidedToUpdate = [];
  const delayedToUpdate = [];

  const markAllStatuses = () => {
    setDialog(dialogToUpdate.length);
    setDialogProcessed(dialogProcessedToUpdate.length);
    setOfferMade(offerMadeToUpdate.length);
    setRejectedOffer(rejectedOfferToUpdate.length);
    setOfferAccepted(offerAcceptedToUpdate.length);
    setTransactionReserved(transactionReservedToUpdate.length);
    setItemShipped(itemShippedToUpdate.length);
    setOutdatedOffer(outdatedOfferToUpdate.length);
    setOutdatedShipping(outdatedShippingUpdate.length);
    setItemReceived(itemReceivedToUpdate.length);
    setChargedBack(chargedBackToUpdate.length);
    setTransactionExpired(transactionExpiredToUpdate.length);
    setUndecided(undecidedToUpdate.length);
    setDelayed(delayedToUpdate.length);
  };

  const markAllStatusesUnread = () => {
    setDialogUnread(dialogUnreadFunc);
    setDialogProcessedUnread(dialogProcessedUnreadFunc);
    setOfferMadeUnread(offerMadeUnreadFunc);
    setRejectedOfferUnread(rejectedOfferUnreadFunc);
    setOfferAcceptedUnread(offerAcceptedUnreadFunc);
    setTransactionReservedUnread(transactionReservedUnreadFunc);
    setItemShippedUnread(itemShippedUnreadFunc);
    setOutdatedOfferUnread(outdatedOfferUnreadFunc);
    setOutdatedShippingUnread(outdatedShippingUnreadFunc);
    setItemReceivedUnread(itemReceivedUnreadFunc);
    setChargedBackUnread(chargedBackUnreadFunc);
    setTransactionExpiredUnread(transactionExpiredUnreadFunc);
    setUndecidedUnread(undecidedUnreadFunc);
    setDelayedUnread(delayedUnreadFunc);
  };

  const setUnread = async (status) => {
    if (status == 'Диалог') {
      dialogUnreadFunc++;
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
    }
  };

  const updateAllCustomStatuses = async () => {
    await apiService.updateCustomStatusMany(dialogToUpdate, 'Диалог');
    await apiService.updateCustomStatusMany(
      dialogProcessedToUpdate,
      'Диалог (обработано)'
    );
    await apiService.updateCustomStatusMany(
      offerMadeToUpdate,
      'Запрос отправлен'
    );
    await apiService.updateCustomStatusMany(
      rejectedOfferToUpdate,
      'Запрос отклонён'
    );
    await apiService.updateCustomStatusMany(
      offerAcceptedToUpdate,
      'Запрос принят'
    );
    await apiService.updateCustomStatusMany(
      transactionReservedToUpdate,
      'Оплачено'
    );
    await apiService.updateCustomStatusMany(
      itemShippedToUpdate,
      'Посылка отправлена'
    );
    await apiService.updateCustomStatusMany(
      outdatedOfferToUpdate,
      'Запрос просрочен'
    );
    await apiService.updateCustomStatusMany(
      outdatedShippingUpdate,
      'Посылка не доставлена'
    );
    await apiService.updateCustomStatusMany(itemReceivedToUpdate, 'Получено');
    await apiService.updateCustomStatusMany(
      transactionExpiredToUpdate,
      'Платеж не прошел'
    );
    await apiService.updateCustomStatusMany(
      chargedBackToUpdate,
      'Возврат средств'
    );
    await apiService.updateCustomStatusMany(
      undecidedToUpdate,
      'Нераспределенные'
    );
    await apiService.updateCustomStatusMany(delayedToUpdate, 'Отложенные');
  };

  const calculateUnreadMessages = async (conversations) => {
    conversations.forEach(async (conv) => {
      if (conv.Messages.length > 0) {
        const status = getCustomStatus(conv);
        if (status == 'Диалог') {
          dialogToUpdate.push(conv.id);
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
        }
        for (let i = 0; i < conv.Messages.length; i++) {
          if (!conv.Messages[i].viewed) {
            await setUnread(status);
            break;
          }
        }
      }
    });
    markAllStatuses();
    markAllStatusesUnread();
    await updateAllCustomStatuses();
  };

  const getUnreadMessages = async () => {
    const conversations = await apiService.getConversationsWithMessages();
    calculateUnreadMessages(conversations);
    // const observer = client.subscribe({
    //     query: SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
    // });
    // observer.subscribe({
    //     next(data) {
    //         calculateUnreadMessages(data.data.Conversations);
    //     },
    //     error(err) {
    //         console.log(err);
    //     },
    // });
  };

  useEffect(() => {
    getUnreadMessages();
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="dialog">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="dialog">
                Диалог ({dialog} / {dialogUnread})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dialogProcessed">
                Диалог (обработано) ({dialogProcessed} / {dialogProcessedUnread}
                )
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
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="dialog">
              <Chat status="Диалог" />
            </Tab.Pane>
            <Tab.Pane eventKey="dialogProcessed">
              <Chat status="Диалог (обработано)" />
            </Tab.Pane>
            <Tab.Pane eventKey="offer_made">
              <Chat status="Запрос отправлен" />
            </Tab.Pane>
            <Tab.Pane eventKey="rejected_offer">
              <Chat status="Запрос отклонён" />
            </Tab.Pane>
            <Tab.Pane eventKey="offer_accepted">
              <Chat status="Запрос принят" />
            </Tab.Pane>
            <Tab.Pane eventKey="outdated_offer">
              <Chat status="Запрос просрочен" />
            </Tab.Pane>
            <Tab.Pane eventKey="transaction_reserved">
              <Chat status="Оплачено" />
            </Tab.Pane>
            <Tab.Pane eventKey="item_marked_as_shipped">
              <Chat status="Посылка отправлена" />
            </Tab.Pane>
            <Tab.Pane eventKey="outdated_shipping">
              <Chat status="Посылка не доставлена" />
            </Tab.Pane>
            <Tab.Pane eventKey="item_marked_as_received">
              <Chat status="Получено" />
            </Tab.Pane>
            <Tab.Pane eventKey="charged_back">
              <Chat status="Возврат средств" />
            </Tab.Pane>
            <Tab.Pane eventKey="transaction_expired">
              <Chat status="Платеж не прошел" />
            </Tab.Pane>
            <Tab.Pane eventKey="undecided">
              <Chat status="Нераспределенные" />
            </Tab.Pane>
            <Tab.Pane eventKey="later">
              <Chat status="Отложенные" />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Conversations;
