import React from 'react';
import Login from './Login/Login';
import ChatApp from './Chat/ChatApp';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  handleLoggedIn() {
    this.setState({
      loggedIn: true
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <ChatApp></ChatApp>
      );
    }
  
    return (
      <div className="test">
        <Login loginCallback={this.handleLoggedIn}></Login>
      </div>
    );
  }
}

export default App;
