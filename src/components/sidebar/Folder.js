import React, { Component } from 'react'

export class Folder extends Component {
    render() {
        return (
            <div className='folder-wrapper'>
                <div class='folder'>
                    <span>{this.props.name}</span>
                </div>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default Folder
