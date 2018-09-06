import React, { Component } from "react";
import ReactDOM from "react-dom";
import Registration from './Registration';
import LogIn from './LogIn';

class FormContainer extends Component {
    
    constructor() {
        super();
        this.state = {
            page : 'logIn'
        };
        this.register = this.register.bind(this);
        this.backtoHome = this.backtoHome.bind(this);
    }

    register(){
        this.setState({page : 'registration'});
    }

    backtoHome(){
        this.setState({page : 'logIn'});
    }

    render(){
        let pageRender = this.state.page === 'logIn'? <LogIn register = {this.register}/> : <Registration backtoHome = {this.backtoHome}/>
        return (
            <form id="registration-form">
                {pageRender}
            </form>
        );
    }
}
export default FormContainer;
ReactDOM.render(<FormContainer />, document.getElementById("registration-form"));