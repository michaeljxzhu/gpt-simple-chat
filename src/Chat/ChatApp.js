import React from 'react';
import BackendSingleton from '../Backend/Backend';
import Messages from './Messages';
import ChatInput from './ChatInput';
import './ChatApp.css';

class ChatApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { messages: [] };
      this.backend = new BackendSingleton();
      this.sendHandler = this.sendHandler.bind(this);
      this.handleGPTMessage = this.handleGPTMessage.bind(this);
      this.handleGPTMessageErr = this.handleGPTMessageErr.bind(this);
    }
  
    sendHandler(message) {
        // add message that we just typed to the chat history
        const messageObject = {
            username: this.backend.username,
            message: message,
            fromMe: true
        };
        this.addMessage(messageObject);

        // send the message to the server and get a response
        this.backend.getGPTResponse(
            message,
            this.handleGPTMessage,
            this.handleGPTMessageErr
        )
    }

    handleGPTMessage(message) {
        let serverMessageReply = {
            fromMe: false,
            username: 'GPT',
            message: message
        };
        this.addMessage(serverMessageReply);
    }

    handleGPTMessageErr(errorMessage) {
        let serverMessageReply = {
            fromMe: false,
            username: 'GPT',
            message: errorMessage
        };
        this.addMessage(serverMessageReply);
    }
  
    addMessage(message) {
      // Append the message to the component state
      const messages = this.state.messages;
      messages.push(message);
      this.setState({ messages });
    }
  
    render() {
      return (
        <div className="container">
          <h3>Chat</h3>
          <Messages messages={this.state.messages} />
          <ChatInput onSend={this.sendHandler} />
        </div>
      );
    }
  }
  
  export default ChatApp;
  