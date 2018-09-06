import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import {Button} from 'react-bootstrap';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.logIn = this.logIn.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  register(){
    this.props.register();
  }

  logIn(){
    alert('user id ' + this.state.userName + ' password ' + this.state.password + ' password confirmed ' + this.state.passwordConfirm);
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
                    value={this.state.userName}
                    handleChange={this.handleChange}
                />
                </div>
                <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <Input
                    text="Password"
                    label="enter_password"
                    type="password"
                    id="password"
                    value={this.state.password}
                    handleChange={this.handleChange}
                />
                </div>
            </div>
            <div className='row'>
                <div className = 'col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                    <Button type='submit' className = 'submit' onClick = {this.logIn}> Log In </Button>
                </div>
                <div className = 'col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                    <Button type='submit' className = 'submit' onClick = {this.register}> Register </Button>
                </div>
            </div> 
        </div>
      </div>
    );
  }
}

export default LogIn;