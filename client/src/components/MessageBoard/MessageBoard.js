import React from "react";
import { Input, FormBtn } from "../Form";
import { List, ListItem } from "../List"
import moment from "moment";

class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ""
        };
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <div id="members">
                <h5>Message Board:</h5>
                <hr></hr>
                {this.props.messages ? (
                    <List>
                        {this.props.messages.map(message => (
                            <ListItem key={message._id}>
                                <span>{message.firstName} {message.lastName}: {message.message} <p className="float-right">{moment(message.date, "YYYY-MM-DDTHH:mm").format("MM/DD HH:mm")}</p></span>
                            </ListItem>
                        ))}
                    </List>
                ) : ("")}
                <div>
                    <Input
                        value={this.state.newMessage}
                        onChange={this.handleInputChange}
                        name="newMessage"
                    />
                    <FormBtn 
                        className="submit" 
                        type="button" 
                        value="send" 
                        onClick={() => {
                            this.props.sendNewMessage(this.state.newMessage)
                            this.setState({newMessage:""})}}
                    >
                        Post Message
                    </FormBtn>
                </div>
            </div>
        );
    }
}

export default MessageBoard;
