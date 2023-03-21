import React from 'react';
import BackendSingleton from '../Backend/Backend';
import Messages from './Messages';
import ChatInput from './ChatInput';
import Dropdown from './Dropdown';
import './ChatApp.css';
import { v4 as uuidv4 } from 'uuid';

class ChatApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { messages: [] };
      this.retrievalMethod = "prompt_retrieval" // default to prompt_retrieval
      this.backend = new BackendSingleton();
      this.sendHandler = this.sendHandler.bind(this);
      this.handleGPTMessage = this.handleGPTMessage.bind(this);
      this.handleGPTMessageErr = this.handleGPTMessageErr.bind(this);

      // this will serve to create a new 'thread' every time
      this.chatUUID = uuidv4();
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
            this.chatUUID,
            this.retrievalMethod,
            this.handleGPTMessage,
            this.handleGPTMessageErr
        )
    }

    handleItemSelected = (method) => {
        this.retrievalMethod = method;
        console.log('INFO: Select retrieval method as -> ', this.retrievalMethod);
        const messageObject = {
            username: this.backend.username,
            message: `INFO: ${this.backend.username} selects retrieval method as -> ${this.retrievalMethod}`,
            fromMe: true
        };
        this.addMessage(messageObject);
    };

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
          <h3>Chat Room</h3>
            <Dropdown onItemSelected={this.handleItemSelected}/>
            <Messages messages={this.state.messages} />
          <ChatInput onSend={this.sendHandler} />
        </div>
      );
    }
  }
  
  export default ChatApp;
  