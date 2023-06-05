import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import Dialog from './ConversationFilters/Dialog';
import DialogProcessed from './ConversationFilters/DialogProcessed';
import ItemReceived from './ConversationFilters/ItemReceived'
import ItemShipped from './ConversationFilters/ItemShipped';
import OfferAccepted from './ConversationFilters/OfferAccepted';
import OfferMade from './ConversationFilters/OfferMade';
import OutdatedOffer from './ConversationFilters/OutdatedOffer';
import OutdatedShipping from './ConversationFilters/OutdatedShipping';
import RejectedOffer from './ConversationFilters/RejectedOffer';
import TransactionReserved from './ConversationFilters/TransactionReserved';
import Undecided from './ConversationFilters/Undecided';
import { apiService, client, SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES } from '../services/ApiService';
import getCustomStatus from '../services/utils/getCustomStatus';

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
    const [dialogUnread = 0, setDialogUnread] = useState();
    const [dialogProcessedUnread = 0, setDialogProcessedUnread] = useState();
    const [offerMade = 0, setOfferMade] = useState();
    const [rejectedOffer = 0, setRejectedOffer] = useState();
    const [offerAccepted = 0, setOfferAccepted] = useState();
    const [outdatedOffer = 0, setOutdatedOffer] = useState();
    const [transactionReserved = 0, setTransactionReserved] = useState();
    const [itemShipped = 0, setItemShipped] = useState();
    const [outdatedShipping = 0, setOutdatedShipping] = useState();
    const [itemReceived = 0, setItemReceived] = useState();
    const [undecided = 0, setUndecided] = useState();
    let dialogUnreadFunc = 0
    let dialogProcessedUnreadFunc = 0
    let offerMadeFunc = 0
    let rejectedOfferFunc = 0
    let offerAcceptedFunc = 0
    let outdatedOfferFunc = 0
    let transactionReservedFunc = 0
    let itemShippedFunc = 0
    let outdatedShippingFunc = 0
    let itemReceivedFunc = 0
    let undecidedFunc = 0

    const addUnreadToStatus = (status) => {
        if(status == 'Диалог') {
            dialogUnreadFunc++
        } else if(status == 'Диалог (обработано)') {
            dialogProcessedUnreadFunc++
        } else if(status == 'Запрос отправлен') {
            offerMadeFunc++
        } else if(status == 'Запрос отклонён') {
            rejectedOfferFunc++
        } else if(status == 'Запрос принят') {
            offerAcceptedFunc++
        } else if(status == 'Оплачено') {
            transactionReservedFunc++
        } else if(status == 'Посылка отправлена') {
            itemShippedFunc++
        } else if(status == 'Запрос просрочен') {
            outdatedOfferFunc++
        } else if(status == 'Посылка не доставлена') {
            outdatedShippingFunc++
        } else if(status == 'Получено') {
            itemReceivedFunc++
        } else if(status == 'Нераспределенные') {
            undecidedFunc++
        }
        setDialogUnread(dialogUnreadFunc)
        setDialogProcessedUnread(dialogProcessedUnreadFunc)
        setOfferMade(offerMadeFunc)
        setRejectedOffer(rejectedOfferFunc)
        setOfferAccepted(offerAcceptedFunc)
        setTransactionReserved(transactionReservedFunc)
        setItemShipped(itemShippedFunc)
        setOutdatedOffer(outdatedOfferFunc)
        setOutdatedShipping(outdatedShippingFunc)
        setItemReceived(itemReceivedFunc)
        setUndecided(undecidedFunc)
    }

    const calculateUnreadMessages = (conversations) => {
        conversations.forEach(async conv => {
            const status = getCustomStatus(conv)
            // if(!conv.customStatus) {
            //     console.log(status)
                await apiService.updateCustomStatus(conv.id, status)
            // }
            conv.Messages.every(msg => {
                if(!msg.viewed) {
                    addUnreadToStatus(status)
                    return false
                }
                return true
            })
        });
    }

    const getUnreadMessages = async () => {
        const conversations = await apiService.getConversationsWithMessages()
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
    }

    useEffect(() => {
        getUnreadMessages()
    }, []);

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="dialog">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="dialog">Диалог ({dialogUnread})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="dialogProcessed">Диалог (обработано) ({dialogProcessedUnread})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="offer_made">Запрос отправлен ({offerMade})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rejected_offer">Запрос отклонён ({rejectedOffer})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="offer_accepted">Запрос принят ({offerAccepted})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="outdated_offer">Запрос просрочен ({outdatedOffer})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="transaction_reserved">Оплачено ({transactionReserved})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="item_marked_as_shipped">Посылка отправлена ({itemShipped})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="outdated_shipping">Посылка не доставлена ({outdatedShipping})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="item_marked_as_received">Получено ({itemReceived})</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="undecided">Нераспределенные ({undecided})</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="dialog">
                            <Dialog />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dialogProcessed">
                            <DialogProcessed />
                        </Tab.Pane>
                        <Tab.Pane eventKey="offer_made">
                            <OfferMade />
                        </Tab.Pane>
                        <Tab.Pane eventKey="rejected_offer">
                            <RejectedOffer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="offer_accepted">
                            <OfferAccepted />
                        </Tab.Pane>
                        <Tab.Pane eventKey="outdated_offer">
                            <OutdatedOffer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="transaction_reserved">
                            <TransactionReserved />
                        </Tab.Pane>
                        <Tab.Pane eventKey="item_marked_as_shipped">
                            <ItemShipped />
                        </Tab.Pane>
                        <Tab.Pane eventKey="outdated_shipping">
                            <OutdatedShipping />
                        </Tab.Pane>
                        <Tab.Pane eventKey="item_marked_as_received">
                            <ItemReceived />
                        </Tab.Pane>
                        <Tab.Pane eventKey="undecided">
                            <Undecided />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Conversations;