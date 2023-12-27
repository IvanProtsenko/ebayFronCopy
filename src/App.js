import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './views/Table';
import Auth from './views/auth/Auth';
import Chat from './views/ConversationFilters/Chat';
import JustifiedExample from './views/Tabs';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/main" element={<JustifiedExample />} />
          <Route path="/" element={<Auth />} />
          <Route
            path="/dialog"
            element={<JustifiedExample status="Диалог" />}
          />
          <Route
            path="/waiting_answer"
            element={<JustifiedExample status="Ждем ответа продавца" />}
          />
          <Route
            path="/dialogProcessed"
            element={<JustifiedExample status="Диалог (обработано)" />}
          />
          <Route
            path="/offer_made"
            element={<JustifiedExample status="Запрос отправлен" />}
          />
          <Route
            path="/rejected_offer"
            element={<JustifiedExample status="Запрос отклонён" />}
          />
          <Route
            path="/offer_accepted"
            element={<JustifiedExample status="Запрос принят" />}
          />
          <Route
            path="/outdated_offer"
            element={<JustifiedExample status="Запрос просрочен" />}
          />
          <Route
            path="/to_pay"
            element={<JustifiedExample status="На оплату" />}
          />
          <Route
            path="/transaction_reserved"
            element={<JustifiedExample status="Оплачено" />}
          />
          <Route
            path="/item_marked_as_shipped"
            element={<JustifiedExample status="Посылка отправлена" />}
          />
          <Route
            path="/outdated_shipping"
            element={<JustifiedExample status="Посылка не доставлена" />}
          />
          <Route
            path="/item_delivered"
            element={<JustifiedExample status="Подтвердите получение" />}
          />
          <Route
            path="/item_marked_as_received"
            element={<JustifiedExample status="Посылка получена" />}
          />
          <Route
            path="/charged_back"
            element={<JustifiedExample status="Возврат средств" />}
          />
          <Route
            path="/transaction_expired"
            element={<JustifiedExample status="Платеж не прошел" />}
          />
          <Route
            path="/wrongValidation"
            element={<JustifiedExample status="Неправильная валидация" />}
          />
          <Route
            path="/later"
            element={<JustifiedExample status="Отложенные" />}
          />
          <Route
            path="/blacklist"
            element={<JustifiedExample status="Черный список" />}
          />
        </Routes>
      </div>
    );
  }
}
