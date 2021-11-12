import React, { Component } from 'react'

export class Document extends Component {
    state = {
        id: this.props.id
    }

    // componentDidUpdate() {
    //     console.log('Updated: ' + this.props.isSelected)
    // }

    render() {
        return (
            <div className={this.props.isSelected === this.props.id ? 'document isSelected' : 'document'}
            onClick={() =>this.props.parentCallback(this.state.id)}>
                <span>
                    {this.props.name}
                    </span>
            </div>
        )
    }
}

export default Document
