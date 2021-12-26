import React, { Component } from 'react'
import { FiChevronRight, FiChevronDown, FiPlus} from "react-icons/fi"
import Tree from './Tree'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'

export class Folder extends Component {
    state = {
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

    createDocument = () => {
        const childrenTemp = this.state.children;
        // THIS SHOULD BE DONE FROM DATABASE TO CREATE NEW UNIQUE ID
        // OR MAYBE A SINGLETON PATTERN TO STORE ID???
        childrenTemp.push(
            {
                id: 1000,
                type: 'document',
                name: 'Untitled Document',
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
    }

    createFolder = () => {
        const childrenTemp = this.state.children;
        // THIS SHOULD BE DONE FROM DATABASE TO CREATE NEW UNIQUE ID
        // OR MAYBE A SINGLETON PATTERN TO STORE ID???
        childrenTemp.push(
            {
                id: 1000,
                type: 'folder',
                name: 'Untitled Folder',
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
                        depth={this.state.depth + 1}/>
                </div>
            </div>
        )
    }
}

export default Folder
