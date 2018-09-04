import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import {Button} from 'react-bootstrap';

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
        <div className='container'>
          <div className='row'>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Input
                text="User Name"
                label="user_name"
                type="text"
                id="userName"
                value={this.state.userName}
                handleChange={this.handleChange}
              />
            </div>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Input
                text="Eneter Password"
                label="enter_password"
                type="password"
                id="password"
                value={this.state.password}
                handleChange={this.handleChange}
              />
            </div>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Input
                text="Confirm Password"
                label="confirn_password"
                type="password"
                id="passwordConfirm"
                value={this.state.passwordConfirm}
                handleChange={this.handleChange}
              />
            </div>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Button type='submit' className = 'submit' onClick = {this.register}> Register </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default FormContainer;
ReactDOM.render(<FormContainer />, document.getElementById("registration-form"));