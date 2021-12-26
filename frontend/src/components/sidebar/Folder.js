import React, { Component } from 'react'
import { FiChevronRight, FiChevronDown, FiPlus} from "react-icons/fi"
import Tree from './Tree'

export class Folder extends Component {
    state = {
        isOpen: false,
        isHovering: false,
        children: this.props.child,
        depth: this.props.depth,
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

    addDocument = () => {
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
        this.setState({children: childrenTemp})

        this.setIsOpen(true)
    }

    addFolder = () => {
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
        this.setState({children: childrenTemp})

        this.setIsOpen(true)
    }

    render() {
        return (
            <div className='folder-wrapper'>
                <div className='folder' 
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}>
                    {this.state.isOpen ? <FiChevronDown onClick={() => this.setIsOpen(!this.state.isOpen)}/>
                     : <FiChevronRight onClick={() => this.setIsOpen(!this.state.isOpen)}/>}
                    <span className='folder-name' onClick={() => this.setIsOpen(!this.state.isOpen)}>{this.props.name}</span>
                    {/* {this.state.isHovering && <FiPlus className='plus-icon' onClick={this.addFolder}/>} */}
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
