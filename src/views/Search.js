import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Message from './ConversationFilters/Message';
import ShippingAndPaymentMessage from './ConversationFilters/ShippingAndPaymentMessage';
import ChatFooter from './ConversationFilters/ChatFooter';
import MessageSender from '../views/ConversationFilters/MessageSender';

import {
  apiService,
  client,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
  SUBSCRIBE_MESSAGES,
} from '../services/ApiService';

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
  const [idToSearch = '', setIdToSearch] = useState();
  const [sellerConversationsTable, setSellerConversationsTable] = useState([]);
  const [messages, setMessages] = useState([]);
  const [convChosen, setConvChosen] = useState(false);
  const [convChosenId, setConvChosenId] = useState(0);
  const [status, setStatus] = useState('');

  const operateConversations = (conversations) => {
    let arrayForSort = [...conversations];
    // console.log(arrayForSort[0]);
    if (arrayForSort.length > 1)
      arrayForSort.sort((conv1, conv2) => {
        const firstDate =
          conv1.Messages[conv1.Messages.length - 1].receivedDate;
        const secondDate =
          conv2.Messages[conv2.Messages.length - 1].receivedDate;
        if (firstDate > secondDate) return -1;
        else return 1;
      });
    setSellerConversationsTable([]);
    setSellerConversationsTable(arrayForSort);
    // console.log(sellerConversationsTable);
  };

  const handleSubmit = async (event) => {
    setIdToSearch(null);
    event.preventDefault();
    const sellerConversations = await apiService.getConversationsBySellerName(
      nameToSearch
    );
    if (sellerConversations) operateConversations(sellerConversations);
  };

  const handleSubscribe = async (data) => {
    // console.log(
    //   data.filter((conv) => {
    //     return nameToSearch == conv.sellerName;
    //   })
    // );
    console.log('handle subscribe');
    if (nameToSearch !== '') {
      console.log('handle subscribe name');
      const sellerConversations = await apiService.getConversationsBySellerName(
        nameToSearch
      );
      if (sellerConversations) operateConversations(sellerConversations);
    } else {
      console.log('handle subscribe id');
      const sellerConversation = await apiService.getConversationByAdId(
        idToSearch
      );
      if (sellerConversation) operateConversations(sellerConversation);
    }
  };

  const handleSubmitId = async (event) => {
    setNameToSearch('');
    event.preventDefault();
    const sellerConversation = await apiService.getConversationByAdId(
      idToSearch
    );
    if (sellerConversation) operateConversations(sellerConversation);
    // setSellerConversationsTable(sellerConversations);
  };

  const handleInputIdSearch = (event) => {
    setIdToSearch(event.target.value);
  };

  const handleInputNameSearch = (event) => {
    setNameToSearch(event.target.value);
  };

  const openConversation = async (convId, status) => {
    await apiService.markMessagesInConvViewed(convId);
    const messages = await apiService.getMessagesByConvId(convId);
    setConvChosen(false);
    setMessages(messages);
    setStatus(status);
    setConvChosenId(convId);
    setConvChosen(true);
  };

  const getUnreadMessages = async () => {
    const observer = client.subscribe({
      query: SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
    });
    observer.subscribe({
      next(data) {
        handleSubscribe(data);
      },
      error(err) {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    // getUnreadMessages();
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="dialog">
      <Row>
        <Col sm={3}>
          <Form className="formSearch" noValidate onSubmit={handleSubmit}>
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
          <Form noValidate onSubmit={handleSubmitId}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={idToSearch}
                onChange={handleInputIdSearch}
                placeholder="Введите adId диалога"
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
              <div className="messageBoxConv">
                {sellerConversationsTable.map((conv) => (
                  <div
                    className={
                      'message' +
                      (conv.Messages.filter((msg) => msg.viewed == false)
                        .length > 0
                        ? '-unread'
                        : '') +
                      (conv.id == convChosenId ? '-active' : '')
                    }
                    key={conv.id}
                    onClick={() => openConversation(conv.id, conv.customStatus)}
                  >
                    <div className="date">
                      {conv.Messages[conv.Messages.length - 1].receivedDate}
                    </div>
                    <div className="from">
                      {conv.sellerName +
                        (conv.adStatus == 'DELETED' ? ' (Удалено)' : '')}
                    </div>
                    <div className="subject">{conv.adTitle}</div>
                  </div>
                ))}
              </div>
              <div className="messageReader">
                <div className="messageBox">
                  {convChosen
                    ? messages.map((msg) =>
                        msg.type == 'PAYMENT_AND_SHIPPING_MESSAGE' ? (
                          <ShippingAndPaymentMessage message={msg} />
                        ) : (
                          <Message message={msg} />
                        )
                      )
                    : ''}
                </div>
                {convChosen ? <MessageSender convId={convChosenId} /> : ''}
                {convChosen ? (
                  <ChatFooter type={status} convChosenId={convChosenId} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Search;
