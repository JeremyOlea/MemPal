import React, { Component } from 'react'
// import FillerText from '../../components/FillerText'
import LoginPopup from '../../components/LoginSignup/LoginPopup'
import SignupPopup from '../../components/LoginSignup/SignupPopup'
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.css'

export class Home extends Component {
    state = {
        user: localStorage.getItem('login'),
        loginOpen: false,
        signupOpen: false
    }

    changeLoginPopupState = (b) => {
        this.setState({loginOpen: b});
    }

    changeSignupPopupState = (b) => {
        this.setState({signupOpen: b});
    }

    setLoginCookie = (userData) => {
        this.setState({user : userData});
        this.changeLoginPopupState(false);
        this.changeSignupPopupState(false);
    }

    userLogout = () => {
        localStorage.removeItem('login');
        this.setState({user: null});
    }

    render() {
        return (
            <div>
                <div className='flex-container'>
                    <Sidebar isLoggedIn={this.state.user} 
                        loginButtonClicked={this.changeLoginPopupState}
                        signupButtonClicked={this.changeSignupPopupState}
                        logoutButtonClicked={this.userLogout}/>
                    {/* <FillerText/> */}
                </div>
                <LoginPopup popupClose={this.changeLoginPopupState} 
                    trigger={this.state.loginOpen && !this.state.user}
                    loginCallback={this.setLoginCookie}/>
                <SignupPopup popupClose={this.changeSignupPopupState} 
                    trigger={this.state.signupOpen && !this.state.user}
                    loginCallback={this.setLoginCookie}/>
            </div>
        )
    }
}

export default Home
