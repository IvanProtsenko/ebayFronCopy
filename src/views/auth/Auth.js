import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { apiServiceCustomResolvers } from '../../services/ApiCustomResolvers';

export default class Auth extends Component {
  state = {
    id: '',
    userId: '',
    secret: '',
  };

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleInputSecret = this.handleInputSecret.bind(this);
  }

  async handleInputSecret(event) {
    this.setState(() => {
      return { secret: event.target.value };
    });
  }

  async login(event) {
    event.preventDefault();
    try {
      const customerId = await apiServiceCustomResolvers.getUserIdBySecretKey(
        this.state.secret
      );
      localStorage.setItem('userPassword', this.state.secret);
      localStorage.setItem('userId', customerId);
      // const token = await apiServiceCustomResolvers.getUserJWT(
      //   this.state.secret
      // );
      // console.log(token);
      localStorage.setItem('userToken', this.state.secret);
      window.location.href = '/main';
    } catch (err) {
      console.log('err while login: ', err);
    }
  }

  async toMain() {}

  async componentDidMount() {
    // const userId = localStorage.getItem('userId');
    // if (userId) window.location.href = '/main';
  }

  render() {
    return (
      <div>
        <Form className="Form" noValidate onSubmit={this.login}>
          <Form.Group className="mb-3">
            <Form.Label>Enter your secret key</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleInputSecret}
              value={this.state.secret}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button className="modalButton" variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
