import React, { Component } from 'react'
import { FiChevronRight, FiChevronDown, FiPlus} from "react-icons/fi"
import Tree from './Tree'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'
import { API_ADDRESS } from '../../constants'

export class Folder extends Component {
    state = {
        user: localStorage.getItem('login'),
        id: this.props.id,
        parentId: this.props.parentId,
        isOpen: false,
        isHovering: false,
        children: this.props.child,
        depth: this.props.depth,
        openContextMenu: false,
        pageX: 0,
        pageY: 0
    }

    setIsOpen = (b) => {
        this.setState({isOpen: b});
    }

    handleMouseOver = () => {
        this.setState({isHovering: true})
    }
    
    handleMouseOut = () => {
        this.setState({isHovering: false})
    }

    afterCreateDocument = (data, doc_name) => {
        if (data.isValid) {
            const childrenTemp = this.state.children;
            childrenTemp.push(
                {
                    id: data.content_ID,
                    type: 'document',
                    name: doc_name,
                    children: [],
                }
            )
            this.setState(
                {
                    children: childrenTemp,
                    isOpen: true,
                    openContextMenu: false,
                    isHovering: false
                });
        } else {
            alert('Operation failed! Please try again later.');
            this.setState(
                {
                    isOpen: true,
                    openContextMenu: false,
                    isHovering: false
            });
        }
    }

    createDocument = async () => {
        const doc_name = 'Untitled Document';
        const parent_id = this.state.id;
        const user_id = this.state.user;
        if (user_id == null) return;

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
        const parent_id = this.state.id;
        const user_id = this.state.user;
        if (user_id == null) return;

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
            alert('Failed to create folder.');
            console.log(err);
            this.setState(
                {
                    isOpen: true,
                    openContextMenu: false,
                    isHovering: false
            });
        }
    }

    afterCreateFolder = (data, folder_name) => {
        if (data.isValid) {
            const childrenTemp = this.state.children;
            childrenTemp.push(
                {
                    id: data.content_ID,
                    type: 'folder',
                    name: folder_name,
                    children: [],
                }
            )
            this.setState(
                {
                    children: childrenTemp,
                    isOpen: true,
                    openContextMenu: false,
                    isHovering: false
                });
        } else {
            alert('Operation failed! Please try again later.');
            this.setState(
                {
                    isOpen: true,
                    openContextMenu: false,
                    isHovering: false
                });
        }
    }

    toggleContextMenu = (e) => {
        this.setState(
            {openContextMenu: !this.state.openContextMenu,
            pageX: e.pageX - 150, // subtract width of context menu
            pageY: e.pageY + 10 // add height of context menu
            });
    }

    render() {
        return (
            <div className='folder-wrapper'>
                <div className='folder' 
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}>
                    {this.state.openContextMenu ? 
                    <DropdownMenu xPos={this.state.pageX} yPos={this.state.pageY} parentCallback={this.toggleContextMenu}>
                        <DropdownItem action={this.createDocument}>New Document</DropdownItem>
                        {this.state.depth < 2 && <DropdownItem action={this.createFolder}>New Folder</DropdownItem>}
                    </DropdownMenu> : ''}
                    {this.state.isOpen ? <FiChevronDown onClick={() => this.setIsOpen(!this.state.isOpen)}/>
                     : <FiChevronRight onClick={() => this.setIsOpen(!this.state.isOpen)}/>}
                    <span className='folder-name' onClick={() => this.setIsOpen(!this.state.isOpen)}>{this.props.name}</span>
                    {this.state.isHovering && <FiPlus className='plus-icon' onClick={this.toggleContextMenu}/>}
                </div>
                <div className={this.state.isOpen ? 'collapsible open' : 'collapsible closed'}>
                    <Tree data={this.state.children}
                        parentCallback={this.props.parentCallback} 
                        isSelected={this.props.isSelected}
                        depth={this.state.depth + 1}
                        parentId={this.state.id}/>
                </div>
            </div>
        )
    }
}

export default Folder
