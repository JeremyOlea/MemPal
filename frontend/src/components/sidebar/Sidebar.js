import React, { Component } from 'react'
import DropdownMenu from './DropdownMenu'
import NewDocumentButton from './NewDocumentButton'
import './sidebar.css'
import Tree from './Tree'

class Sidebar extends Component {
    state = {
        highlightId: -1,
        data: treeData,
    }

    highlightDocument = (id) => {
        this.setState({highlightId: id});
    }

    createDocument = () => {
        const tempTreeData = this.state.data;
        tempTreeData.push(
            {
                id: 1002, // change this later
                type: 'document',
                name: 'Untitled Document',
                children: [],
            }
        );
        this.setState({data: tempTreeData});
    }

    createFolder = () => {
        const tempTreeData = this.state.data;
        tempTreeData.push(
            {
                id: 1001, // change this later
                type: 'folder',
                name: 'Untitled Folder',
                children: [],
            }
        );
        this.setState({data: tempTreeData});
    }

    render() {

        let profileButtons;
        if (this.props.isLoggedIn) {
            profileButtons = <div className='logged-in-user-container'>  
                                <span>Welcome to MemPal!</span>
                                <button className='logout-btn'
                                    onClick={() => this.props.logoutButtonClicked()}>logout</button> 
                            </div>
        } else {
            profileButtons = <div className='button-container'>  
                                <button className='sign-in' 
                                    onClick={() => this.props.loginButtonClicked(true)}>Login</button> 
                                <button className='sign-in'
                                    onClick={() => this.props.signupButtonClicked(true)}>Sign up</button>
                            </div>
        }


        return (
            <div className='sidebar'>
                <div className='sidebar-flex-container'>
                    <div className='profile-area'>
                        {profileButtons}
                    </div>
                    <div className='search-area'> 
                        <input className='search-bar' type='text' placeholder='Search...'/>
                    </div>
                    <div className='document-area'>
                        <Tree className='tree' data={this.state.data} 
                        parentCallback={this.highlightDocument} isSelected={this.state.highlightId}/>
                    </div>
                    <div className='new-document-area'>
                        <NewDocumentButton createDocument={this.createDocument}
                                createFolder={this.createFolder}>
                            <DropdownMenu></DropdownMenu>
                        </NewDocumentButton>
                    </div>
                </div>
            </div>
        )
    }
}

const treeData = [
    {
        id: 1, // ID's will be set when reading data from backend
        type: 'folder',
        name: 'Classes',
        children: [
            {
                id: 2,
                type: 'folder',
                name: 'Data Structures & Algorithms',
                children: [
                    {
                        id: 3,
                        type: 'document',
                        name: 'Lecture 1',
                        children: [],
                    },
                    {
                        id: 4,
                        type: 'document',
                        name: 'Lecture 2',
                        children: [],
                    }
                ]
            },
            {
                id: 5,
                type: 'folder',
                name: 'Software Requirements',
                children: [
                    {
                        id: 6,
                        type: 'document',
                        name: 'Lecture 1',
                        children: [],
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        type: 'folder',
        name: 'Notes',
        children: [
            {
                id: 8,
                type: 'folder',
                name: 'Book Notes',
                children: [
                    {
                        id: 9,
                        type: 'document',
                        name: 'Chapter 1',
                        children: [],
                    }
                ]
            },
        ]
    }
]

export default Sidebar