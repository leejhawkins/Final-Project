import React from "react";
import "./style.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const isAuthenticated = JSON.parse(localStorage.getItem("tokens"))
    this.state = {
      user: isAuthenticated.userName,
      chat: [],
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
    let newMessage = event.target.value;
    this.setState({newMessage:newMessage});
  };
  sendNewMessage = () => {
    let chat = this.state.chat
    let messageObject = {
      message: this.state.newMessage,
      user: this.state.user,
      date: new Date().toString(),
    };
    chat.push(messageObject);
    this.setState({chat:chat,newMessage:""});
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
