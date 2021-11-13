import React, { Component } from 'react'

export class DropdownItem extends Component {
    render() {
        return (
            <div className='menu-item'>
                {this.props.children}
            </div>
        )
    }
}

export default DropdownItem
