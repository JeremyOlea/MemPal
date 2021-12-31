import React, { Component } from 'react'
import './LoginPopup.css'
import { API_ADDRESS } from '../../constants'
import { FiX } from 'react-icons/fi'

export class LoginPopup extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = () => {
        this.loginAuthentication(this.state.email, this.state.password);
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    afterLogin = (data) => {
        if (data.isValid) {
            const credentials = data.credentials.User_ID;
            localStorage.setItem('login', credentials);
            this.props.loginCallback(credentials);
        } else {
            alert('Operation failed! Please try again later.');
        }
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
            this.afterLogin(data);
          } catch (err) {
            alert('Login Failed! Please enter a valid username and password.');
            console.log(err);
          }
    }

    render() {
        return (this.props.trigger) ? (
            <div className='login-outer'>
                <div className='login-inner'>
                    <div className='login-flex'>
                        <h1 className='login-header'>Login</h1>
                        <span className='input-label'>Email</span>
                        <input type='text' placeholder='Email' onChange={this.handleEmailChange}
                            className='input-field'/>
                        <span className='input-label'>Password</span>
                        <input type='password' placeholder='Password' onChange={this.handlePasswordChange}
                            className='input-field'/>
                        <button onClick={this.handleSubmit}>submit</button>
                        <FiX className='close-btn' 
                            onClick={() => this.props.popupClose(false)}
                            size={25}/>
                    </div>
                    
                </div>
            </div>
        ) : "";
    }
}

export default LoginPopup
