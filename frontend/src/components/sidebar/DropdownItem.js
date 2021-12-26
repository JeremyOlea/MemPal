import React, { Component } from 'react'

export class DropdownItem extends Component {
    render() {
        return (
            <div className='menu-item' onClick={() => this.props.action()}>
                {this.props.children}
            </div>
        )
    }
}

export default DropdownItem
