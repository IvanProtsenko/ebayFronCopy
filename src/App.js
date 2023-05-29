import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './views/Table';
import Auth from './views/auth/Auth';
import Chat from './views/Chat';
import JustifiedExample from './views/Tabs';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/main" element={<JustifiedExample />} />
          <Route path="/" element={<Auth />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </div>
    );
  }
}
