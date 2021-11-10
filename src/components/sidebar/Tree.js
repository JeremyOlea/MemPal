import React, { Component } from 'react'

export class Tree extends Component {
    render() {
        return (
            <div className='tree'>
                {this.props.children}
            </div>
        )
    }
}

export default Tree
