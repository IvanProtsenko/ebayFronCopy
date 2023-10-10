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
    const attachment = this.state.msg.attachments;

    const renderAttachments = () => {
      if (attachment && attachment.length > 0 && attachment[0].url) {
        const data = attachment[0].url;
        return (
          <div className="subject">
            прикрепленное фото
          </div>
        );
      }
    };

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
        {renderAttachments()}
      </div>
    );
  }
}
