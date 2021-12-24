import React, { Component } from 'react'
import DropdownItem from './DropdownItem'

export class DropdownMenu extends Component {
    render() {
        return (
            <div className='dropdown'>
                <DropdownItem createElement={this.props.createDocument}>
                        New Document
                </DropdownItem>
                <DropdownItem createElement={this.props.createFolder}>
                        New Folder
                </DropdownItem>
            </div>
        )
    }
}

export default DropdownMenu
