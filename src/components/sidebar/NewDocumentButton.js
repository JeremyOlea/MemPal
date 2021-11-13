import React, { Component } from 'react'
import {FiPlus} from "react-icons/fi"

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

    render() {
        return (
            <div ref={this.container}>
                {this.state.isOpen && this.props.children}
                <div className='new-document-btn' onClick={() => this.setIsOpen(!this.state.isOpen)}>
                    <FiPlus className='new-document-plus'/>
                    New Document
                </div>
            </div>
            
        )
    }
}

export default NewDocumentButton
