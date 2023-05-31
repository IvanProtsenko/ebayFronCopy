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
import { apiService, client, SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES } from '../services/ApiService';

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

    const addUnreadToStatus = (status) => {
        if(status == 'Диалог') {
            setDialogUnread(dialogUnread+1)
        } else if(status == 'Диалог (обработано)') {
            setDialogProcessedUnread(dialogProcessedUnread+1)
        } else if(status == 'Запрос отправлен') {
            setOfferMade(offerMade+1)
        } else if(status == 'Запрос отклонён') {
            setRejectedOffer(rejectedOffer+1)
        } else if(status == 'Запрос принят') {
            setOfferAccepted(offerAccepted+1)
        } else if(status == 'Оплачено') {
            setTransactionReserved(transactionReserved+1)
        } else if(status == 'Посылка отправлена') {
            setItemShipped(itemShipped+1)
        } else if(status == 'Запрос просрочен') {
            setOutdatedOffer(outdatedOffer+1)
        } else if(status == 'Посылка не доставлена') {
            setOutdatedShipping(outdatedShipping+1)
        } else if(status == 'Получено') {
            setItemReceived(itemReceived+1)
        }
    }

    const calculateUnreadMessages = (conversations) => {
        conversations.forEach(conv => {
            conv.Messages.every(msg => {
                console.log(msg)
                if(!msg.viewed) {
                    addUnreadToStatus(conv.customStatus)
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
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Conversations;