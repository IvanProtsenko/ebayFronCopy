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
    const attachment = this.state.msg.EmailMessages_Attachments;

    const renderAttachments = () => {
      if (
        attachment &&
        attachment.length > 0 &&
        attachment[0].base64FileContents
      ) {
        const data = attachment[0].base64FileContents;
        return (
          <div className="subject">
            <img
              className="messageImage"
              src={`data:image/jpeg;base64,${data}`}
            />
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
        {/* <div className="from">{this.state.msg.title}</div> */}
        <div className="subject">{this.state.msg.text}</div>
        {renderAttachments()}
      </div>
    );
  }
}
