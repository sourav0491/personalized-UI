import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import {Button} from 'react-bootstrap';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newUserName: '',
      newPassword: '',
      newPasswordConfirm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
    this.backtoHome = this.backtoHome.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  register(){
    alert('user id ' + this.state.newUserName + ' password ' + this.state.newPassword + ' password confirmed ' + this.state.newPasswordConfirm);
  }

  backtoHome(){
    this.props.backtoHome();
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Input
                text="Email Id"
                label="user_name"
                type="text"
                id="userName"
                value={this.state.newUserName}
                handleChange={this.handleChange}
              />
            </div>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Input
                text="Eneter Password"
                label="enter_password"
                type="password"
                id="password"
                value={this.state.newPassword}
                handleChange={this.handleChange}
              />
            </div>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <Input
                text="Confirm Password"
                label="confirn_password"
                type="password"
                id="passwordConfirm"
                value={this.state.newPasswordConfirm}
                handleChange={this.handleChange}
              />
            </div>
          </div>
          <div className='row'>
              <div className = 'col-xs-7 col-sm-7 col-md-7 col-lg-7'>
                  <Button type='submit' className = 'submit' onClick = {this.register}> Register </Button>
              </div>
              <div className = 'col-xs-5 col-sm-5 col-md-5 col-lg-5'>
                  <Button type='submit' className = 'submit' onClick = {this.backtoHome}> Back Home</Button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;