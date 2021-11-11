import React, { Component } from 'react'

export class Document extends Component {
    render() {
        return (
            <div className='document'>
                <span>{this.props.name}</span>
            </div>
        )
    }
}

export default Document
