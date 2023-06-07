import React, { Component } from 'react';

export default class Message extends Component {
  state = {
    msg: this.props.message,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <div
        className={
          'message' + (this.state.msg.boundness == 'OUTBOUND' ? '-right' : '')
        }
        key={this.state.msg.messageId}
      >
        <div className="date">{this.state.msg.receivedDate}</div>
        <div className="from">{this.state.msg.title}</div>
        <div className="subject">{this.state.msg.textShort}</div>
      </div>
    );
  }
}
