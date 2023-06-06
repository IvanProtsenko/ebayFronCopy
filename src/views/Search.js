import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

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

const Search = () => {
    const [nameToSearch = '', setNameToSearch] = useState();
    const [sellerConversationsTable, setSellerConversationsTable] = useState([]);
    const [messages, setMessages] = useState([]);
    const [convChosen, setConvChosen] = useState(false);
    const [convChosenId, setConvChosenId] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('done')
        const sellerConversations = await apiService.getConversationsBySellerName(nameToSearch)
        setSellerConversationsTable(sellerConversations)
    };

    const handleInputNameSearch = (event) => {
        setNameToSearch(event.target.value);
    };

    const openConversation = async (convId) => {
        await apiService.markMessagesInConvViewed(convId)
        const messages = await apiService.getMessagesByConvId(convId)
        setMessages(messages)
        setConvChosen(true)
        setConvChosenId(convId)
      }

    const getUnreadMessages = async () => {
        const conversations = await apiService.getConversationsWithMessages()
        // calculateUnreadMessages(conversations);
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
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                value={nameToSearch}
                                onChange={handleInputNameSearch}
                                placeholder="Введите имя продавца"
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button className="modalButton" variant="primary" type="submit">
                                Найти
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col sm={9}>
                    <div className="app">
                        <div className="mailReader">
                            <div className="messageBox">
                                {sellerConversationsTable.map((conv) => (
                                <div
                                    className={"message"+(conv.Messages.filter(msg => msg.viewed == false).length > 0 ? '-unread' : '')}
                                    key={conv.id}
                                    onClick={() => openConversation(conv.id)}
                                >
                                    <div className="date">{conv.id}</div>
                                    <div className="from">{conv.sellerName}</div>
                                    <div className="subject">{conv.adTitle}</div>
                                </div>
                                ))}
                            </div>
                            <div className="messageReader">
                                <div className="messageBox">
                                    {convChosen ? (
                                        messages.map((msg) => (
                                        <div
                                            className={"message"+(msg.boundness == "OUTBOUND" ? '-right' : '')}
                                            key={msg.messageId}
                                        >
                                            <div className="date">{msg.receivedDate}</div>
                                            <div className="from">{msg.title}</div>
                                            <div className="subject">{msg.type == 'MESSAGE'} ? {msg.textShort} : {msg.text})</div>
                                        </div>
                                        ))
                                    ) : ''}
                                </div>
                                {convChosen ? 
                                    <div>
                                        <Button className="modalButtonConv" variant="primary" type="submit">
                                        <a target='_blank' className="conversationLink"
                                        href={`https://www.kleinanzeigen.de/m-nachrichten.html?conversationId=${convChosenId}`}>Перейти в диалог</a>
                                        </Button>
                                        <Button className="modalButtonConv" onClick={() => this.markAsProcessed(convChosenId)} variant="primary" type="submit">
                                        Пометить обработанным
                                        </Button>
                                    </div>
                                : ''}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Search;