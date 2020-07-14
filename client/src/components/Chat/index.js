import React from "react";
import "./style.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [
        {
          _id: "5f0cd55d8d58e5f1c0d16472",
          message: "founded",
          user: "joe newsome",
          date: "1982-07-14 06:00:00.000Z",
        },
      ],
      newMessage: "",
      chatIsOpen: false,
    };
  }
  toggleChat = () => {
    let newState = {...this.state};
    newState.chatIsOpen = !newState.chatIsOpen;
    console.log(newState);
    this.setState(newState);
  };
  updateNewMessage = (event) => {
    let newState = {...this.state};
    newState.newMessage = event.target.value;
    console.log(newState);
    this.setState(newState);
  };
  sendNewMessage = () => {
    let newState = {...this.state};
    let messageObject = {
      message: this.state.newMessage,
      user: "joe newsome",
      date: new Date().toString(),
    };
    newState.chat.push(messageObject);
    newState.newMessage="";
    console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
      <div className="chatContainer">
        <div className="chat" onClick={this.toggleChat}>Chat</div>
        <div className={`chatbox ${this.state.chatIsOpen ? "open" : ""}`}>
          <div className="chatMessages">
            {this.state.chat.map((item) => {
              return (
                <p>
                  <span>{item.user}:&nbsp;</span>
                  {item.message}
                </p>
              );
            })}
          </div>

          <input
            onChange={this.updateNewMessage}
            value={this.state.newMessage}
          />
          <input type="button" value="send" onClick={this.sendNewMessage} />
        </div>
      </div>
    );
  }
}

export default Chat;
