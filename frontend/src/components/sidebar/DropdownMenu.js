import React, { Component } from 'react'
// import DropdownItem from './DropdownItem'

export class DropdownMenu extends Component {

    container = React.createRef();

    handleClickOutside = (event) => {
        if (
            this.container.current &&
            !this.container.current.contains(event.target)
          ) {
            this.props.parentCallback(false);
          }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        var positionStyle = {
            bottom: 65
        };
        if (this.props.xPos && this.props.yPos) {
            positionStyle = {
                top: this.props.yPos,
                left: this.props.xPos,
            }
        }
        return (
            <div className='dropdown-transparent-cover'>
                <div className='dropdown' style={positionStyle} ref={this.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default DropdownMenu
