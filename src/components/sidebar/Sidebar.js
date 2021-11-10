import React, { Component } from 'react'
import Folder from './Folder'
import './sidebar.css'
import Tree from './Tree'

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <div className='sidebar-flex-container'>
                    <div className='profile-area'> User Profile </div>
                    <div className='search-area'> Search Area </div>
                    <div className='document-area'>
                        <Tree>
                            <Folder name='this is section'>
                                <Folder name='other folder'>
                                    Hello
                                </Folder>
                            </Folder>
                        </Tree>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar
