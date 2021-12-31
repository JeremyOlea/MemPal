import React, { Component } from 'react'
import NewDocumentButton from './NewDocumentButton'
import './sidebar.css'
import Tree from './Tree'
import { API_ADDRESS } from '../../constants'

class Sidebar extends Component {
    state = {
        user: this.props.isLoggedIn,
        highlightId: -1,
        data: this.props.treeData,
    }

    componentDidUpdate(prevProps) {
        if(this.props.treeData !== prevProps.treeData) {
            this.setState({data: this.props.treeData});
        }
    }

    highlightDocument = (id) => {
        this.setState({highlightId: id});
    }

    afterCreateDocument = (data, doc_name) => {
        if (data.isValid) {
            const tempTreeData = this.state.data;
            tempTreeData.push(
                {
                    id: data.content_ID,
                    type: 'document',
                    name: doc_name,
                    children: [],
                }
            )
            this.setState({data: tempTreeData});
        } else {
            alert('Operation failed! Please try again later.');
        }
    }

    createDocument = async () => {
        const doc_name = 'Untitled Document';
        const parent_id = null;
        const user_id = this.state.user;
        if (user_id == null) return

        try {
            const res = await fetch(`${API_ADDRESS}/api/content/addDocument`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    parent_id: parent_id,
                    user_id: user_id,
                    name: doc_name,
                    data: '' // Change this to quill obj
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            this.afterCreateDocument(data, doc_name);
        } catch (err) {
            alert('Failed to create document.');
            console.log(err);
            this.setState(
                {
                    isOpen: true,
                    openContextMenu: false,
                    isHovering: false
            });
        }
    }

    createFolder = async () => {
        const folder_name = 'Untitled Folder';
        const parent_id = null;
        const user_id = this.state.user;
        if (user_id == null) return

        try {
            const res = await fetch(`${API_ADDRESS}/api/content/addFolder`, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    parent_id: parent_id,
                    user_id: user_id,
                    name: folder_name
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            this.afterCreateFolder(data, folder_name);
        } catch (err) {
            alert('failed to create folder.');
            console.log(err);
        }
    }

    afterCreateFolder = (data, folder_name) => {
        if (data.isValid) {
            const tempTreeData = this.state.data;
            tempTreeData.push(
                {
                    id: data.content_ID,
                    type: 'folder',
                    name: folder_name,
                    children: [],
                }
            )
            this.setState({data: tempTreeData});
        } else {
            alert('Operation failed! Please try again later.');
        }
    }

    // createDocument = () => {
    //     const tempTreeData = this.state.data;
    //     tempTreeData.push(
    //         {
    //             id: 1002, // change this later
    //             type: 'document',
    //             name: 'Untitled Document',
    //             children: [],
    //         }
    //     );
    //     this.setState({data: tempTreeData});
    // }

    // createFolder = () => {
    //     const tempTreeData = this.state.data;
    //     tempTreeData.push(
    //         {
    //             id: 1001, // change this later
    //             type: 'folder',
    //             name: 'Untitled Folder',
    //             children: [],
    //         }
    //     );
    //     this.setState({data: tempTreeData});
    // }

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
                        parentCallback={this.highlightDocument} isSelected={this.state.highlightId}
                        depth={1} parentId={null}/>
                    </div>
                    <div className='new-document-area'>
                        <NewDocumentButton createDocument={this.createDocument}
                            createFolder={this.createFolder}/>
                    </div>
                </div>
            </div>
        )
    }
}

// const treeData = [
//     {
//         id: 1, // ID's will be set when reading data from backend
//         type: 'folder',
//         name: 'Classes',
//         children: [
//             {
//                 id: 2,
//                 type: 'folder',
//                 name: 'Data Structures & Algorithms',
//                 children: [
//                     {
//                         id: 3,
//                         type: 'document',
//                         name: 'Lecture 1',
//                         children: [],
//                     },
//                     {
//                         id: 4,
//                         type: 'document',
//                         name: 'Lecture 2',
//                         children: [],
//                     }
//                 ]
//             },
//             {
//                 id: 5,
//                 type: 'folder',
//                 name: 'Software Requirements',
//                 children: [
//                     {
//                         id: 6,
//                         type: 'document',
//                         name: 'Lecture 1',
//                         children: [],
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 7,
//         type: 'folder',
//         name: 'Notes',
//         children: [
//             {
//                 id: 8,
//                 type: 'folder',
//                 name: 'Book Notes',
//                 children: [
//                     {
//                         id: 9,
//                         type: 'document',
//                         name: 'Chapter 1',
//                         children: [],
//                     }
//                 ]
//             },
//         ]
//     }
// ]

export default Sidebar
