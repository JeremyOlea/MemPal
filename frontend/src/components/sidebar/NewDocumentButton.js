import React, { Component } from 'react'
import {FiPlus} from "react-icons/fi"
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'

export class NewDocumentButton extends Component {
    state = {
        isOpen: false,
    }

    setIsOpen = (b) => {
        this.setState({isOpen: b});
    }

    createDocument = () => {
        this.props.createDocument();
        this.setState({isOpen: false});
    }

    createFolder = () => {
        this.props.createFolder();
        this.setState({isOpen: false});
    }

    render() {
        return (
            <div ref={this.container}>
                {this.state.isOpen ? 
                <DropdownMenu parentCallback={this.setIsOpen}>
                    <DropdownItem action={this.createDocument}>New Document</DropdownItem>
                    <DropdownItem action={this.createFolder}>New Folder</DropdownItem>
                </DropdownMenu> : ''}
                <div className='new-document-btn' onClick={() => this.setIsOpen(!this.state.isOpen)}>
                    <FiPlus className='new-document-plus'/>
                    New Document
                </div>
            </div>
            
        )
    }
}

export default NewDocumentButton
