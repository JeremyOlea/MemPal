import React, { Component } from 'react'
import './LoginPopup.css'

export class LoginPopup extends Component {
    render() {
        return (this.props.trigger) ? (
            <div className='login-outer'>
                <div className='login-inner'>
                    <button className='close-btn'
                        onClick={() => this.props.loginButtonOnClick(false)}>close</button>
                    <input type='text' placeholder='Username'/>
                    <input type='text' placeholder='Password'/>
                    <button>submit</button>
                </div>
            </div>
        ) : "";
    }
}

export default LoginPopup
