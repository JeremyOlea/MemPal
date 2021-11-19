import React, { Component } from 'react'
import './LoginPopup.css'
import {API_ADDRESS} from'../../constants'

export class LoginPopup extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = () => {
        console.log(this.state);
        this.loginAuthentication(this.state.email, this.state.password);
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    loginAuthentication = async (inputEmail, inputPassword) => {
        inputEmail = inputEmail.toLowerCase();
        try {
            const res = await fetch(`${API_ADDRESS}/api/authentication/login`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword,
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
          } catch (err) {
            alert('Login Failed! Please enter a valid username and password.');
          }
    }

    render() {
        return (this.props.trigger) ? (
            <div className='login-outer'>
                <div className='login-inner'>
                    <h1>Login</h1>
                    {/* <form className='login-form'> */}
                        <span>Email</span>
                        <input type='text' placeholder='Email' onChange={this.handleEmailChange}/>
                        <span>Password</span>
                        <input type='password' placeholder='Password' onChange={this.handlePasswordChange}/>
                        <button onClick={this.handleSubmit}>submit</button>
                    {/* </form> */}
                    <button className='close-btn'
                            onClick={() => this.props.loginButtonOnClick(false)}>close</button>
                </div>
            </div>
        ) : "";
    }
}

export default LoginPopup
