import React, { Component } from 'react'
import LoginPopup from '../../components/LoginSignup/LoginPopup'
import SignupPopup from '../../components/LoginSignup/SignupPopup'
import Sidebar from '../../components/sidebar/Sidebar'
import TextEditor from '../../components/TextEditor/TextEditor'
// import FillerText from '../../components/FillerText'
import './Home.css'
import { useParams } from 'react-router-dom'

export class Home extends Component {
    state = {
        user: localStorage.getItem('login'),
        loginOpen: false,
        signupOpen: false,
        documentId: this.props.id
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
                    <div className='textEditor'>
                        <TextEditor/>
                    </div>
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
