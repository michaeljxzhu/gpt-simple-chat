import React from 'react';
import './Login.css';
import BackendSingleton from '../Backend/Backend';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        message: ''
      };

      // Bind 'this' to event handlers. React ES6 does not do this by default
      this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
      this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
      this.handleLoginError = this.handleLoginError.bind(this);
    }
  
    usernameChangeHandler(event) {
      this.setState({
        username: event.target.value,
        password: this.state.password,
        message: this.state.message
      });
    }
  
    passwordChangeHandler(event) {
      this.setState({
        username: this.state.username,
        password: event.target.value,
        message: this.state.message
      });
    }

    handleLoginSuccess() {
        this.setState({
            username: this.state.username,
            password: this.state.password,
            message: 'success!'
        });
        console.log('success!');
        this.props.loginCallback();
    }

    handleLoginError() {
        this.setState({
            username: this.state.username,
            password: this.state.password,
            message: 'error!'
        });
        console.log('error!');
    }

    usernameSubmitHandler(event) {
        event.preventDefault();
        let backend = new BackendSingleton();
        backend.loginUser(
            this.state.username,
            this.state.password,
            this.handleLoginSuccess,
            this.handleLoginError
        );
      }
  
    render() {
      // Initial page load, show a simple login form
      return (
        <form onSubmit={this.usernameSubmitHandler} className="username-container">
          <h1>Chat</h1>
          <div>
            <input
              type="text"
              onChange={this.usernameChangeHandler}
              placeholder="Enter a username"
              required />
              <input
              type="text"
              onChange={this.passwordChangeHandler}
              placeholder="Enter a password"
              required />
          </div>
          <input type="submit" value="Submit" />
          <h5>{this.state.message}</h5>
        </form>
      );
    }
}

export default Login;