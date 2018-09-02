import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";

class FormContainer extends Component {

  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      passwordConfirm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  register(){
    alert('user id ' + this.state.userName + ' password ' + this.state.password + ' password confirmed ' + this.state.passwordConfirm);
  }

  render() {
    return (
      <form id="registration-form">
        <Input
          text="User Name"
          label="user_name"
          type="text"
          id="userName"
          value={this.state.userName}
          handleChange={this.handleChange}
        />
        <Input
          text="Eneter Password"
          label="enter_password"
          type="password"
          id="password"
          value={this.state.password}
          handleChange={this.handleChange}
        />

        <Input
          text="Confirm Password"
          label="confirn_password"
          type="password"
          id="passwordConfirm"
          value={this.state.passwordConfirm}
          handleChange={this.handleChange}
        />
        <button type='submit' onClick = {this.register}> Register </button>
      </form>
    );
  }
}

export default FormContainer;
ReactDOM.render(<FormContainer />, document.getElementById("registration-form"));