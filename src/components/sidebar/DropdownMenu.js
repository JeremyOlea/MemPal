import React, { Component } from 'react'
import DropdownItem from './DropdownItem'

export class DropdownMenu extends Component {
    render() {
        return (
            <div className='dropdown'>
                <DropdownItem>
                        New Document
                </DropdownItem>
                <DropdownItem>
                        New Folder
                </DropdownItem>
            </div>
        )
    }
}

export default DropdownMenu
