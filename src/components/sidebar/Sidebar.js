import React, { Component } from 'react'
import Folder from './Folder'
import './sidebar.css'
import Tree from './Tree'
import Document from './Document'

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <div className='sidebar-flex-container'>
                    <div className='profile-area'> User Profile </div>
                    <div className='search-area'> Search Area </div>
                    <div className='document-area'>
                        <Tree className='tree'>
                            <Folder name='Classes'>
                                <Folder name='Data Structures & Algorithms'>
                                    <Document name='Lecture 1'/>
                                    <Document name='Lecture 2'/>
                                    <Document name='Lecture 3'/>
                                </Folder>
                            </Folder>
                            <Folder name='Software Requirements'>
                                <Document name='Lecture 1'/>
                                <Document name='Lecture 2'/>
                                <Document name='Lecture 3'/>
                                <Folder name='Another Folder'>
                                    <Document name='Lecture 3'/>
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
