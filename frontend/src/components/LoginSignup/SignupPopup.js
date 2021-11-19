import React, { Component } from 'react'
import './SignupPopup.css'
import { API_ADDRESS } from '../../constants'
import { FiX } from 'react-icons/fi'

export class LoginPopup extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = () => {
        console.log(this.state);
        this.signupAuthentication(this.state.email, this.state.password);
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    signupAuthentication = async (inputEmail, inputPassword) => {
        inputEmail = inputEmail.toLowerCase();
        try {
            const res = await fetch(`${API_ADDRESS}/api/authentication/signup`, {
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
            <div className='signup-outer'>
                <div className='signup-inner'>
                    <div className='signup-flex'>
                        <h1 className='signup-header'>Login</h1>
                        <span className='input-label'>Email</span>
                        <input type='text' placeholder='Email' onChange={this.handleEmailChange}
                            className='input-field'/>
                        <span className='input-label'>Password</span>
                        <input type='password' placeholder='Password' onChange={this.handlePasswordChange}
                            className='input-field'/>
                        <button onClick={this.handleSubmit}>submit</button>
                        <FiX className='close-btn' 
                            onClick={() => this.props.signupButtonOnClick(false)}
                            size={25}/>
                    </div>
                    
                </div>
            </div>
        ) : "";
    }
}

export default LoginPopup
