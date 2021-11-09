import React, { Component } from 'react'
import './sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <div className='sidebar-flex-container'>
                    <div className='profile-area'> User Profile </div>
                    <div className='search-area'> Search Area </div>
                    <div className='document-area'> Documents </div>
                </div>
            </div>
        )
    }
}

export default Sidebar