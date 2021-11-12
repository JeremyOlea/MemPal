import React, { Component } from 'react'
import { FiChevronRight, FiChevronDown} from "react-icons/fi"

export class Folder extends Component {
    state = {
        isOpen: false,
    }

    setIsOpen = (b) => {
        this.setState({isOpen: b});
    }

    render() {
        return (
            <div className='folder-wrapper'>
                <div className='folder'>
                    {this.state.isOpen ? <FiChevronDown/> : <FiChevronRight/>}
                    <span onClick={() => this.setIsOpen(!this.state.isOpen)} >{this.props.name}</span>
                </div>
                <div className={this.state.isOpen ? 'collapsible open' : 'collapsible closed'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Folder
