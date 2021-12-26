import React, { Component } from 'react'
import {FiPlus} from "react-icons/fi"
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'

export class NewDocumentButton extends Component {
    state = {
        isOpen: false,
    }

    container = React.createRef();

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.container.current &&
            !this.container.current.contains(event.target)
          ) {
            this.setState({
              isOpen: false,
            });
          }
    }

    setIsOpen = (b) => {
        this.setState({isOpen: b});

        if (b) {
            document.addEventListener("mousedown", this.handleClickOutside);
        } else {
            document.removeEventListener("mousedown", this.handleClickOutside);
        }
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
                <DropdownMenu>
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
