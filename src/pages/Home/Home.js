import React, { Component } from 'react'
import FillerText from '../../components/FillerText'
import LoginPopup from '../../components/LoginSignup/LoginPopup'
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.css'

export class Home extends Component {
    state = {
        loginOpen: true,
    }

    changeLoginPopupState = (b) => {
        this.setState({loginOpen: b});
    }

    render() {
        return (
            <div>
                <div className='flex-container'>
                    <Sidebar loginButtonOnClick={this.changeLoginPopupState}/>
                    {/* <FillerText/> */}
                </div>
                <LoginPopup loginButtonOnClick={this.changeLoginPopupState} 
                    trigger={this.state.loginOpen}/>
            </div>
        )
    }
}

export default Home
