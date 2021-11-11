import React, { Component } from 'react'

export class Folder extends Component {
    state = {
        isOpen: false,
    }

    setIsOpen = (b) => {
        console.log('state changed to ' + b)
        this.setState({isOpen: b});
    }

    render() {
        return (
            <div className='folder-wrapper'>
                <div className='folder'>
                    <span onClick={() => this.setIsOpen(!this.state.isOpen)} >{this.props.name}</span>
                </div>
                <div className={this.state.isOpen ? 'collapsible open' : 'collapsible closed'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Folder
