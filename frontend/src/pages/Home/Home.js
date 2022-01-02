import React, { Component } from 'react'
import LoginPopup from '../../components/LoginSignup/LoginPopup'
import SignupPopup from '../../components/LoginSignup/SignupPopup'
import Sidebar from '../../components/sidebar/Sidebar'
import TextEditor from '../../components/TextEditor/TextEditor'
import './Home.css'
import { API_ADDRESS } from '../../constants'

export class Home extends Component {
    state = {
        user: localStorage.getItem('login'),
        loginOpen: false,
        signupOpen: false,
        documentId: this.props.id,
        content: [],
    }

    async componentDidMount() {
        if (this.state.user == null) {
            this.setState({content: []});
            return;
        }

        try {
            let res = await fetch(
                `${API_ADDRESS}/api/content/getAllContent?user_id=${this.state.user}`, {
                    mode: 'cors',
                });
            const treeData = await res.json();
            this.setState({content: treeData['result']});
        } catch(err) {
            console.log(err);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.user !== this.state.user) {
            if (this.state.user == null) {
                this.setState({content: []});
                return;
            }
    
            try {
                let res = await fetch(
                    `${API_ADDRESS}/api/content/getAllContent?user_id=${this.state.user}`, {
                        mode: 'cors',
                    });
                const treeData = await res.json();
                this.setState({content: treeData['result']});
            } catch(err) {
                console.log(err);
            }
        }
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
                        logoutButtonClicked={this.userLogout}
                        treeData={this.state.content}/>
                    <div className='textEditor'>
                        <TextEditor documentId={this.state.documentId}/>
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
