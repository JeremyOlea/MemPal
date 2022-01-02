import React, { Component } from 'react'
import History from '../../History'

export class Document extends Component {
    state = {
        id: this.props.id
    }

    onClickHandler = () => {
        History.push(`/document/${this.state.id}`);
        this.props.parentCallback(this.state.id);
    }

    render() {
        return (
            <div className={this.props.isSelected === this.props.id ? 'document isSelected' : 'document'}
            onClick={() => this.onClickHandler()}>
                <span>
                    {this.props.name}
                </span>
            </div>
        )
    }
}

export default Document
