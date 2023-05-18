import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { apiService } from '../../services/ApiService';

export default function AddAccountModal(props) {
  const [email = '', setEmail] = useState();
  const [pass = '', setPass] = useState();
  // const [firstName = '', setFirstName] = useState();
  // const [lastName = '', setLastName] = useState();
  // const [region = '', setRegion] = useState();
  // const [day = '', setDay] = useState();
  // const [month, setMonth] = useState();
  // const [year, setYear] = useState();
  const [httpProxyHost, setHttpProxyHost] = useState();
  const [httpProxyPort, setHttpProxyPort] = useState();
  const [httpProxyLogin, setHttpProxyLogin] = useState();
  const [httpProxyPass, setHttpProxyPass] = useState();
  const [socksProxyHost, setSocksProxyHost] = useState();
  const [socksProxyPort, setSocksProxyPort] = useState();
  const [socksProxyLogin, setSocksProxyLogin] = useState();
  const [socksProxyPass, setSocksProxyPass] = useState();

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputPass = (event) => {
    setPass(event.target.value);
  };

  // const handleInputFirstName = (event) => {
  //   setFirstName(event.target.value);
  // };

  // const handleInputLastName = (event) => {
  //   setLastName(event.target.value);
  // };

  // const handleInputRegion = (event) => {
  //   setRegion(event.target.value);
  // };

  // const handleInputDay = (event) => {
  //   setDay(event.target.value);
  // };

  // const handleInputMonth = (event) => {
  //   setMonth(event.target.value);
  // };

  // const handleInputYear = (event) => {
  //   setYear(event.target.value);
  // };

  const handleInputHttpProxyHost = (event) => {
    setHttpProxyHost(event.target.value);
  };

  const handleInputHttpProxyPort = (event) => {
    setHttpProxyPort(event.target.value);
  };

  const handleInputHttpProxyLogin = (event) => {
    setHttpProxyLogin(event.target.value);
  };

  const handleInputHttpProxyPass = (event) => {
    setHttpProxyPass(event.target.value);
  };

  const handleInputSocksProxyHost = (event) => {
    setSocksProxyHost(event.target.value);
  };

  const handleInputSocksProxyPort = (event) => {
    setSocksProxyPort(event.target.value);
  };

  const handleInputSocksProxyLogin = (event) => {
    setSocksProxyLogin(event.target.value);
  };

  const handleInputSocksProxyPass = (event) => {
    setSocksProxyPass(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let existingAccount = await apiService.getAccountByPk(email);
    if (!existingAccount) {
      const data = [
        {
          email,
          password: pass,
          customerId: localStorage.getItem('userId'),
          httpProxy:
            httpProxyHost +
            ':' +
            httpProxyPort +
            '@' +
            httpProxyLogin +
            ':' +
            httpProxyPass,
          socksProxy:
            socksProxyHost +
            ':' +
            socksProxyPort +
            '@' +
            socksProxyLogin +
            ':' +
            socksProxyPass,
        },
      ];
      await apiService.createAccounts(data);
    }

    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить аккаунт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              value={email}
              onChange={handleInputEmail}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              value={pass}
              onChange={handleInputPass}
              placeholder="Password"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={firstName}
              onChange={handleInputFirstName}
              placeholder="First name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={lastName}
              onChange={handleInputLastName}
              placeholder="Last name"
            />
          </Form.Group> */}
          {/* <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={region}
              onChange={handleInputRegion}
              placeholder="Region"
            />
          </Form.Group> */}
          {/* <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={day}
                  onChange={handleInputDay}
                  placeholder="Day of birth"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="number"
                  value={month}
                  onChange={handleInputMonth}
                  placeholder="Month of birth"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="number"
                  value={year}
                  onChange={handleInputYear}
                  placeholder="Year of birth"
                />
              </Form.Group>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={httpProxyHost}
                  onChange={handleInputHttpProxyHost}
                  placeholder="Http proxy host"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={httpProxyPort}
                  onChange={handleInputHttpProxyPort}
                  placeholder="Http proxy port"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={httpProxyLogin}
                  onChange={handleInputHttpProxyLogin}
                  placeholder="Http proxy login"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={httpProxyPass}
                  onChange={handleInputHttpProxyPass}
                  placeholder="Http proxy pass"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={socksProxyHost}
                  onChange={handleInputSocksProxyHost}
                  placeholder="Socks proxy host"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={socksProxyPort}
                  onChange={handleInputSocksProxyPort}
                  placeholder="Socks proxy port"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={socksProxyLogin}
                  onChange={handleInputSocksProxyLogin}
                  placeholder="Socks proxy login"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={socksProxyPass}
                  onChange={handleInputSocksProxyPass}
                  placeholder="Socks proxy pass"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button className="modalButton" variant="primary" type="submit">
              Создать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
