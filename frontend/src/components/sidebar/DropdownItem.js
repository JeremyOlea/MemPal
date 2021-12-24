import React, { Component } from 'react'

export class DropdownItem extends Component {
    render() {
        return (
            <div className='menu-item' onClick={() => this.props.createElement()}>
                {this.props.children}
            </div>
        )
    }
}

export default DropdownItem
