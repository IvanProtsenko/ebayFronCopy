import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
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
import formatDate from '../services/utils/dateFormatter';
import { groupBy } from '../services/utils/utils';

import {
  apiService,
  client,
  SUBSCRIBE_CONVERSATIONS_WITH_MESSAGES,
} from '../services/ApiService';

const Stats = () => {
  const [AdvertSummary = '', setAdvertSummary] = useState();
  const [ConvSummary = '', setConvSummary] = useState();
  const [advertStatus = '', setAdvertStatus] = useState();
  const [deliveryAllowed = '', setDeliveryAllowed] = useState();
  const [offerAllowed = '', setOfferAllowed] = useState();
  const [customStatus = '', setCustomStatus] = useState();
  const [denyReason = '', setDenyReason] = useState();

  const [startTime = '', setStartTime] = useState();
  const [endTime = '', setEndTime] = useState();

  const operateAdverts = async (adverts) => {
    const groupedAdvStatus = groupBy(adverts, 'status');

    setAdvertSummary(
      (AdvertSummary) => AdvertSummary + 'Статусы объявлений:\n'
    );
    for (const key in groupedAdvStatus) {
      if (Object.prototype.hasOwnProperty.call(groupedAdvStatus, key)) {
        const element = groupedAdvStatus[key];
        setAdvertSummary(
          (AdvertSummary) => AdvertSummary + `[${key}]: ${element.length}\n`
        );
        const groupedAdvStatusDes = groupBy(element, 'statusDescription');

        for (const key2 in groupedAdvStatusDes) {
          if (Object.prototype.hasOwnProperty.call(groupedAdvStatusDes, key2)) {
            if (key2 === null) {
              continue;
            }

            if (key2 === 'null') {
              continue;
            }
            const element2 = groupedAdvStatusDes[key2];
            setAdvertSummary(
              (AdvertSummary) =>
                AdvertSummary + `- [${key2}]: ${element2.length}\n`
            );
          }
        }
      }
    }
  };

  const operateConversations = async (conversations, startDate, endDate) => {
    setConvSummary(
      (ConvSummary) =>
        ConvSummary + `\n\n[${startDate}] - [${endDate || 'сейчас'}]`
    );
    // debug_logger.debug(`Активных диалогов - ${conversations.length}`);
    const convStarted = conversations.filter(
      (c) => !c.Messages.find((m) => m.receivedDate <= startDate)
    );
    setConvSummary(
      (ConvSummary) =>
        ConvSummary + `\n\nНовых диалогов - ${convStarted.length}\n`
    );

    const groupedStatus = groupBy(convStarted, 'customStatus');

    setConvSummary((ConvSummary) => ConvSummary + '\nСтатусы диалогов:\n');
    for (const key in groupedStatus) {
      if (Object.prototype.hasOwnProperty.call(groupedStatus, key)) {
        const element = groupedStatus[key];
        setConvSummary(
          (ConvSummary) => ConvSummary + `[${key}]: ${element.length}\n`
        );
      }
    }

    const groupedDeny = groupBy(conversations, 'deny_reason');
    setConvSummary((ConvSummary) => ConvSummary + '\nПричины отказов:\n');
    for (const key in groupedDeny) {
      if (Object.prototype.hasOwnProperty.call(groupedDeny, key)) {
        const element = groupedDeny[key];
        if (key !== null && key !== 'null') {
          setConvSummary(
            (ConvSummary) => ConvSummary + `[${key}]: ${element.length}\n`
          );
        }
      }
    }
  };

  const handleSubmit = async (event) => {
    console.log('handleSubmit');
    setAdvertSummary('');
    setConvSummary('');
    event.preventDefault();
    const conversations = await apiService.getConversationsnStatuses({
      limit: 1000000,
      _lte: endTime,
      _gte: startTime,
    });
    const adverts = await apiService.getAdvertsByCreatedAt({
      _lte: endTime,
      _gte: startTime,
      limit: 1000000,
    });

    console.log(conversations);
    console.log(adverts);

    await operateAdverts(adverts);
    await operateConversations(conversations, startTime, endTime);
  };

  const changeDateFrom = async (date) => {
    console.log(date);
    setStartTime(date);
    localStorage.setItem('dateFrom', date.toString());
  };

  const changeDateTo = async (date) => {
    console.log(date);
    setEndTime(date);
    localStorage.setItem('dateTo', date.toString());
  };

  const changeDenyReason = (event) => {
    setDenyReason(event.target.value);
  };

  const changeCustomStatus = (event) => {
    setCustomStatus(event.target.value);
  };

  const changeOfferAllowed = (event) => {
    setOfferAllowed(event.target.checked);
  };

  const changeDeliveryAllowed = (event) => {
    setDeliveryAllowed(event.target.checked);
  };

  const changeAdvertStatus = (event) => {
    setAdvertStatus(event.target.value);
  };

  useEffect(() => {
    // getUnreadMessages();
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="dialog">
      <Row style={{ width: '100%' }}>
        <Col sm={{ span: 3, offset: 1 }}>
          <Form className="formSearch" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row style={{ width: '100%' }}>
                <Col>
                  <DatePicker
                    locale="es"
                    selected={startTime}
                    onChange={(date) => changeDateFrom(date)}
                  />
                </Col>
                <Col>
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => changeDateTo(date)}
                  />
                </Col>
              </Row>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={denyReason}
                onChange={changeDenyReason}
                placeholder="Введите причину отказа"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={advertStatus}
                onChange={changeAdvertStatus}
                placeholder="Введите статус объявления"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={customStatus}
                onChange={changeCustomStatus}
                placeholder="Введите кастомный статус"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                onClick={changeOfferAllowed}
                value={offerAllowed}
                type="checkbox"
                label="Offer allowed"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                onClick={changeDeliveryAllowed}
                value={deliveryAllowed}
                type="checkbox"
                label="Delivery allowed"
              />
            </Form.Group> */}
            <div className="d-grid gap-2">
              <Button className="modalButton" variant="primary" type="submit">
                Статистика
              </Button>
            </div>
          </Form>
        </Col>
        <Col sm={{ spanm: 7, offset: 1 }}>
          <div className="display-linebreak">{AdvertSummary}</div>
          <div className="display-linebreak">{ConvSummary}</div>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Stats;
