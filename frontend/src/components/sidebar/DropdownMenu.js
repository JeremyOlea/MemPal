import React, { Component } from 'react'
// import DropdownItem from './DropdownItem'

export class DropdownMenu extends Component {
    render() {
        return (
            <div className='dropdown'>
                {this.props.children}
            </div>
        )
    }
}

export default DropdownMenu
